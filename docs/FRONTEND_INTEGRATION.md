# Integração Frontend - Persistência Directus

## Visão Geral

Este documento descreve a implementação completa da integração entre o frontend React e o backend Node.js para persistência de diagnósticos no Directus.

## Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │ QuizContainer│───▶│ Mapper       │───▶│ Persistence  │ │
│  │              │    │ Service      │    │ Service      │ │
│  └──────────────┘    └──────────────┘    └──────┬───────┘ │
│                                                   │          │
│  ┌──────────────┐    ┌──────────────┐           │          │
│  │ Dashboard    │◀───│ Dashboard    │◀──────────┤          │
│  │ Pages        │    │ Service      │           │          │
│  └──────────────┘    └──────────────┘           │          │
│                                                   │          │
│  ┌──────────────┐    ┌──────────────┐           │          │
│  │ Historico    │◀───│ useDiagnosticos│◀────────┤          │
│  │ Pages        │    │ Hook         │           │          │
│  └──────────────┘    └──────────────┘           │          │
│                                                   │          │
└───────────────────────────────────────────────────┼──────────┘
                                                    │
                                              API REST
                                                    │
┌───────────────────────────────────────────────────┼──────────┐
│                        BACKEND                    │          │
├───────────────────────────────────────────────────┼──────────┤
│                                                    ▼          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │ Diagnostic   │───▶│ Persistence  │───▶│ Directus     │  │
│  │ Controller   │    │ Service      │    │ Services     │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Componentes Implementados

### 1. Serviços de Mapeamento

#### DiagnosticMapperService
**Arquivo**: `src/services/diagnostic/diagnostic-mapper.service.ts`

**Responsabilidade**: Transformar dados do frontend para o formato esperado pelo backend.

**Métodos principais**:
- `buildCompleteDiagnosticRequest()` - Método principal que orquestra o mapeamento
- `mapUserData()` - Mapeia dados do usuário enriquecido
- `mapDiagnosticData()` - Mapeia resultado calculado
- `mapCategories()` - Mapeia categorias com pontuações
- `mapAnswers()` - Mapeia respostas individuais

**Exemplo de uso**:
```typescript
import { diagnosticMapperService } from '@/services/diagnostic/diagnostic-mapper.service';

const diagnosticData = diagnosticMapperService.buildCompleteDiagnosticRequest(
  enrichedUserData,
  calculatedResult,
  userAnswers,
  quizData,
  empresaSelecionada
);
```

### 2. Serviços de Persistência

#### DiagnosticPersistenceService
**Arquivo**: `src/services/diagnostic/diagnostic-persistence.service.ts`

**Responsabilidade**: Gerenciar chamadas à API de persistência do backend.

**Métodos principais**:
- `saveDiagnostic(data)` - Salva diagnóstico completo
- `getUserDiagnostics(userId)` - Lista diagnósticos do usuário
- `getDiagnosticById(id)` - Busca diagnóstico específico
- `healthCheck()` - Verifica disponibilidade do serviço

**Exemplo de uso**:
```typescript
import { diagnosticPersistenceService } from '@/services/diagnostic/diagnostic-persistence.service';

const response = await diagnosticPersistenceService.saveDiagnostic(diagnosticData);
console.log('Diagnóstico salvo:', response.data.diagnostic.id);
```

### 3. Componentes de UI

#### CompanySelector
**Arquivo**: `src/components/quiz/CompanySelector.tsx`

**Responsabilidade**: Permitir seleção de empresa quando usuário tem múltiplas empresas.

**Props**:
- `empresas: EmpresaVinculo[]` - Lista de empresas do usuário
- `empresaSelecionada: EmpresaVinculo | null` - Empresa atualmente selecionada
- `onSelect: (empresa) => void` - Callback de seleção

**Comportamento**:
- Não renderiza se usuário tem apenas 1 empresa
- Destaca empresa principal
- Exibe informações de vínculo (CNPJ, status, tipo)
- Valida seleção antes de continuar

