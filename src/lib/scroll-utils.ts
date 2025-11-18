/**
 * Utilitários para scroll suave e animações
 */

/**
 * Função de easing easeOutCubic para animações suaves
 * @param t - Progresso da animação (0 a 1)
 * @returns Valor eased entre 0 e 1
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Função de easing easeOutQuart para desaceleração mais suave
 * @param t - Progresso da animação (0 a 1)
 * @returns Valor eased entre 0 e 1
 */
export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

/**
 * Função de easing easeOutExpo para desaceleração muito suave
 * @param t - Progresso da animação (0 a 1)
 * @returns Valor eased entre 0 e 1
 */
export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Realiza scroll suave para uma posição específica
 * @param targetY - Posição Y de destino
 * @param duration - Duração da animação em milissegundos
 * @param easingFunction - Função de easing a ser usada
 */
export function smoothScrollTo(
  targetY: number, 
  duration = 700, 
  easingFunction: (t: number) => number = easeOutCubic
): void {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start: number | null = null;

  function step(timestamp: number) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easingFunction(progress);
    window.scrollTo(0, startY + diff * eased);
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }
  
  window.requestAnimationFrame(step);
}

/**
 * Realiza scroll suave para um elemento específico
 * @param elementId - ID do elemento de destino
 * @param offset - Offset adicional (útil para headers fixos)
 * @param duration - Duração da animação em milissegundos
 * @param easingFunction - Função de easing a ser usada
 */
export function smoothScrollToElement(
  elementId: string,
  offset = 80,
  duration = 700,
  easingFunction: (t: number) => number = easeOutCubic
): void {
  const element = document.getElementById(elementId);
  if (element) {
    const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
    smoothScrollTo(targetY, duration, easingFunction);
  }
}

/**
 * Handler para scroll suave em links de âncora
 * @param e - Evento de clique
 * @param url - URL do link (deve começar com #)
 * @param offset - Offset adicional
 * @param duration - Duração da animação
 * @param easingFunction - Função de easing
 */
export function handleSmoothScroll(
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  url: string,
  offset = 80,
  duration = 700,
  easingFunction: (t: number) => number = easeOutCubic
): void {
  if (url.startsWith('#')) {
    e.preventDefault();
    const elementId = url.replace('#', '');
    smoothScrollToElement(elementId, offset, duration, easingFunction);
  }
} 