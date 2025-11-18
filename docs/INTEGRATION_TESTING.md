# Guia de Testes de Integração Frontend-Backend

## Visão Geral

Este documento descreve os testes de integração necessários para validar a funcionalidade completa do fluxo de persistência de diagnósticos.

## Pré-requisitos

### Backend
- ✅ Servidor backend rodando (`npm run dev` em `maturidade-digital-backend`)
- ✅ Directus configurado e acessível
- ✅ Variáveis de ambiente configuradas (`.env`)
- ✅ Collections criadas no Directus

### Frontend
- ✅ Servidor frontend rodando (`npm run dev` em `maturidade-digital-frontend`)
- ✅ Keycloak configurado para autenticação
- ✅ Variáveis de ambiente configuradas

## Cenários de Teste

### 1. Fluxo Completo de Diagnóstico

#### 1.1. Novo Usuário + Nova Empresa
**Objetivo**: Validar criação de usuário, empresa e diagnóstico do zero

**Passos**:
1. Fazer login com usuário novo (não cadastrado no Directus)
2. Verificar que dados do usuário são enriquecidos (Keycloak + CPE)
3. Iniciar quiz
4. Verificar seletor de empresa (se múltiplas empresas)
5. Responder todas as perguntas
6. Clicar em "Calcular meu resultado"
7. Verificar que resultado é exibido
8. Verificar logs no console:
   - `[DiagnosticMapper] Construindo requisição completa`
   - `[DiagnosticPersistence] Salvando diagnóstico no backend`
   - `✅ Diagnóstico salvo com sucesso`

**Validações**:
- ✅ Usuário criado no Directus (collection `users`)
- ✅ Empresa criada no Directus (collection `companies`)
- ✅ Vínculo criado (collection `user_companies`)
- ✅ Diagnóstico salvo (collection `diagnostics`)
- ✅ Categorias salvas (collection `diagnostic_categories`)
- ✅ Respostas salvas (collection `answers_given`)
- ✅ Navegação para página de resultados funciona

#### 1.2. Usuário Existente + Nova Empresa
**Objetivo**: Validar que usuário existente não é duplicado

**Passos**:
1. Fazer login com usuário já cadastrado
2. Adicionar nova empresa ao perfil (via CPE)
3. Realizar novo diagnóstico
4. Selecionar a nova empresa

**Validações**:
- ✅ Usuário não é duplicado (mesmo CPF)
- ✅ Nova empresa é criada
- ✅ Novo vínculo é criado
- ✅ Diagnóstico vinculado à empresa correta

#### 1.3. Usuário Existente + Empresa Existente
**Objetivo**: Validar que nenhum dado é duplicado

**Passos**:
1. Fazer login com usuário já cadastrado
2. Realizar diagnóstico para empresa já cadastrada

**Validações**:
- ✅ Nenhum novo usuário criado
- ✅ Nenhuma nova empresa criada
- ✅ Vínculo não é duplicado
- ✅ Apenas diagnóstico novo é criado

### 2. Visualização de Histórico

#### 2.1. Dashboard - Listagem de Diagnósticos
**Objetivo**: Validar que dashboard exibe diagnósticos reais

**Passos**:
1. Fazer login
2. Navegar para `/dashboard`
3. Verificar seção de histórico

**Validações**:
- ✅ Diagnósticos são carregados do Directus
- ✅ Dados exibidos corretamente (data, pontuação)
- ✅ Ordenação por data (mais recente primeiro)
- ✅ Loading state funciona
- ✅ Error state funciona (simular erro desligando backend)

#### 2.2. Página de Histórico
**Objetivo**: Validar página dedicada de histórico

**Passos**:
1. Navegar para `/historico`
2. Verificar lista completa de diagnósticos

**Validações**:
- ✅ Todos os diagnósticos do usuário são exibidos
- ✅ Estatísticas calculadas corretamente (total, melhor pontuação, evolução)
- ✅ Delta entre diagnósticos calculado corretamente
- ✅ Links para detalhes funcionam
- ✅ Estado vazio exibido quando não há diagnósticos

#### 2.3. Detalhes do Diagnóstico
**Objetivo**: Validar visualização de diagnóstico específico

**Passos**:
1. Clicar em "Ver detalhes" de um diagnóstico
2. Verificar página de detalhes

**Validações**:
- ✅ Dados do diagnóstico carregados corretamente
- ✅ Categorias exibidas
- ✅ Navegação de volta funciona
- ✅ Loading state funciona
- ✅ Error state funciona

### 3. Seleção de Empresa

#### 3.1. Usuário com Uma Empresa
**Objetivo**: Validar que seletor não aparece

**Passos**:
1. Login com usuário de uma empresa
2. Iniciar quiz

**Validações**:
- ✅ Seletor de empresa não é exibido
- ✅ Empresa é selecionada automaticamente
- ✅ Diagnóstico vinculado à empresa correta

#### 3.2. Usuário com Múltiplas Empresas
**Objetivo**: Validar seletor de empresa

