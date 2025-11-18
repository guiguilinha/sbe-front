# Utilitários Frontend

Este diretório contém funções utilitárias reutilizáveis para o projeto frontend.

## Estrutura

```
lib/
├── index.ts          # Exportações centralizadas
├── utils.ts          # Utilitários gerais (cn, random, etc.)
├── scroll-utils.ts   # Funções de scroll suave e animações
├── dialog-utils.ts   # Hooks para confirmações e navegação
└── README.md         # Esta documentação
```

## Utilitários de Scroll (`scroll-utils.ts`)

### Funções de Easing
- `easeOutCubic(t: number)` - Curva de desaceleração cúbica
- `easeOutQuart(t: number)` - Curva de desaceleração quártica (mais suave)
- `easeOutExpo(t: number)` - Curva de desaceleração exponencial (muito suave)

### Funções de Scroll
- `smoothScrollTo(targetY: number, duration?: number)` - Scroll para posição específica
- `smoothScrollToElement(elementId: string, offset?: number, duration?: number)` - Scroll para elemento por ID
- `handleSmoothScroll(e: React.MouseEvent, url: string, offset?: number, duration?: number)` - Handler para links de âncora

### Uso
```typescript
import { handleSmoothScroll, smoothScrollTo } from '@/lib';

// No Header.tsx
<a onClick={(e) => handleSmoothScroll(e, '#beneficios', 80, 700)}>
  Benefícios
</a>

// Scroll direto
smoothScrollTo(500, 1000); // Para posição Y=500 em 1 segundo
```

## Utilitários de Dialog (`dialog-utils.ts`)

### Hooks de Confirmação
- `useQuizExitConfirmation()` - Proteção específica para saída do quiz
- `useConfirmationDialog()` - Hook genérico para qualquer confirmação
- `useNavigationConfirmation()` - Hook para confirmação de navegação

### Uso
```typescript
import { useQuizExitConfirmation } from '@/lib';

function Header() {
  const { modalOpen, handleMenuClick, handleConfirm, handleCancel } = useQuizExitConfirmation();
  
  return (
    <nav>
      <a onClick={(e) => handleMenuClick(e, '/home')}>Início</a>
      <QuizExitDialog 
        isOpen={modalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </nav>
  );
}
```

## Utilitários Gerais (`utils.ts`)

### Funções de Números Aleatórios
- `getRandomInt(min: number, max: number)` - Gera inteiro aleatório entre min e max (inclusive)
- `getRandomFloat(min: number, max: number, decimals?: number)` - Gera decimal aleatório
- `getRandomItem<T>(array: T[])` - Seleciona item aleatório de um array
- `getRandomBoolean(probability?: number)` - Gera booleano com probabilidade customizada

### Uso das Funções Random
```typescript
import { getRandomInt, getRandomItem } from '@/lib';

// Gerar order aleatório para API (1, 2 ou 3)
const randomOrder = getRandomInt(1, 3);

// Selecionar insight aleatório
const insights = ['insight1', 'insight2', 'insight3'];
const randomInsight = getRandomItem(insights);

// Chance de 30% de mostrar banner
const showBanner = getRandomBoolean(0.3);
```

### Outras Funções
- `cn(...inputs: ClassValue[])` - Combina classes CSS com Tailwind e clsx

## Importações

Para facilitar o uso, todas as funções podem ser importadas de `@/lib`:

```typescript
import { 
  handleSmoothScroll, 
  useQuizExitConfirmation,
  easeOutQuart,
  getRandomInt,
  getRandomItem
} from '@/lib';
```

## Configuração de Scroll

### Velocidade
Ajuste o parâmetro `duration` (em milissegundos):
- **Rápido**: 400ms
- **Padrão**: 700ms  
- **Lento**: 1000-1200ms

### Easing
Escolha a função de easing para o tipo de desaceleração:
- `easeOutCubic` - Desaceleração padrão
- `easeOutQuart` - Desaceleração mais suave (recomendado)
- `easeOutExpo` - Desaceleração muito suave

### Offset
Ajuste o `offset` para compensar headers fixos:
- **Header fixo**: 80px
- **Sem header**: 0px
- **Header grande**: 100-120px

## Componentes Relacionados

- `QuizExitDialog` - Componente de confirmação (em `/components/brand/`)
- `Header.tsx` - Implementa scroll suave e proteção do quiz
- `Footer.tsx` - Usa proteção do quiz 