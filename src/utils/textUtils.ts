/**
 * Substitui variáveis em um texto usando o formato {variavel}
 * @param text - Texto com variáveis no formato {variavel}
 * @param variables - Objeto com as variáveis e seus valores
 * @returns Texto com as variáveis substituídas
 */
export function replaceVariables(text: string, variables: Record<string, string | number>): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text.replace(/\{(\w+)\}/g, (match, variableName) => {
    const value = variables[variableName];
    return value !== undefined ? String(value) : match;
  });
}

/**
 * Valida se um texto contém variáveis no formato {variavel}
 * @param text - Texto para validar
 * @returns true se contém variáveis, false caso contrário
 */
export function hasVariables(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }
  return /\{(\w+)\}/.test(text);
}

/**
 * Lista todas as variáveis encontradas em um texto
 * @param text - Texto para analisar
 * @returns Array com os nomes das variáveis encontradas
 */
export function extractVariables(text: string): string[] {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const matches = text.match(/\{(\w+)\}/g);
  if (!matches) {
    return [];
  }

  return matches.map(match => match.slice(1, -1)); // Remove { e }
} 