interface CategoryData {
  "category-item-title": string;
  "category-item-score": string;
  "category-item-percent": string;
}

interface ConclusionData {
  positiveText: string;
  attentionText?: string;
  adviceText: string;
  firstCategory: string;
  lastCategory?: string;
}

export function processConclusionLogic(
  categories: CategoryData[],
  positiveTemplate: string,
  attentionTemplate: string,
  adviceText: string
): ConclusionData {
  // Função para formatar lista com vírgulas e "e" antes da última
  const formatCategoryList = (categoryList: string[]): string => {
    if (categoryList.length === 0) return '';
    if (categoryList.length === 1) return categoryList[0];
    if (categoryList.length === 2) return `${categoryList[0]} e ${categoryList[1]}`;
    
    const allButLast = categoryList.slice(0, -1);
    const last = categoryList[categoryList.length - 1];
    return `${allButLast.join(', ')} e ${last}`;
  };

  if (!categories || categories.length === 0) {
    return {
      positiveText: positiveTemplate,
      adviceText,
      firstCategory: '',
      lastCategory: undefined
    };
  }

  // Ordenar categorias por pontuação (maior para menor)
  const sortedCategories = [...categories].sort((a, b) => {
    const scoreA = parseInt(a["category-item-percent"]);
    const scoreB = parseInt(b["category-item-percent"]);
    return scoreB - scoreA;
  });

  // Identificar pontuação máxima
  const maxScore = parseInt(sortedCategories[0]["category-item-percent"]);
  const maxScoreCategories = sortedCategories.filter(cat => 
    parseInt(cat["category-item-percent"]) === maxScore
  );
  const allMaxScore = maxScoreCategories.length === sortedCategories.length;

  // Selecionar categorias
  let firstCategory: string;
  let lastCategory: string | undefined;

  if (allMaxScore) {
    // Se todas têm pontuação máxima, usar todas as categorias
    firstCategory = formatCategoryList(maxScoreCategories.map(cat => cat["category-item-title"]));
    lastCategory = undefined;
  } else {
    // Se não todas máximas, usar todas as categorias com pontuação máxima na primeira frase
    firstCategory = formatCategoryList(maxScoreCategories.map(cat => cat["category-item-title"]));
    lastCategory = sortedCategories[sortedCategories.length - 1]["category-item-title"];
  }

  // Processar textos - substituir apenas uma vez
  const positiveText = positiveTemplate.replace('{firstCategory}', firstCategory);
  const attentionText = allMaxScore ? undefined : attentionTemplate.replace('{lastCategory}', lastCategory!);

  return {
    positiveText,
    attentionText,
    adviceText,
    firstCategory,
    lastCategory
  };
} 