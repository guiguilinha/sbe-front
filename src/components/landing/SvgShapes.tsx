// Este componente não renderiza nada visível,
// ele apenas define os "moldes" para o CSS usar.
export function SvgShapes() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        {/* Molde para o Header (a "tampa") */}
        <clipPath id="shape-header" clipPathUnits="objectBoundingBox">
          {/* 1. Desenhamos um retângulo simples */}
          {/* 2. Aplicamos a transformação de inclinação (skewX) diretamente nele */}
          <polygon points="0.15 0.7, 0.05 0.7, 0.05 0, 0.9 0, 0.9 1, 0.15 1" transform="skewX(-3)" />
        </clipPath>

        {/* Molde para o Body (a "base") */}
        <clipPath id="shape-body" clipPathUnits="objectBoundingBox">
          {/* O mesmo para o corpo, com um recorte inicial para o encaixe */}
          <polygon points="0.15 0.2,0.05 0.2, 0.05 0, 1 0, 1 1, 0.15 1" transform="skewX(-15)" />
        </clipPath>
      </defs>
    </svg>
  );
} 