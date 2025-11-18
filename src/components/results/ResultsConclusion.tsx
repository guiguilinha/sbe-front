import React from 'react';
import { CircleAlert, CalendarClock, SquareCheckBig  } from 'lucide-react';
import { processConclusionLogic } from '../../utils/conclusionLogic';
import type { CategorySectionData } from '../../types';

interface ResultsConclusionProps {
  conclusionSection: {
    "conclusion-title": string;
    "conclusion-positive-feedback": string;
    "conclusion-attention-feeback": string;
    "conclusion-advice": string;
  };
  categorySection: CategorySectionData;
}

const ResultsConclusion: React.FC<ResultsConclusionProps> = ({
  conclusionSection,
  categorySection,
}) => {
  // Processar lógica de conclusão
  const conclusionData = processConclusionLogic(
    categorySection["category-itens"],
    conclusionSection["conclusion-positive-feedback"],
    conclusionSection["conclusion-attention-feeback"],
    conclusionSection["conclusion-advice"]
  );

  // Função para destacar categorias no texto
  const highlightCategories = (text: string, category: string, color: string) => {
    const parts = text.split(category);
    return (
      <>
        {parts[0]}
        <span className={`font-bold ${color}`}>
          {category}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="p-8">
      {/* Título */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {conclusionSection["conclusion-title"]}
      </h2>

      {/* Lista de itens */}
      <div className="space-y-4">
        {/* Linha vertical azul */}
        <div className="relative border-l-2 border-blue-500">
          <div className="space-y-4 pl-8">
            {/* Item 1 - Maturidade Sólida */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 flex items-center justify-center">
                  <SquareCheckBig className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed">
                  {highlightCategories(conclusionData.positiveText, conclusionData.firstCategory, 'text-blue-600')}
                </p>
              </div>
            </div>

            {/* Item 2 - Foco Recomendado (só mostra se não todas máximas) */}
            {conclusionData.attentionText && conclusionData.lastCategory && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <CircleAlert className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">
                    {highlightCategories(conclusionData.attentionText, conclusionData.lastCategory, 'text-red-600')}
                  </p>
                </div>
              </div>
            )}

            {/* Item 3 - Lembrete */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 flex items-center justify-center">
                  <CalendarClock className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed">
                  {conclusionData.adviceText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsConclusion; 