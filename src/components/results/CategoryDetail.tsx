import React from 'react';

interface CategoryDetailProps {
  name: string;
  description: string;
  level: string;
  percent: number;
  tip: string;
  colorClass?: string;
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ name, description, level, percent, tip, colorClass = 'bg-blue-600 text-blue-800' }) => (
  <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
    <h3 className="text-lg font-bold text-blue-800 mb-2">{name}</h3>
    <p className="text-gray-700 mb-4">{description}</p>
    <div className="flex items-center gap-4 mb-2">
      <div className="flex-1">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className={`${colorClass} h-3 rounded-full`} style={{ width: `${percent}%` }} />
        </div>
      </div>
      <span className="text-sm font-semibold text-blue-800 ml-2">Nível: {level}</span>
    </div>
    <p className="text-green-700 text-sm mt-2">Dica: {tip}</p>
  </section>
);

export default CategoryDetail; 