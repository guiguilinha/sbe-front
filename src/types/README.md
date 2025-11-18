# Tipos Frontend - Atualização

Esta documentação explica as mudanças nos tipos para alinhar com o backend refatorado.

## 🔄 **Mudanças Principais**

### **1. Remoção de Campos Inexistentes**

#### **MaturityLevel**
```typescript
// ❌ Antes
interface MaturityLevel {
  id: number;
  title: string;
  description: string;
  min_score: number;
  max_score: number;
  color: string;        // ❌ Não existe no backend
  icon: string;         // ❌ Não existe no backend
  image?: string;       // ❌ Não existe no backend
}

// ✅ Depois
interface MaturityLevel {
  id: number;
  title: string;
  description: string;
  min_score: number;
  max_score: number;
}
```

#### **Category**
```typescript
// ❌ Antes
interface Category {
  id: number;
  title: string;
  order: number;        // ❌ Não existe no backend
}

// ✅ Depois
interface Category {
  id: number;
  title: string;
}
```

#### **Course**
```typescript
// ❌ Antes
interface Course {
  id: number;
  title: string;
  description: string;
  url: string;
  image_url?: string;   // ❌ Não existe no backend
  category_id?: number; // ❌ Não existe no backend
}

// ✅ Depois
interface Course {
  id: number;
  title: string;
  description: string;
  url: string;
  image?: string;       // ✅ Campo correto
  image_alt?: string;   // ✅ Novo campo
}
```

### **2. Adição de Novos Tipos**

#### **CategoryLevelInsight**
```typescript
interface CategoryLevelInsight {
  id: number;
  description: string;
  support_text: string;  // ✅ Novo campo
  category_id: number;
  level_id: number;
}
```

#### **CategoryLevelRange**
```typescript
interface CategoryLevelRange {
  id: number;
  min_score: number;
  max_score: number;
  level_id: number;
  category_id: number;   // ✅ Campo adicionado
}
```

### **3. Simplificação de Estruturas**

#### **HomeData**
```typescript
// ❌ Antes - Estruturas complexas
interface HeaderData {
  logo: { alt: string; title: string };
  navigation: NavigationItem[];
  authButtons: { login: string; signup: string };
}

// ✅ Depois - Estruturas simplificadas
interface HeaderData {
  id: number;
  title: string;
}
```

### **4. Tipos Estruturados**

#### **Dados Simples vs Estruturados**
```typescript
// Dados simples (vindos do backend)
interface BenefitsData {
  overline?: string;
  title: string;
  description?: string;
}

// Dados estruturados (construídos pelos serviços)
interface StructuredBenefitsData extends BenefitsData {
  benefits: Benefit[];
}
```

## 📁 **Estrutura de Arquivos**

### **quiz-result.ts**
- ✅ Tipos base alinhados com backend
- ✅ Remoção de campos inexistentes
- ✅ Adição de novos tipos (`CategoryLevelInsight`, `CategoryLevelRange`)

### **directus.ts**
- ✅ Tipos do Directus atualizados
- ✅ Adição de tipos para todas as collections
- ✅ Alinhamento com campos reais

### **home.ts**
- ✅ Simplificação de estruturas
- ✅ Tipos estruturados para dados complexos
- ✅ Alinhamento com backend

### **results.ts**
- ✅ Tipos de resultados atualizados
- ✅ Novos tipos para insights e ranges
- ✅ Tipos para quiz results

### **quiz.ts**
- ✅ Tipos do quiz simplificados
- ✅ Remoção de relacionamentos inexistentes
- ✅ Tipos estruturados adicionados

### **index.ts**
- ✅ Exportações centralizadas atualizadas
- ✅ Aliases para evitar conflitos
- ✅ Organização por domínio

## 🎯 **Benefícios das Mudanças**

1. **Alinhamento Total**: Tipos refletem exatamente o backend
2. **Menos Erros**: Não há mais campos inexistentes
3. **Tipagem Forte**: TypeScript mais preciso
4. **Manutenibilidade**: Fácil de manter e estender
5. **Performance**: Menos dados desnecessários
6. **Debugging**: Erros mais claros e específicos

## 🔧 **Como Usar**

### **Importação Simples**
```typescript
import type { MaturityLevel, Category, Course } from '@/types';
```

### **Importação Específica**
```typescript
import type { 
  MaturityLevel as DirectusMaturityLevel,
  Category as DirectusCategory 
} from '@/types';
```

### **Tipos Estruturados**
```typescript
import type { 
  StructuredBenefitsData,
  HomeData 
} from '@/types';
```

## 🚀 **Próximos Passos**

1. ✅ **Fase 2**: Atualizar tipos (concluída)
2. 🔄 **Fase 3**: Recriar hooks restantes
3. 🔄 **Fase 4**: Testar e ajustar
4. 🔄 **Fase 5**: Remover tipos antigos

## ⚠️ **Breaking Changes**

### **Campos Removidos**
- `MaturityLevel.color`, `MaturityLevel.icon`, `MaturityLevel.image`
- `Category.order`
- `Course.image_url`, `Course.category_id`
- `QuizAnswer.order`
- `QuizQuestion.category` (relacionamento)

### **Campos Adicionados**
- `CategoryLevelsInsights.support_text`
- `Course.image_alt`
- `CategoryLevelInsight.support_text`

### **Estruturas Simplificadas**
- `HeaderData` e `FooterData` agora são simples
- Arrays removidos de estruturas base (serão construídos pelos serviços) 