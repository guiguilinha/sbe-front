# Variáveis de Ambiente - Frontend

## Visão Geral

Este documento descreve as variáveis de ambiente utilizadas no frontend da aplicação Maturidade Digital.

## Estrutura dos Arquivos

```
maturidade-digital-frontend/
├── .env.development          # Configurações de desenvolvimento
├── .env.production.example   # Exemplo para produção
├── .env.homologation.example # Exemplo para homologação
└── docs/
    └── ENVIRONMENT_VARIABLES.md
```

## Variáveis Disponíveis

### Configurações Gerais

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_APP_NAME` | Nome da aplicação | `Maturidade Digital` |
| `VITE_APP_VERSION` | Versão da aplicação | `1.0.0` |
| `VITE_NODE_ENV` | Ambiente atual | `development` |
| `VITE_IS_PRODUCTION` | Flag de produção | `false` |
| `VITE_IS_DEVELOPMENT` | Flag de desenvolvimento | `true` |
| `VITE_IS_HOMOLOGATION` | Flag de homologação | `false` |

### URLs da API

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_API_URL` | URL base da API backend | `http://localhost:8080/api` |
| `VITE_DIRECTUS_URL` | URL do CMS Directus | `http://localhost:8055` |

### Configurações do Keycloak

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_KEYCLOAK_AUTH_SERVER_URL` | URL do servidor Keycloak | `https://amei.homolog.kubernetes.sebrae.com.br/auth` |
| `VITE_KEYCLOAK_REALM` | Realm do Keycloak | `externo` |
| `VITE_KEYCLOAK_CLIENT_ID` | ID do cliente | `maturidadedigital` |
| `VITE_KEYCLOAK_SSL_REQUIRED` | Requisição SSL | `external` |
| `VITE_KEYCLOAK_PUBLIC_CLIENT` | Cliente público | `true` |
| `VITE_KEYCLOAK_CONFIDENTIAL_PORT` | Porta confidencial | `0` |

## Configurações por Ambiente

### Desenvolvimento (.env.development)

```env
# Configurações de Desenvolvimento
VITE_APP_NAME=Maturidade Digital
VITE_APP_VERSION=1.0.0

# URLs da API
VITE_API_URL=http://localhost:8080/api
VITE_DIRECTUS_URL=http://localhost:8055

# Configurações do Keycloak
VITE_KEYCLOAK_AUTH_SERVER_URL=https://amei.homolog.kubernetes.sebrae.com.br/auth
VITE_KEYCLOAK_REALM=externo
VITE_KEYCLOAK_CLIENT_ID=maturidadedigital
VITE_KEYCLOAK_SSL_REQUIRED=external
VITE_KEYCLOAK_PUBLIC_CLIENT=true
VITE_KEYCLOAK_CONFIDENTIAL_PORT=0

# Ambiente
VITE_NODE_ENV=development
VITE_IS_PRODUCTION=false
VITE_IS_DEVELOPMENT=true
VITE_IS_HOMOLOGATION=false
```

### Homologação (.env.homologation)

```env
# Configurações de Homologação
VITE_APP_NAME=Maturidade Digital
VITE_APP_VERSION=1.0.0

# URLs da API
VITE_API_URL=https://api-homolog.maturidadedigital.com.br/api
VITE_DIRECTUS_URL=https://cms-homolog.maturidadedigital.com.br

# Configurações do Keycloak
VITE_KEYCLOAK_AUTH_SERVER_URL=https://amei.homolog.kubernetes.sebrae.com.br/auth
VITE_KEYCLOAK_REALM=externo
VITE_KEYCLOAK_CLIENT_ID=maturidadedigital
VITE_KEYCLOAK_SSL_REQUIRED=external
VITE_KEYCLOAK_PUBLIC_CLIENT=true
VITE_KEYCLOAK_CONFIDENTIAL_PORT=0

# Ambiente
VITE_NODE_ENV=homologation
VITE_IS_PRODUCTION=false
VITE_IS_DEVELOPMENT=false
VITE_IS_HOMOLOGATION=true
```

