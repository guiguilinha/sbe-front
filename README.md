# 🚀 Maturidade Digital Frontend

**Frontend do Sistema de Maturidade Digital - Sebrae MG**

Sistema React/TypeScript para avaliação de maturidade digital de micro e pequenos empreendedores.

---

## 📋 **ÍNDICE**

- [Visão Geral](#-visão-geral)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Desenvolvimento](#-desenvolvimento)
- [Build e Deploy](#-build-e-deploy)
- [Configuração](#-configuração)
- [Scripts](#-scripts)
- [Docker](#-docker)
- [Kubernetes](#-kubernetes)
- [Contribuição](#-contribuição)

---

## 🎯 **VISÃO GERAL**

O **Maturidade Digital Frontend** é uma aplicação React/TypeScript que permite aos usuários:

- **Avaliar** o nível de maturidade digital do seu negócio
- **Responder** a um quiz interativo com 15 perguntas
- **Receber** resultados personalizados e recomendações
- **Acessar** conteúdos educativos do Sebrae
- **Encontrar** contatos regionais do Sebrae

### **Características Principais:**
- ✅ **SPA (Single Page Application)** com React Router
- ✅ **Autenticação** integrada com Keycloak
- ✅ **Responsivo** com Tailwind CSS
- ✅ **TypeScript** rigoroso
- ✅ **Componentes** modulares e reutilizáveis
- ✅ **Hooks** personalizados
- ✅ **Context API** para estado global

---

## 🛠️ **TECNOLOGIAS**

### **Frontend:**
- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **Tailwind CSS** - Estilização
- **Axios** - Cliente HTTP
- **Keycloak JS** - Autenticação

### **Desenvolvimento:**
- **ESLint** - Linting
- **TypeScript** - Verificação de tipos
- **Vite** - Hot reload
- **PostCSS** - Processamento CSS

### **Produção:**
- **Docker** - Containerização
- **Nginx** - Servidor web
- **Kubernetes** - Orquestração
- **TLS/SSL** - Segurança

---

## 📁 **ESTRUTURA DO PROJETO**

```
maturidade-digital-frontend/
├── src/                          # Código fonte
│   ├── components/              # Componentes React
│   │   ├── landing/             # Componentes da landing page
│   │   ├── quiz/                # Componentes do quiz
│   │   ├── results/             # Componentes de resultados
│   │   └── common/              # Componentes comuns
│   ├── pages/                   # Páginas da aplicação
│   │   ├── HomePage.tsx         # Página inicial
│   │   ├── QuizPage.tsx         # Página do quiz
│   │   └── ResultsPage.tsx      # Página de resultados
│   ├── hooks/                   # Custom hooks
│   │   ├── useAuth.ts          # Hook de autenticação
│   │   ├── useQuiz.ts          # Hook do quiz
│   │   └── useResults.ts       # Hook de resultados
│   ├── services/               # Serviços
│   │   ├── api.ts              # Cliente HTTP
│   │   ├── authService.ts      # Serviço de autenticação
│   │   └── quizService.ts      # Serviço do quiz
│   ├── types/                  # Tipos TypeScript
│   │   ├── index.ts            # Exportações
│   │   ├── auth.ts             # Tipos de autenticação
│   │   └── quiz.ts             # Tipos do quiz
│   ├── utils/                  # Utilitários
│   │   ├── constants.ts        # Constantes
│   │   └── helpers.ts          # Funções auxiliares
│   ├── styles/                 # Estilos
│   │   └── globals.css         # Estilos globais
│   └── assets/                 # Assets estáticos
├── public/                     # Arquivos públicos
│   ├── index.html              # HTML principal
│   ├── keycloak.json           # Configuração Keycloak
│   └── images/                 # Imagens
├── k8s/                       # Manifests Kubernetes
│   ├── namespace.yaml          # Namespace
│   ├── configmap.yaml          # ConfigMap
│   ├── deployment.yaml         # Deployment
│   ├── service.yaml            # Service
│   └── ingress.yaml            # Ingress
├── scripts/                    # Scripts de automação
│   ├── dev.sh                 # Desenvolvimento
│   ├── build.sh               # Build
│   └── prod.sh                 # Produção
├── config/                    # Configurações
│   └── nginx.conf              # Configuração Nginx
├── docs/                      # Documentação
├── dist/                      # Build de produção
├── package.json               # Dependências
├── tsconfig.json              # Configuração TypeScript
├── vite.config.ts             # Configuração Vite
├── tailwind.config.js         # Configuração Tailwind
├── Dockerfile                 # Imagem Docker
├── docker-compose.yml         # Docker Compose
└── README.md                  # Este arquivo
```

---

## 🚀 **INSTALAÇÃO**

### **Pré-requisitos:**
- **Node.js** 18+ 
- **npm** 9+
- **Package compartilhado** (`@sebrae/maturidade-digital-types`)

### **1. Clonar o repositório:**
```bash
git clone https://github.com/sebrae-mg/maturidade-digital-frontend.git
cd maturidade-digital-frontend
```

### **2. Instalar dependências:**
```bash
npm install
```

### **3. Configurar variáveis de ambiente:**
```bash
cp .env.example .env.development
# Editar .env.development com suas configurações
```

### **4. Verificar package compartilhado:**
```bash
# O package deve estar em ../maturidade-digital-shared
cd ../maturidade-digital-shared && npm run build
cd ../maturidade-digital-frontend
```

---

## 🛠️ **DESENVOLVIMENTO**

### **Iniciar servidor de desenvolvimento:**
```bash
npm run dev
# ou
./scripts/dev.sh
```

### **Acessar a aplicação:**
- **URL:** http://localhost:5173
- **Hot reload:** Ativado
- **TypeScript:** Verificação em tempo real

### **Comandos disponíveis:**
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run lint         # Linting
npm run type-check   # Verificação de tipos
npm run clean        # Limpar build
```

---

## 📦 **BUILD E DEPLOY**

### **Build de produção:**
```bash
npm run build
# ou
./scripts/build.sh
```

### **Preview do build:**
```bash
npm run preview
```

### **Deploy com Docker:**
```bash
# Construir imagem
docker build -t maturidade-digital-frontend:latest .

# Executar container
docker run -p 3000:80 maturidade-digital-frontend:latest
```

### **Deploy com Kubernetes:**
```bash
# Aplicar manifests
kubectl apply -f k8s/

# Verificar status
kubectl get pods -n maturidade-digital
kubectl get services -n maturidade-digital
kubectl get ingress -n maturidade-digital
```

---

## ⚙️ **CONFIGURAÇÃO**

### **Variáveis de Ambiente:**

#### **Desenvolvimento (.env.development):**
```env
VITE_APP_NAME=Maturidade Digital
VITE_API_URL=http://localhost:8080/api
VITE_DIRECTUS_URL=http://localhost:8055
VITE_KEYCLOAK_AUTH_SERVER_URL=https://amei.sebrae.com.br/auth
VITE_KEYCLOAK_REALM=externo
VITE_KEYCLOAK_CLIENT_ID=maturidadedigital
```

#### **Produção (.env.production):**
```env
VITE_APP_NAME=Maturidade Digital
VITE_API_URL=https://api.maturidade.sebraemg.com.br/api
VITE_DIRECTUS_URL=https://directus.maturidade.sebraemg.com.br
VITE_KEYCLOAK_AUTH_SERVER_URL=https://amei.sebrae.com.br/auth
VITE_KEYCLOAK_REALM=externo
VITE_KEYCLOAK_CLIENT_ID=maturidadedigital
```

### **Configuração do Keycloak:**
```json
{
  "realm": "externo",
  "auth-server-url": "https://amei.sebrae.com.br/auth",
  "ssl-required": "external",
  "resource": "maturidadedigital",
  "public-client": true,
  "confidential-port": 0
}
```

---

## 📜 **SCRIPTS**

### **Desenvolvimento:**
```bash
./scripts/dev.sh
```
- Verifica dependências
- Inicia servidor de desenvolvimento
- Configura hot reload

### **Build:**
```bash
./scripts/build.sh
```
- Limpa build anterior
- Verifica tipos TypeScript
- Constrói aplicação
- Verifica tamanho do build

### **Produção:**
```bash
./scripts/prod.sh
```
- Executa build
- Constrói imagem Docker
- Aplica manifests Kubernetes
- Verifica status do deployment

---

## 🐳 **DOCKER**

### **Dockerfile:**
- **Multi-stage build** para otimização
- **Nginx** como servidor web
- **Compressão gzip** ativada
- **Headers de segurança** configurados

### **Docker Compose:**
```yaml
services:
  frontend:
    build: .
    ports:
      - "3000:80"
    depends_on:
      - backend
```

### **Comandos Docker:**
```bash
# Construir imagem
docker build -t maturidade-digital-frontend:latest .

# Executar container
docker run -p 3000:80 maturidade-digital-frontend:latest

# Docker Compose
docker-compose up -d
```

---

## ☸️ **KUBERNETES**

### **Manifests incluídos:**
- **Namespace** - `maturidade-digital`
- **ConfigMap** - Configurações da aplicação
- **Deployment** - 2 réplicas com health checks
- **Service** - Exposição interna
- **Ingress** - Acesso externo com TLS

### **Recursos configurados:**
- **CPU:** 50m request, 100m limit
- **Memory:** 64Mi request, 128Mi limit
- **Health checks:** Liveness e readiness
- **TLS:** Certificado Let's Encrypt

### **Comandos Kubernetes:**
```bash
# Aplicar todos os manifests
kubectl apply -f k8s/

# Verificar status
kubectl get all -n maturidade-digital

# Logs
kubectl logs -f deployment/frontend-deployment -n maturidade-digital
```

---

## 🔧 **DESENVOLVIMENTO AVANÇADO**

### **Estrutura de Componentes:**
```typescript
// Componente funcional com hooks
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  const { data, loading, error } = useCustomHook();
  
  if (loading) return <Loading />;
  if (error) return <Error />;
  
  return <div>{data}</div>;
};
```

### **Custom Hooks:**
```typescript
// Hook personalizado
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Lógica do hook
  return { user, loading, login, logout };
};
```

### **Context API:**
```typescript
// Context para estado global
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const value = useAuth();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

---

## 🧪 **TESTES**

### **Testes unitários:**
```bash
npm run test
```

### **Testes de integração:**
```bash
npm run test:integration
```

### **Testes E2E:**
```bash
npm run test:e2e
```

---

## 📊 **MONITORAMENTO**

### **Métricas:**
- **Performance** - Core Web Vitals
- **Erros** - JavaScript errors
- **Usuários** - Analytics
- **API** - Response times

### **Logs:**
- **Console** - Desenvolvimento
- **Sentry** - Produção
- **Kubernetes** - Pod logs

---

## 🚀 **DEPLOY**

### **Ambientes:**
- **Desenvolvimento** - localhost:5173
- **Homologação** - homolog.maturidade.sebraemg.com.br
- **Produção** - maturidade.sebraemg.com.br

### **CI/CD:**
- **GitHub Actions** - Build e deploy automático
- **Docker Registry** - Imagens versionadas
- **Kubernetes** - Deploy automático

---

## 🤝 **CONTRIBUIÇÃO**

### **Como contribuir:**
1. **Fork** o repositório
2. **Criar** branch para feature
3. **Implementar** mudanças
4. **Testar** localmente
5. **Criar** Pull Request

### **Padrões de código:**
- **TypeScript** rigoroso
- **ESLint** configurado
- **Prettier** para formatação
- **Commits** semânticos

---

## 📄 **LICENÇA**

**MIT License** - Veja [LICENSE](LICENSE) para detalhes.

---

## 📞 **SUPORTE**

- **Email:** suporte@sebrae.com.br
- **Documentação:** [docs.sebrae.com.br](https://docs.sebrae.com.br)
- **Issues:** [GitHub Issues](https://github.com/sebrae-mg/maturidade-digital-frontend/issues)

---

**Desenvolvido com ❤️ pela equipe Sebrae MG**

---

## 📈 **STATUS DO PROJETO**

- **Versão:** 1.0.0
- **Status:** ✅ Produção
- **Última atualização:** 19/09/2025
- **Próxima versão:** 1.1.0

---

**🎯 Objetivo:** Facilitar a avaliação de maturidade digital para micro e pequenos empreendedores, fornecendo insights personalizados e recomendações do Sebrae.