**Passos**:
1. Login com usuário de múltiplas empresas
2. Iniciar quiz
3. Verificar seletor de empresa

**Validações**:
- ✅ Seletor é exibido
- ✅ Todas as empresas listadas
- ✅ Empresa principal destacada
- ✅ Não permite continuar sem seleção
- ✅ Seleção persiste durante o quiz

### 4. Tratamento de Erros

#### 4.1. Erro de Rede
**Objetivo**: Validar comportamento quando backend está offline

**Passos**:
1. Desligar backend
2. Tentar realizar diagnóstico

**Validações**:
- ✅ Erro é capturado
- ✅ Mensagem amigável exibida
- ✅ Usuário ainda vê resultados calculados
- ✅ Logs de erro no console

#### 4.2. Erro de Validação
**Objetivo**: Validar tratamento de dados inválidos

**Passos**:
1. Simular dados inválidos (via DevTools)
2. Tentar salvar diagnóstico

**Validações**:
- ✅ Erro 400 tratado corretamente
- ✅ Mensagem de validação exibida
- ✅ Não quebra a aplicação

#### 4.3. Erro de Autenticação
**Objetivo**: Validar tratamento de sessão expirada

**Passos**:
1. Expirar token do Keycloak
2. Tentar realizar ação

**Validações**:
- ✅ Erro 401 detectado
- ✅ Usuário redirecionado para login
- ✅ Mensagem apropriada exibida

### 5. Performance e UX

#### 5.1. Loading States
**Objetivo**: Validar que loading states são exibidos

**Passos**:
1. Simular conexão lenta (DevTools > Network > Throttling)
2. Realizar ações

**Validações**:
- ✅ Spinner exibido durante salvamento
- ✅ Botão desabilitado durante processamento
- ✅ Mensagem "Processando..." exibida
- ✅ Não permite múltiplos submits

#### 5.2. Feedback ao Usuário
**Objetivo**: Validar feedback visual

**Passos**:
1. Realizar diagnóstico completo
2. Observar feedback

**Validações**:
- ✅ Progresso do quiz visível
- ✅ Confirmação de salvamento (logs)
- ✅ Transições suaves
- ✅ Mensagens claras

## Checklist de Testes Manuais

### Antes de Testar
- [ ] Backend rodando
- [ ] Frontend rodando
- [ ] Directus acessível
- [ ] Keycloak configurado
- [ ] Console do navegador aberto (para logs)

### Testes Básicos
- [ ] Login funciona
- [ ] Dados do usuário são enriquecidos
- [ ] Quiz carrega corretamente
- [ ] Seletor de empresa funciona (se aplicável)
- [ ] Respostas são registradas
- [ ] Cálculo de resultado funciona
- [ ] Salvamento no Directus funciona
- [ ] Navegação para resultados funciona

### Testes de Histórico
- [ ] Dashboard exibe diagnósticos reais
- [ ] Página de histórico funciona
- [ ] Detalhes de diagnóstico funcionam
- [ ] Navegação entre páginas funciona

### Testes de Erro
- [ ] Erro de rede tratado
- [ ] Erro de validação tratado
- [ ] Erro de autenticação tratado
- [ ] ErrorBoundary captura erros React

### Testes de Edge Cases
- [ ] Usuário sem empresas (se aplicável)
- [ ] Usuário com muitas empresas (10+)
- [ ] Diagnóstico sem respostas (não deve permitir)
- [ ] Múltiplos diagnósticos no mesmo dia
- [ ] Diagnósticos antigos (1+ ano)

## Ferramentas de Teste

### Console do Navegador
Verificar logs:
- `[DiagnosticMapper]` - Mapeamento de dados
- `[DiagnosticPersistence]` - Chamadas à API
- `[DashboardService]` - Busca de dados
- `[useDiagnosticos]` - Hook de diagnósticos

### DevTools Network
Verificar requisições:
- `POST /api/diagnostics` - Salvamento
- `GET /api/diagnostics/user/:userId` - Listagem
- `GET /api/diagnostics/:id` - Detalhes

### Directus Admin
Verificar dados salvos:
- Collections: `users`, `companies`, `user_companies`, `diagnostics`, `diagnostic_categories`, `answers_given`
- Relacionamentos corretos
- Dados completos e válidos

## Problemas Conhecidos

### Backend
- [ ] TODO: Implementar busca de categorias no `getDiagnostico`
- [ ] TODO: Implementar endpoint de health check
- [ ] TODO: Adicionar validação de CPF/CNPJ

### Frontend
- [ ] TODO: Implementar retry automático em caso de falha
- [ ] TODO: Adicionar cache local de diagnósticos
- [ ] TODO: Melhorar feedback de salvamento (toast/notification)

## Próximos Passos

1. Implementar testes automatizados (Jest + React Testing Library)
2. Adicionar testes E2E (Cypress/Playwright)
3. Configurar CI/CD para rodar testes
4. Adicionar monitoramento de erros (Sentry)
5. Implementar analytics (Google Analytics/Mixpanel)

## Contato

Para reportar bugs ou sugerir melhorias, abra uma issue no repositório.

