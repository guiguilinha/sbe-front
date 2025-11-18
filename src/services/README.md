# Serviços Frontend - Nova Estrutura

Esta é a nova estrutura de serviços alinhada com o backend refatorado.

## 📁 Estrutura de Diretórios

```
services/
├── api.ts                    # Cliente axios base
├── index.ts                  # Exportações centralizadas
├── landing/
│   └── landingService.ts     # Serviços da landing page
├── quiz/
│   ├── quizService.ts        # Serviços do quiz
│   └── categoriesService.ts  # Serviços de categorias
└── results/
    └── resultsService.ts     # Serviços de resultados
```

## 🔧 Cliente API Base (`api.ts`)

### Configuração
- **Base URL**: `http://localhost:8080/api` (configurável via `VITE_API_URL`)
- **Timeout**: 10 segundos
- **Headers**: `Content-Type: application/json`

### Interceptor de Resposta
Normaliza automaticamente as respostas do backend:
```typescript
// Backend retorna: { success: true, data: {...} }
// Interceptor retorna: {...} (dados diretos)
```

## 🏠 Serviços de Landing Page (`landing/`)

### Funções Disponíveis
- `getHomeData()` - Todos os dados da home page
- `getHeaderData()` - Dados do header
- `getHeroData()` - Dados do hero
- `getBenefitsData()` - Dados dos benefícios
- `getHowItWorksData()` - Dados do "Como Funciona"
- `getMaturityLevelsData()` - Dados dos níveis de maturidade
- `getFAQData()` - Dados do FAQ
- `getFooterData()` - Dados do footer

### Uso
```typescript
import { getHomeData } from '@/services/homeService';

const data = await getHomeData();
```

## 🧩 Serviços de Quiz (`quiz/`)

### Quiz Service (`quizService.ts`)
- `getQuizData()` - Todos os dados do quiz
- `getAllQuestions()` - Todas as perguntas
- `getQuestionsByCategory(categoryId)` - Perguntas por categoria
- `getQuestionById(questionId)` - Pergunta específica
- `getQuestionOptions(questionId)` - Opções de resposta
- `validateQuestion(questionId)` - Validar pergunta
- `getQuizStats()` - Estatísticas do quiz
- `calculateQuizResult()` - Calcular resultado
- `submitQuizResult()` - Enviar resultado

### Categories Service (`categoriesService.ts`)
- `getCategories()` - Todas as categorias
- `getCategoryById(categoryId)` - Categoria específica
- `getQuestionsByCategory(categoryId)` - Perguntas da categoria
- `getCategoryStats()` - Estatísticas das categorias

### Uso
```typescript
import { getQuizData, getAllQuestions } from '@/services/quiz/quizService';
import { getCategories } from '@/services/quiz/categoriesService';

const quizData = await getQuizData();
const questions = await getAllQuestions();
const categories = await getCategories();
```

## 📊 Serviços de Resultados (`results/`)

### Funções Disponíveis
- `getResultsHeroData()` - Dados do hero dos resultados
- `getMaturityLevelInsight(levelId)` - Insight de nível específico
- `determineCategoryMaturityLevels(categoryId, score)` - Nível por categoria
- `getRecommendations(levelId)` - Recomendações por nível
- `getUserResults(userId)` - Resultados do usuário
- `getLatestUserResult(userId)` - Resultado mais recente

### Uso
```typescript
import { getResultsHeroData, getMaturityLevelInsight } from '@/services/results/resultsService';

const heroData = await getResultsHeroData();
const insight = await getMaturityLevelInsight(1);
```

## 🎣 Hooks Atualizados

### Home Page
```typescript
import { useHomeData } from '@/hooks/useHomeData';

const { data, loading, error, refetch } = useHomeData();
```

### Quiz
```typescript
import { useQuizData } from '@/hooks/useQuizData';

const { data, loading, error, calculateResult } = useQuizData();
```

### Results
```typescript
import { useResultsData } from '@/hooks/useResultsData';

const { heroData, heroInsight, loading, error } = useResultsData(levelId);
```

## 🔄 Migração

### Antes (Serviços Antigos)
```typescript
import { getDirectusItems } from '@/services/directus';
import { getHomeData } from '@/services/homeService';

const data = await getDirectusItems('home_hero', { fields: ['id', 'title'] });
```

### Depois (Novos Serviços)
```typescript
import { getHeroData } from '@/services/landing/landingService';

const data = await getHeroData();
```

## ✅ Benefícios da Nova Estrutura

1. **Alinhamento com Backend**: Usa as mesmas rotas e estruturas
2. **Tipagem Forte**: TypeScript completo com tipos do backend
3. **Tratamento de Erros**: Padronizado e consistente
4. **Organização**: Serviços separados por domínio
5. **Manutenibilidade**: Fácil de manter e estender
6. **Performance**: Menos requisições desnecessárias
7. **Debugging**: Logs claros e informativos

## 🚀 Próximos Passos

1. ✅ **Fase 1**: Estrutura base (concluída)
2. 🔄 **Fase 2**: Atualizar tipos
3. 🔄 **Fase 3**: Recriar hooks restantes
4. 🔄 **Fase 4**: Testar e ajustar
5. 🔄 **Fase 5**: Remover serviços antigos 