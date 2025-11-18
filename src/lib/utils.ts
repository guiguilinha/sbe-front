import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gera um número inteiro aleatório entre min e max (inclusive)
 * @param min - Valor mínimo (inclusive)
 * @param max - Valor máximo (inclusive)
 * @returns Número inteiro aleatório entre min e max
 * 
 * @example
 * ```typescript
 * // Gerar número entre 1 e 3 (para order da API)
 * const randomOrder = getRandomInt(1, 3);
 * 
 * // Gerar número entre 0 e 9
 * const randomDigit = getRandomInt(0, 9);
 * 
 * // Gerar número entre 10 e 100
 * const randomPercent = getRandomInt(10, 100);
 * ```
 */
export function getRandomInt(min: number, max: number): number {
  // Garantir que min e max são inteiros
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  
  // Gerar número aleatório entre min e max (inclusive)
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}

/**
 * Gera um número decimal aleatório entre min e max
 * @param min - Valor mínimo (inclusive)
 * @param max - Valor máximo (exclusive)
 * @param decimals - Número de casas decimais (padrão: 2)
 * @returns Número decimal aleatório entre min e max
 * 
 * @example
 * ```typescript
 * // Gerar número decimal entre 0 e 1 com 2 casas decimais
 * const randomFloat = getRandomFloat(0, 1);
 * 
 * // Gerar preço entre 10.00 e 99.99
 * const randomPrice = getRandomFloat(10, 100, 2);
 * 
 * // Gerar nota entre 0.0 e 10.0 com 1 casa decimal
 * const randomGrade = getRandomFloat(0, 10, 1);
 * ```
 */
export function getRandomFloat(min: number, max: number, decimals: number = 2): number {
  const random = Math.random() * (max - min) + min;
  return Math.round(random * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Seleciona um item aleatório de um array
 * @param array - Array de itens para selecionar
 * @returns Item aleatório do array ou undefined se array vazio
 * 
 * @example
 * ```typescript
 * // Selecionar cor aleatória
 * const colors = ['red', 'blue', 'green', 'yellow'];
 * const randomColor = getRandomItem(colors);
 * 
 * // Selecionar objeto aleatório
 * const users = [{ id: 1, name: 'João' }, { id: 2, name: 'Maria' }];
 * const randomUser = getRandomItem(users);
 * ```
 */
export function getRandomItem<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[getRandomInt(0, array.length - 1)];
}

/**
 * Gera um booleano aleatório com probabilidade customizada
 * @param probability - Probabilidade de retornar true (0 a 1, padrão: 0.5)
 * @returns true ou false baseado na probabilidade
 * 
 * @example
 * ```typescript
 * // 50% de chance de ser true
 * const coinFlip = getRandomBoolean();
 * 
 * // 30% de chance de ser true
 * const rareDrop = getRandomBoolean(0.3);
 * 
 * // 80% de chance de ser true
 * const highChance = getRandomBoolean(0.8);
 * ```
 */
export function getRandomBoolean(probability: number = 0.5): boolean {
  return Math.random() < probability;
}