**Exemplo de uso**:
```typescript
<CompanySelector
  empresas={enrichedUserData.empresas}
  empresaSelecionada={empresaSelecionada}
  onSelect={(empresa) => setEmpresaSelecionada(empresa)}
/>
```

### 4. Hooks Customizados

#### useDiagnosticos
**Arquivo**: `src/hooks/useDiagnosticos.ts`

**Responsabilidade**: Buscar lista de diagnósticos do usuário logado.

**Retorno**:
```typescript
{
  isLoading: boolean;
  error: Error | null;
  data: DiagnosticoListItem[] | null;
}
```

**Exemplo de uso**:
```typescript
import { useDiagnosticos } from '@/hooks/useDiagnosticos';

const { data, isLoading, error } = useDiagnosticos();

if (isLoading) return <Loading />;
if (error) return <Error message={error.message} />;
return <DiagnosticosList items={data} />;
```

### 5. Tratamento de Erros

#### ErrorBoundary
**Arquivo**: `src/components/error/ErrorBoundary.tsx`

**Responsabilidade**: Capturar erros não tratados no React.

**Uso**:
```typescript
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

#### ErrorHandlerService
**Arquivo**: `src/services/error-handler.service.ts`

**Responsabilidade**: Classificar e tratar erros de forma centralizada.

**Métodos principais**:
- `handleError(error)` - Classifica e estrutura erro
- `getUserMessage(error)` - Retorna mensagem amigável
- `logError(error, context)` - Loga erro (console ou serviço)
- `shouldRetry(error)` - Determina se deve retentar

**Exemplo de uso**:
```typescript
import { ErrorHandlerService } from '@/services/error-handler.service';

try {
  await saveDiagnostic(data);
} catch (error) {
  ErrorHandlerService.logError(error, 'Salvamento de diagnóstico');
  const message = ErrorHandlerService.getUserMessage(error);
  alert(message);
}
```

## Fluxo de Dados

### 1. Salvamento de Diagnóstico

```
1. Usuário completa quiz
   ↓
2. QuizContainer.handleSubmit()
   ↓
3. calculateResults(userAnswers) → CalculatedResult
   ↓
4. DiagnosticMapperService.buildCompleteDiagnosticRequest()
   ├─ mapUserData(enrichedUserData)
   ├─ mapDiagnosticData(calculatedResult)
   └─ mapCategories() → mapAnswers()
   ↓
5. DiagnosticPersistenceService.saveDiagnostic(data)
   ↓
6. POST /api/diagnostics (Backend)
   ↓
7. DiagnosticPersistenceService (Backend)
   ├─ findOrCreateUser()
   ├─ findOrCreateCompany()
   ├─ linkUserToCompany()
   ├─ createDiagnostic()
   ├─ createCategoryResults()
   └─ saveAnswers()
   ↓
8. Resposta: { success, data: { user, diagnostic, categories } }
   ↓
9. Navigate to /results
```

### 2. Visualização de Histórico

```
1. Usuário navega para /historico
   ↓
2. useDiagnosticos() hook
   ↓
3. DashboardService.listDiagnosticos(userId)
   ↓
4. GET /api/diagnostics/user/:userId (Backend)
   ↓
5. DiagnosticsService.getUserDiagnostics()
   ↓
6. Directus API: fetch diagnostics
   ↓
7. Resposta: { success, data: Diagnostic[] }
   ↓
8. Renderizar HistoricoPage com dados
```

### 3. Detalhes de Diagnóstico

```
1. Usuário clica em "Ver detalhes"
   ↓
2. Navigate to /historico/:id
   ↓
3. useDiagnostico(id) hook
   ↓
4. DashboardService.getDiagnostico(id)
   ↓
5. GET /api/diagnostics/:id (Backend)
   ↓
6. DiagnosticsService.getDiagnosticById()
   ↓
7. Directus API: fetch diagnostic + categories
   ↓
