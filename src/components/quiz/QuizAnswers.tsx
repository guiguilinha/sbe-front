import React, { useState, useEffect } from 'react';
import type { QuestionData, AnswerData } from '@/types';
import { Check } from 'lucide-react';

interface QuizAnswersProps {
  question: QuestionData;
  answers: AnswerData[];
  selectedAnswer?: number;
  onAnswerSelect: (answerId: number) => void;
}

const QuizAnswers: React.FC<QuizAnswersProps> = ({
  question,
  answers,
  selectedAnswer,
  onAnswerSelect,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset isProcessing when answers change
  useEffect(() => {
    setIsProcessing(false);
  }, [answers]);

  const handleAnswerClick = (answerId: number) => {
    if (selectedAnswer === answerId || isProcessing) {
      return; // Evitar cliques múltiplos
    }

    setIsProcessing(true);
    onAnswerSelect(answerId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Pergunta */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {question.question}
        </h2>
      </div>

      {/* Respostas */}
      <div className="space-y-3">
        {(answers || []).map((answer) => {
          const isSelected = selectedAnswer === answer.id;
          const isProcessingAnswer = isSelected && isProcessing;
          
          return (
            <button
              key={answer.id}
              onClick={() => handleAnswerClick(answer.id)}
              disabled={isProcessing}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } ${isProcessing && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{answer.answer}</span>
                {isProcessingAnswer && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">Selecionado</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      {isProcessing && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Avançando para próxima pergunta...
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizAnswers; 