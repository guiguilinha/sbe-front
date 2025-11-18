import React from 'react';

interface QuizProgressBarProps {
  current: number;
  total: number;
}

const QuizProgressBar: React.FC<QuizProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-8 mt-4 ">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
      <div className="flex justify-between mt-3 mb-4 text-sm text-gray-600">
        <span>Pergunta {current} de {total}</span>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default QuizProgressBar; 