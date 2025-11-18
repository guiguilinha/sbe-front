# Uso de Tipos Compartilhados (@contracts)

## Visão Geral

Este projeto utiliza um sistema de tipos compartilhados entre backend e frontend através do alias `@contracts`. Isso garante que ambos os lados usem as mesmas interfaces TypeScript, mantendo a consistência e type-safety.

## Configuração

### Backend
- **Localização**: `maturidade-digital-backend/src/contracts/`
- **Export central**: `contracts/index.ts`
- **Importação**: `import type { ... } from './contracts'`

### Frontend
- **Alias configurado**: `@contracts` 
- **tsconfig.json**: `"@contracts": ["../maturidade-digital-backend/src/contracts"]`
- **vite.config.ts**: `'@contracts': resolve(__dirname, '../maturidade-digital-backend/src/contracts')`
- **Importação**: `import type { ... } from '@contracts'`

## Tipos de Persistência Disponíveis

### Interfaces de Entidades

```typescript
import type {
  User,                    // Usuário do sistema
  Company,                 // Empresa
  UserCompany,             // Relacionamento usuário-empresa
  Diagnostic,              // Diagnóstico realizado
  DiagnosticCategory,      // Resultado por categoria
  AnswerGiven              // Resposta individual
} from '@contracts';
```

### Interfaces de Request/Response

```typescript
import type {
  CompleteDiagnosticRequest,   // Estrutura para salvar diagnóstico
  CompleteDiagnosticResponse    // Resposta do backend
} from '@contracts';
```

## Exemplo de Uso

### No Serviço de Persistência

```typescript
// maturidade-digital-frontend/src/services/diagnostic/diagnostic-persistence.service.ts

import api from '../api';
import type { 
  CompleteDiagnosticRequest, 
  CompleteDiagnosticResponse,
  Diagnostic
} from '@contracts';

export class DiagnosticPersistenceService {
  async saveDiagnostic(
    data: CompleteDiagnosticRequest
  ): Promise<CompleteDiagnosticResponse> {
    const response = await api.post<CompleteDiagnosticResponse>(
      '/diagnostics',
      data
    );
    return response.data;
  }

  async getUserDiagnostics(userId: string): Promise<Diagnostic[]> {
    const response = await api.get<{ success: boolean; data: Diagnostic[] }>(
      `/diagnostics/user/${userId}`
    );
    return response.data.data;
  }
}
```

### No Componente

```typescript
// maturidade-digital-frontend/src/components/quiz/QuizContainer.tsx

import type { CompleteDiagnosticRequest } from '@contracts';
import { diagnosticPersistenceService } from '@/services/diagnostic/diagnostic-persistence.service';

const QuizContainer = () => {
  const handleSubmit = async () => {
    // Construir request com tipo correto
    const diagnosticData: CompleteDiagnosticRequest = {
      usuario: {
        given_name: 'João',
        lastName: 'Silva',
        // ... outros campos
      },
      diagnostico: {
        empresaSelecionada: '12345678000190',
        dataRealizacao: new Date().toISOString(),
        // ... outros campos
      }
    };

    // Salvar com type-safety
    await diagnosticPersistenceService.saveDiagnostic(diagnosticData);
  };
};
```

## Estrutura de CompleteDiagnosticRequest

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
  },
  diagnostico: {
    empresaSelecionada: string;  // CNPJ
    dataRealizacao: string;      // ISO 8601
    nivelGeral: string;
    pontuacaoGeral: number;
    insightGeral: string;
    status: string;
    categorias: Array<{
      idCategoria: number;
      nomeCategoria: string;
      idNivelCategoria: number;
      nivelCategoria: string;
      pontuacaoCategoria: number;
      insightCategoria: string;
      dicaCategoria: string;
      respostasCategoria: Array<{
        idPergunta: number;
        pergunta: string;
        idResposta: number;
        resposta: string;
        pontuacao: number;
      }>;
    }>;
  }
}
```

## Vantagens

✅ **Tipos sincronizados** - Backend e frontend usam mesmas interfaces
✅ **Sem duplicação** - Tipos definidos uma única vez
✅ **Type-safe** - TypeScript valida em ambos os lados
✅ **Manutenção fácil** - Mudanças propagam automaticamente
✅ **Padrão estabelecido** - Já usado em quiz, dashboard, home, etc.

## Outros Tipos Compartilhados

Além dos tipos de persistência, o projeto já utiliza `@contracts` para:

- **Dashboard**: `DashboardResponse`, `CategorySnapshot`, etc.
- **Quiz**: `QuizData`, `QuestionData`, `AnswerData`, etc.
- **Results**: `UserResultsData`, `CalculatedResult`, etc.
- **Home**: `HomeData`, `Benefit`, `FAQItem`, etc.
- **Auth**: `ProcessedUserData`, `EmpresaVinculo`, etc.

## Verificação

Para verificar se os tipos estão disponíveis:

```typescript
// Teste de importação
import type { CompleteDiagnosticRequest } from '@contracts';

// Se não houver erro de TypeScript, está funcionando!
const test: CompleteDiagnosticRequest = {} as any;
```

## Troubleshooting

### Erro: Cannot find module '@contracts'

**Solução**: Verificar configuração do alias
- `tsconfig.json` - paths configurado?
- `vite.config.ts` - resolve.alias configurado?
- Reiniciar TypeScript server no VSCode

### Erro: Type not exported

**Solução**: Verificar export em `contracts/index.ts`
```typescript
export * from './persistence/persistence.types';
```

## Referências

- Backend contracts: `maturidade-digital-backend/src/contracts/`
- Frontend docs: `maturidade-digital-frontend/docs/`
- Configuração: `tsconfig.json`, `vite.config.ts`
