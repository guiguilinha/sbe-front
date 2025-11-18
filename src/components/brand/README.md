# MaskedParallaxCard - Sistema de Parallax com Máscaras Dinâmicas

## Conceito

O `MaskedParallaxCard` implementa um sistema de parallax com máscaras dinâmicas seguindo esta organização:

1. **Background** (vem do Directus) - Imagem de fundo animada
2. **Máscara SVG** (recorta a imagem de fundo) - Muda de forma randomica (mask-1 a mask-4)
3. **Marca d'água SVG** - Dinâmica baseada na máscara com classes CSS específicas por nível
4. **Personagem** (vem do Directus) - Imagem do personagem sobreposta

## Estrutura de Arquivos

```
frontend/src/
├── components/brand/
│   ├── MaskedParallaxCard.tsx    # Componente principal
│   └── README.md                  # Esta documentação
├── styles/
│   └── watermark-levels.css       # Classes CSS específicas por nível
└── public/images/masks/
    ├── mask-1.svg                 # Máscara circular
    ├── mask-2.svg                 # Máscara retangular
    ├── mask-3.svg                 # Máscara hexagonal
    └── mask-4.svg                 # Máscara estrelada
```

## Uso

```tsx
import { MaskedParallaxCard } from '@/components/brand/MaskedParallaxCard';

// Exemplo básico
<MaskedParallaxCard
  bgImages={[`${import.meta.env.VITE_DIRECTUS_URL}/assets/${card.bg_image}`]}
  characterImage={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${card.image}`}
  level={card.overline?.toLowerCase() || 'default'}
>
  {/* Conteúdo opcional */}
</MaskedParallaxCard>
```

## Props

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `bgImages` | `string[]` | ✅ | Array de URLs de backgrounds animados |
| `characterImage` | `string` | ❌ | URL do personagem |
| `level` | `string` | ❌ | Nível para identificar cores e classes CSS |
| `children` | `React.ReactNode` | ❌ | Conteúdo opcional à frente |

## Níveis Suportados

- `iniciante` - Azul (#3B82F6)
- `aprendiz` - Verde (#10B981)
- `intermediario` - Amarelo (#F59E0B)
- `avancado` - Vermelho (#EF4444)
- `expert` - Roxo (#8B5CF6)
- `default` - Cinza (#6B7280)

## Máscaras Disponíveis

1. **mask-1** - Forma circular
2. **mask-2** - Forma retangular
3. **mask-3** - Forma hexagonal
4. **mask-4** - Forma estrelada

## Classes CSS Dinâmicas

O sistema gera automaticamente classes CSS baseadas no nível e máscara:

```css
.watermark-level-{nivel}.watermark-mask-{numero}
```

Exemplo: `.watermark-level-iniciante.watermark-mask-1`

## Animações

Cada combinação de nível e máscara tem animações específicas:

- **Iniciante**: Animações suaves e calmas
- **Aprendiz**: Animações mais ativas
- **Intermediário**: Animações dinâmicas
- **Avançado**: Animações intensas
- **Expert**: Animações premium
- **Default**: Animações neutras

## Lógica de Funcionamento

1. **Seleção Randomica**: O componente sorteia uma máscara (1-4) baseada no nível
2. **Marca d'água Dinâmica**: Gera SVG inline baseado na máscara selecionada
3. **Classes CSS**: Aplica classes específicas baseadas no nível e máscara
4. **Cores Dinâmicas**: Usa cores específicas para cada nível
5. **Animações**: Aplica animações CSS baseadas na combinação nível+máscara

## Exemplo de Implementação

```tsx
// Em MaturityLevels.tsx
<MaskedParallaxCard
  bgImages={[`${import.meta.env.VITE_DIRECTUS_URL}/assets/${card.bg_image}`]}
  characterImage={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${card.image}`}
  level={card.overline?.toLowerCase() || 'default'}
/>
```

## Estrutura de Z-Index

- **Background**: z-index: 0
- **Marca d'água**: z-index: 20
- **Personagem**: z-index: 30
- **Conteúdo**: z-index: 40

## Animações CSS

O sistema inclui animações específicas para cada nível:

- `pulse-{nivel}` - Efeito de pulsação
- `rotate-{nivel}` - Rotação contínua
- `bounce-{nivel}` - Efeito de salto
- `glow-{nivel}` - Efeito de brilho

## Responsividade

O componente é totalmente responsivo e usa classes Tailwind CSS para adaptação mobile-first. 