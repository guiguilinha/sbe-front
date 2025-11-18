import React from 'react';
import { Lightbulb, TrendingUp } from 'lucide-react';
import type { CategorySectionData } from '../../types';

interface ResultsCategoriesProps {
  categorySection: CategorySectionData;
}

const ResultsCategories: React.FC<ResultsCategoriesProps> = ({ categorySection }) => {
  // Função para obter a cor baseada no índice
  function getCor(index: number) {
    const cores = ['bg-white', 'bg-gray-50'];
    return cores[index % cores.length];
  }

  // Função para obter a cor da barra baseada no índice
  function getColorBar(index: number) {
    const colors = ['bg-blue-200', 'bg-green-200', 'bg-orange-200', 'bg-purple-200', 'bg-yellow-200'];
    return colors[index % colors.length];
  }

  // Função para obter a cor do texto baseada no índice
  function getTextColor(index: number) {
    const colors = ['text-blue-600', 'text-green-600', 'text-orange-600', 'text-purple-600', 'text-yellow-600'];
    return colors[index % colors.length];
  }

  // Função para obter as cores baseadas no índice
  function getColorByIndex(index: number) {
    const colors = [
      { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', bar: 'bg-blue-500' },
      { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', bar: 'bg-green-500' },
      { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', bar: 'bg-orange-500' },
      { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', bar: 'bg-purple-500' },
      { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-600', bar: 'bg-yellow-500' },
    ];
    return colors[index % colors.length];
  }

  return (
    <div className="w-full p-8 mt-16 rounded-lg shadow-lg bg-white">
      {/* Header Azul */}
      <div className="bg-white text-gray-700 py-2 text-start">
        <h2 className="text-2xl font-bold mb-2">
          {categorySection["category-title"]}
        </h2>
      </div>

      {/* Conteúdo Principal - Iterar sobre categorias */}
      <div className="space-y-16">
        {categorySection["category-itens"] && categorySection["category-itens"]
          .filter(category => 
            category["category-item-insight"] !== null && 
            category["category-item-title"] !== null
          )
          .map((category, index) => {
            const colors = getColorByIndex(index);
            
            return (
              <div key={index} className={`mb-8 last:mb-0 p-6 rounded-lg shadow-md ${getCor(index)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className='items-start'>
                    <h3 className="text-xl font-semibold text-gray-700">
                      {category["category-item-title"]}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {category["category-item-level"]}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getTextColor(index)}`}>
                      {category["category-item-score"]}/12
                    </div>
                    <div className="text-sm text-gray-500">
                      {category["category-item-percent"]}%
                    </div>
                  </div>
                </div>
                
                {/* Barra de Progresso */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className={`h-2 rounded-full ${getColorBar(index)}`}
                    style={{ 
                      width: `${category["category-item-percent"]}%`
                    }}
                  />
                </div>

                {/* Conselho da Categoria */}
                {category["category-item-advice"] && (
                  <div className="mb-6">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center`}>
                          <TrendingUp className={`w-4 h-4 ${colors.text}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Insight:
                        </h4>
                        <p className="text-gray-700 text-sm">
                            {category["category-item-insight"]}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Insight da Categoria */}
                {category["category-item-insight"] && (
                  <div className="mb-6">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center`}>
                          <Lightbulb className={`w-4 h-4 ${colors.text}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Dica prática:
                        </h4>
                        <p className="text-gray-700 text-sm">
                            {category["category-item-advice"]}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* CURSOS FEATURE */}
                {category["category-item-recomendations"] && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Conteúdos recomendados:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category["category-item-recomendations"]
                        .slice(0, 2) // Máximo 2 cursos
                        .map((recommendation, index) => (
                          <div key={index} className="p-2">
                            <p className="text-blue-700 text-xs">{recommendation["content-course-title"]}</p>
                          </div>
                        ))}
                      {category["category-item-recomendations"].length > 2 && (
                        <div className="p-2">
                          <p className="text-gray-500 text-xs italic">
                            +{category["category-item-recomendations"].length - 2} outros conteúdos disponíveis
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ResultsCategories; 