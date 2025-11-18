import React, { useMemo } from 'react';

// Componente de máscara animada com parallax (versão local)
interface MaskedParallaxBackgroundProps {
  mask: string;
  bg: string;
  className?: string;
  style?: React.CSSProperties;
}

const MaskedParallaxBackground: React.FC<MaskedParallaxBackgroundProps> = ({ mask, bg, className = '', style = {} }) => (
  <div
    className={`absolute inset-0 w-full h-48 top-8 pointer-events-none ${className}`}
    style={{
      WebkitMaskImage: `url('${mask}')`,
      maskImage: `url('${mask}')`,
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskSize: 'cover',
      maskSize: 'contain',
      maskPosition: 'center',
      backgroundImage: `url('${bg}')`,
      backgroundSize: 'contain',
      backgroundPosition: '0% 50%',
      animation: 'parallaxX 120s linear infinite',
      ...style,
    }}
    aria-hidden="true"
  />
);

interface MaskedParallaxCardProps {
  bgImages: string[]; // Array de URLs de backgrounds animados
  characterImage?: string; // URL do personagem
  watermarkImage?: string; // URL da marca d'água (opcional)
  level?: string; // Adicionar prop para identificar o nível
  children?: React.ReactNode;
}

export const MaskedParallaxCard: React.FC<MaskedParallaxCardProps> = ({
  bgImages,
  characterImage,
  watermarkImage,
  level = 'default', // Valor padrão
  children
}) => {
  // Sorteia máscara
  const maskIdx = useMemo(() => Math.floor(Math.random() * 8) + 1, [level]);
  const mask = `/images/masks/mask-${maskIdx}.svg`;
  
  // Sorteia background
  const bgIdx = useMemo(() => Math.floor(Math.random() * bgImages.length), [bgImages]);
  const selectedBg = bgImages[bgIdx];

  // Função para obter cores baseadas no nível
  const getLevelColors = (level: string) => {
    const colors = {
      'iniciante': { first: '#61b466', second: '#90d275', third: '#9ff0bd', fourth: '#cadf61', fifth: '#e7f79e' },
      'aprendiz': { first: '#FBEC76', second: '#FCEE84', third: '#FCF091', fourth: '#FDF2A0', fifth: '#FDF4AD' },
      'empreendedor': { first: '#94B3FF', second: '#9FBBFF', third: '#AAC2FF', fourth: '#D97706', fifth: '#BFD1FF' },
      'inovador': { first: '#BE64E3', second: '#C574E6', third: '#CB83E9', fourth: '#D293EC', fifth: '#D8A2EE' },
      'default': { first: '#2356D4', second: '#2356D4', third: '#2356D4', fourth: '#2356D4', fifth: '#2356D4' },
    };
    
    return colors[level as keyof typeof colors] || colors.default;
  };

  const colors = getLevelColors(level);

  // Função para renderizar SVG baseado no número da máscara
  const renderMaskSVG = () => {
    switch (maskIdx) {
      case 1:
        return (
          <svg
            className="absolute inset-0 w-full h-48 object-scale-down z-10 pointer-events-none top-8"
            viewBox="0 0 485 320"
            aria-hidden="true"
          >
            <g id="sup-mask-1">
              <g id="mask-1">
                <g id="Vector 48">
                  <path
                    id="first"
                    d="M291.833 136.21L295.594 116.987H329.86L333.203 96.5107H366.634L362.455 116.36L395.283 116.674L399.647 97.3465H432.242L428.063 116.987L395.283 116.674L390.871 136.21H358.276H291.833Z"
                    fill={colors.first}
                  />
                  <path
                    id="second"
                    d="M276.815 229.815H464.001L449.192 302.945H261.277L276.815 229.815Z"
                    fill={colors.second}
                  />
                </g>
              </g>
            </g>
          </svg>
        );
      
      case 2:
        return (
          <svg
            className="absolute inset-0 w-full h-48 object-scale-down z-10 pointer-events-none top-8"
            viewBox="0 0 485 320"
            aria-hidden="true"
          >
            <g id="sup-mask-2">
              <g id="mask-2">
                <g id="Group 114">
                  <path
                    id="first"
                    d="M31.5804 22.0303H159.695L151.61 58.53H23L31.5804 22.0303Z"
                    fill={colors.first}
                  />
                  <path
                    id="second"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M461.999 183.481L452.798 227.472H384.879L393.903 183.481H461.999ZM293.145 137.798L283.213 183.481H354.276L363.864 137.798H293.145ZM93.0977 319.403H184.515L193.539 273.72H102.736L93.0977 319.403Z"
                    fill={colors.second}
                  />
                </g>
              </g>
            </g>
          </svg>
        );
      
      case 3:
        return (
          <svg
            className="absolute inset-0 w-full h-48 object-scale-down z-10 pointer-events-none top-8"
            viewBox="0 0 485 320"
            aria-hidden="true"
          >
            <g id="sup-mask-3">
              <g id="mask-3">
                <g id="Group 116">
                  <path
                    id="first"
                    d="M371.066 292.809H462L457.477 319.275H364.844L371.066 292.809Z"
                    fill={colors.first}
                  />
                  <path
                    id="second"
                    d="M307.932 58.293H376.111L361.194 125.632H292.102L307.932 58.293Z"
                    fill={colors.second}
                  />
                  <path
                    id="third"
                    d="M38.8302 222.119H152.573L137.656 289.458H23L38.8302 222.119Z"
                    fill={colors.third}
                  />
                </g>
              </g>
            </g>
          </svg>
        );
      
      case 4:
        return (
          <svg
            className="absolute inset-0 w-full h-48 object-scale-down z-10 pointer-events-none top-8"
            viewBox="0 0 485 320"
            aria-hidden="true"
          >
            <g id="sup-mask-4">
              <g id="mask-4">
                <path
                  id="first"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M463 178.685L453.434 224.422H359.629L369.011 178.685H463ZM143.527 0.00233537L133.202 47.4983H207.084L217.053 0.00233537H143.527ZM23 320H118.045L127.427 272.504H33.0212L23 320Z"
                  fill={colors.first}
                />
              </g>
            </g>
          </svg>
        );
      
      case 5:
        return (
          <svg
            className="absolute inset-0 w-full h-48 object-scale-down z-10 pointer-events-none top-8"
            viewBox="0 0 485 320"
            aria-hidden="true"
          >
            <g id="sup-mask-5">
              <g id="mask-5">
                <g id="Group 117">
                  <path
                    id="first"
                    d="M176.479 8.34082H287.8L275.305 64.7471H163.219L176.479 8.34082Z"
                    fill={colors.first}
                  />
                  <path
                    id="second"
                    d="M375.79 129.794H440.533L433.266 162.599H368.078L375.79 129.794Z"
                    fill={colors.second}
                  />
                  <g id="elento_recorte">
                    <path
                      id="third"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M23 319.273L40.4622 236.653H127.402L116.566 286.433H174.953L167.911 319.273H23Z"
                      fill={colors.third}
                    />
                    <path
                      id="fourth"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M192.67 203.813H134.55L127.402 236.653H185.628L174.953 286.433H233.329L250.53 203.813H192.67Z"
                      fill={colors.fourth}
                    />
                    <path
                      id="fifth"
                      d="M127.402 236.653H40.4622L23 319.273H167.911L174.953 286.433M127.402 236.653L116.566 286.433H174.953M127.402 236.653L134.55 203.813H192.67H250.53L233.329 286.433H174.953M127.402 236.653H185.628L174.953 286.433"
                      fill={colors.fifth}
                      stroke={colors.fifth}
                      strokeWidth="0.521261"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        );
      
      case 6:
        return (
          <svg
            className="absolute inset-0 w-full h-48 object-scale-down z-10 pointer-events-none top-8"
            viewBox="0 0 485 320"
            aria-hidden="true"
          >
            <g id="sup-mask-6">
              <g id="mask-6">
                <g id="Group 115">
                  <path
                    id="first"
                    d="M450.721 122.268L440.226 168.247H369.258L379.33 122.268H450.721Z"
                    fill={colors.first}
                  />
                  <path
                    id="second"
                    d="M255.158 274.02L244.768 319.499H154.203L164.199 274.02H255.158Z"
                    fill={colors.second}
                  />
                  <path
                    id="third"
                    d="M203.13 27.749L192.74 73.2286H102.176L112.171 27.749H203.13Z"
                    fill={colors.third}
                  />
                </g>
              </g>
            </g>
          </svg>
        );
      
      case 7:
        return (
          <svg
            className="absolute inset-0 w-full h-48 object-scale-down z-10 pointer-events-none top-8"
            viewBox="0 0 485 320"
            aria-hidden="true"
          >
            <g id="sup-mask-7">
              <g id="mask-7">
                <g id="Group 118">
                  <path
                    id="first"
                    d="M313.21 1L302.105 49.6517H227.012L237.669 1H313.21Z"
                    fill={colors.first}
                    />
                  <path
                    id="second"
                    d="M461.999 144.486L450.894 193.138H375.801L386.458 144.486H461.999Z"
                    fill={colors.second}
                  />
                  <path
                    id="third"
                    d="M132.119 141.029L121.125 189.152H24L35.873 141.029H132.119Z"
                    fill={colors.third}
                  />
                </g>
              </g>
            </g>
          </svg>
        );
      
      case 8:
        return (
          <svg
            className="absolute inset-0 w-full h-48 object-scale-down z-10 pointer-events-none top-8"
            viewBox="0 0 485 320"
            aria-hidden="true"
          >
            <g id="sup-mask-8" clipPath="url(#clip0_380_1940)">
              <g id="mask-8">
                <g id="Group 119">
                  <path
                    id="first"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M463 0H266.877L257.594 41.1752H423.703L401.41 137.344H432.525L463 0Z"
                    fill={colors.first}
                  />
                  <path
                    id="second"
                    d="M178.124 226.198H43.2897L22 320.622H157.172L178.124 226.198Z"
                    fill={colors.second}
                    />
                </g>
              </g>
            </g>
            <defs>
              <clipPath id="clip0_380_1940">
                <rect width="485" height="320" fill="transparent" />
              </clipPath>
            </defs>
          </svg>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* Background animado com máscara */}
      <MaskedParallaxBackground
        mask={mask}
        bg={selectedBg}
        className="absolute inset-0"
        style={{ zIndex: 0 }}
      />

      {/* Máscara SVG extra por cima - DINÂMICA */}
      {renderMaskSVG()}

      {/* Marca d'água */}
      {watermarkImage && (
        <img
          src={watermarkImage}
          alt=""
          className="absolute top-4 right-4 w-16 h-16 opacity-30 z-20 pointer-events-none"
          aria-hidden="true"
          draggable={false}
        />
      )}

      {/* Personagem */}
      {characterImage && (
        <img
          src={characterImage}
          alt=""
          className="absolute inset-0 w-full h-full object-contain z-30 pointer-events-none"
          aria-hidden="true"
          draggable={false}
        />
      )}

      {/* Conteúdo à frente */}
      <div className="relative z-40 flex items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
};