### Produção (.env.production)

```env
# Configurações de Produção
VITE_APP_NAME=Maturidade Digital
VITE_APP_VERSION=1.0.0

# URLs da API
VITE_API_URL=https://api.maturidadedigital.com.br/api
VITE_DIRECTUS_URL=https://cms.maturidadedigital.com.br

# Configurações do Keycloak
VITE_KEYCLOAK_AUTH_SERVER_URL=https://amei.sebrae.com.br/auth
VITE_KEYCLOAK_REALM=externo
VITE_KEYCLOAK_CLIENT_ID=maturidadedigital
VITE_KEYCLOAK_SSL_REQUIRED=external
VITE_KEYCLOAK_PUBLIC_CLIENT=true
VITE_KEYCLOAK_CONFIDENTIAL_PORT=0

# Ambiente
VITE_NODE_ENV=production
VITE_IS_PRODUCTION=true
VITE_IS_DEVELOPMENT=false
VITE_IS_HOMOLOGATION=false
```

## Como Usar

### 1. Desenvolvimento Local

```bash
# Usar configurações de desenvolvimento
npm run dev
```

### 2. Build para Homologação

```bash
# Copiar arquivo de exemplo
cp .env.homologation.example .env.homologation

# Editar configurações se necessário
# Build com configurações de homologação
npm run build:homologation
```

### 3. Build para Produção

```bash
# Copiar arquivo de exemplo
cp .env.production.example .env.production

# Editar configurações se necessário
# Build com configurações de produção
npm run build:production
```

## Validação de Configuração

O sistema inclui logs para validar as configurações carregadas:

```javascript
console.log('🔧 [Keycloak] Configuração carregada:', {
  realm: KEYCLOAK_CONFIG.realm,
  url: KEYCLOAK_CONFIG.url,
  clientId: KEYCLOAK_CONFIG.clientId,
  sslRequired: KEYCLOAK_CONFIG.sslRequired,
  publicClient: KEYCLOAK_CONFIG.publicClient,
  confidentialPort: KEYCLOAK_CONFIG.confidentialPort
});
```

## Fallbacks

Todas as variáveis têm valores de fallback para garantir que a aplicação funcione mesmo sem configuração:

```javascript
const KEYCLOAK_CONFIG = {
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'externo',
  url: import.meta.env.VITE_KEYCLOAK_AUTH_SERVER_URL || 'https://amei.homolog.kubernetes.sebrae.com.br/auth',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'maturidadedigital',
  sslRequired: import.meta.env.VITE_KEYCLOAK_SSL_REQUIRED || 'external',
  publicClient: import.meta.env.VITE_KEYCLOAK_PUBLIC_CLIENT === 'true' || true,
  confidentialPort: parseInt(import.meta.env.VITE_KEYCLOAK_CONFIDENTIAL_PORT || '0')
};
```

## Segurança

- ✅ **Dados sensíveis:** Nunca expostos no frontend
- ✅ **Validação:** Configurações validadas antes do uso
- ✅ **Fallbacks:** Valores padrão seguros
- ✅ **Logs:** Apenas configurações não-sensíveis são logadas

## Troubleshooting

### Problema: Configuração não carregada

**Sintomas:** Logs mostram valores de fallback

**Solução:**
1. Verificar se o arquivo `.env` existe
2. Verificar se as variáveis começam com `VITE_`
3. Reiniciar o servidor de desenvolvimento

### Problema: Keycloak não conecta

**Sintomas:** Erro de conexão no console

**Solução:**
1. Verificar `VITE_KEYCLOAK_AUTH_SERVER_URL`
2. Verificar `VITE_KEYCLOAK_REALM`
3. Verificar `VITE_KEYCLOAK_CLIENT_ID`
4. Testar URL manualmente no navegador

### Problema: API não responde

**Sintomas:** Erro 404 ou CORS

**Solução:**
1. Verificar `VITE_API_URL`
2. Verificar se o backend está rodando
3. Verificar configuração de CORS no backend