8. Resposta: { success, data: Diagnostic }
   ↓
9. Renderizar HistoricoDetailPage
```

## Tipos Compartilhados

### Uso do @contracts

O projeto utiliza tipos compartilhados entre backend e frontend através do alias `@contracts`.

**Configuração**:
- `tsconfig.json`: `"@contracts": ["../maturidade-digital-backend/src/contracts"]`
- `vite.config.ts`: `'@contracts': resolve(__dirname, '../maturidade-digital-backend/src/contracts')`

**Tipos disponíveis**:
```typescript
import type {
  User,
  Company,
  UserCompany,
  Diagnostic,
  DiagnosticCategory,
  AnswerGiven,
  CompleteDiagnosticRequest,
  CompleteDiagnosticResponse
} from '@contracts';
```

**Vantagens**:
- ✅ Tipos sincronizados automaticamente
- ✅ Sem duplicação de código
- ✅ Type-safety em ambos os lados
- ✅ Mudanças propagam automaticamente
- ✅ Refatoração segura

## Páginas Atualizadas

### QuizContainer
**Arquivo**: `src/components/quiz/QuizContainer.tsx`

**Mudanças**:
- ✅ Integração com `useSimpleAuth` para dados do usuário
- ✅ Adição de `CompanySelector` para múltiplas empresas
- ✅ Auto-seleção de empresa única ou principal
- ✅ Validação de empresa selecionada antes de submit
- ✅ Mapeamento de dados via `DiagnosticMapperService`
- ✅ Salvamento via `DiagnosticPersistenceService`
- ✅ Tratamento de erros não-bloqueante
- ✅ Navegação para resultados sempre funciona

### HistoricoPage
**Arquivo**: `src/pages/HistoricoPage.tsx`

**Mudanças**:
- ✅ Uso de `useDiagnosticos` em vez de `useDashboard`
- ✅ Dados reais do Directus
- ✅ Ordenação por data (mais recente primeiro)
- ✅ Cálculo de delta entre diagnósticos
- ✅ Estado vazio quando sem diagnósticos
- ✅ Loading e error states melhorados

### HistoricoDetailPage
**Arquivo**: `src/pages/HistoricoDetailPage.tsx`

**Mudanças**:
- ✅ Loading state com spinner
- ✅ Error state com botão de voltar
- ✅ Dados reais do Directus via `useDiagnostico`

### DashboardService
**Arquivo**: `src/services/dashboard/dashboardService.ts`

**Mudanças**:
- ✅ `listDiagnosticos(userId)` usa API real
- ✅ `getDiagnostico(id)` usa API real
- ✅ Fallback para mock em caso de erro
- ✅ Mapeamento de tipos do Directus para frontend
- ✅ Logs detalhados para debugging

## Endpoints da API

### POST /api/diagnostics
**Descrição**: Salva diagnóstico completo

**Request**:
```typescript
{
  usuario: {
    given_name: string;
    lastName: string;
    cpf: string;
    dataNascimento: string;
    genero: string;
    uf: string;
    cidade: string;
    email: string;
    empresa: Array<{
      cnpj: string;
      nome: string;
      isPrincipal: boolean;
      codStatusEmpresa: string;
      desTipoVinculo: string;
    }>;
  };
  diagnostico: {
    empresaSelecionada: string; // CNPJ
    dataRealizacao: string; // ISO 8601
    nivelGeral: string;
    pontuacaoGeral: number;
    insightGeral: string;
    status: string;
    categorias: Array<{...}>;
  };
}
```

**Response**:
```typescript
{
  success: true,
  data: {
    user: User,
    diagnostic: Diagnostic,
    categories: DiagnosticCategory[]
  }
}
```

### GET /api/diagnostics/user/:userId
**Descrição**: Lista diagnósticos do usuário

**Response**:
```typescript
{
  success: true,
  data: Diagnostic[]
}
```

### GET /api/diagnostics/:id
**Descrição**: Busca diagnóstico específico

**Response**:
```typescript
{
  success: true,
  data: Diagnostic
}
```

## Configuração

### Variáveis de Ambiente

**Frontend** (`.env`):
```env
VITE_API_URL=http://localhost:3000
VITE_KEYCLOAK_URL=...
VITE_KEYCLOAK_REALM=...
VITE_KEYCLOAK_CLIENT_ID=...
```

**Backend** (`.env`):
```env
DIRECTUS_URL=...
DIRECTUS_TOKEN=...
DIRECTUS_EMAIL=...
DIRECTUS_PASSWORD=...
```

## Logs e Debugging

### Console Logs

**Frontend**:
- `[DiagnosticMapper]` - Mapeamento de dados
- `[DiagnosticPersistence]` - Chamadas à API
- `[DashboardService]` - Busca de dados
- `[useDiagnosticos]` - Hook de diagnósticos
- `[ErrorHandler]` - Erros capturados

**Backend**:
- `[DiagnosticPersistence]` - Orquestração de salvamento
- `[UsersService]` - Operações de usuário
- `[CompaniesService]` - Operações de empresa
- `[DiagnosticsService]` - Operações de diagnóstico

### Network Tab

Verificar requisições:
- `POST /api/diagnostics` - Status 201 em sucesso
- `GET /api/diagnostics/user/:userId` - Status 200
- `GET /api/diagnostics/:id` - Status 200

## Tratamento de Erros

### Estratégia de Fallback

1. **Salvamento**: Não bloqueia visualização de resultados
   - Se salvamento falhar, usuário ainda vê resultados calculados
   - Erro é logado mas não interrompe fluxo

2. **Listagem**: Fallback para mock
   - Se API real falhar, tenta buscar mock
   - Evita quebrar dashboard completamente

3. **Detalhes**: Fallback para mock
   - Similar à listagem
   - Exibe erro mas permite navegação

### Tipos de Erro Tratados

- ❌ **Network Error** - Sem conexão
- ❌ **401 Unauthorized** - Sessão expirada
- ❌ **403 Forbidden** - Sem permissão
- ❌ **400 Bad Request** - Dados inválidos
- ❌ **404 Not Found** - Recurso não existe
- ❌ **500+ Server Error** - Erro no servidor

## Próximos Passos

### Melhorias Pendentes

1. **Backend**:
   - [ ] Implementar busca de categorias no `getDiagnostico`
   - [ ] Adicionar endpoint de health check
   - [ ] Implementar validação de CPF/CNPJ
   - [ ] Adicionar paginação em `listDiagnosticos`
   - [ ] Implementar filtros (data, empresa, pontuação)

2. **Frontend**:
   - [ ] Adicionar retry automático
   - [ ] Implementar cache local (IndexedDB)
   - [ ] Melhorar feedback de salvamento (toast)
   - [ ] Adicionar confirmação antes de sair do quiz
   - [ ] Implementar modo offline

3. **Testes**:
   - [ ] Testes unitários (Jest)
   - [ ] Testes de integração (React Testing Library)
   - [ ] Testes E2E (Cypress/Playwright)
   - [ ] Testes de performance

4. **Monitoramento**:
   - [ ] Integrar Sentry para erros
   - [ ] Adicionar Google Analytics
   - [ ] Implementar logging estruturado
   - [ ] Dashboard de métricas

## Referências

- [Documentação Backend](../../maturidade-digital-backend/docs/DIRECTUS_PERSISTENCE_APIS.md)
- [Guia de Testes](./INTEGRATION_TESTING.md)
- [Tipos Compartilhados](./SHARED_TYPES_USAGE.md)
- [Directus API](https://directus.io/docs/api)

## Suporte

Para dúvidas ou problemas:
1. Verificar logs no console
2. Verificar Network tab no DevTools
3. Verificar dados no Directus Admin
4. Consultar documentação
5. Abrir issue no repositório

