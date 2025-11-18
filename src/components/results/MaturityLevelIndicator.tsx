import React from 'react';

interface MaturityLevel {
  name: string;
  description: string;
  color: string;
  icon: string;
  range: [number, number];
}

interface MaturityLevelIndicatorProps {
  score: number;
}

const MaturityLevelIndicator: React.FC<MaturityLevelIndicatorProps> = ({ 
  score
}) => {
  const levels: MaturityLevel[] = [
    {
      name: 'Iniciante',
      description: 'Começando a jornada digital',
      color: '#FF6B6B',
      icon: '🌱',
      range: [15, 30]
    },
    {
      name: 'Intermediário',
      description: 'Em desenvolvimento digital',
      color: '#4ECDC4',
      icon: '📈',
      range: [31, 45]
    },
    {
      name: 'Avançado',
      description: 'Bem posicionado digitalmente',
      color: '#45B7D1',
      icon: '🚀',
      range: [46, 55]
    },
    {
      name: 'Expert',
      description: 'Líder em transformação digital',
      color: '#96CEB4',
      icon: '🏆',
      range: [56, 60]
    }
  ];

  const getCurrentLevel = () => {
    return levels.find(level => 
      score >= level.range[0] && score <= level.range[1]
    ) || levels[0];
  };

  const currentLevelData = getCurrentLevel();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Seu Nível de Maturidade
      </h3>

      {/* Nível atual */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">{currentLevelData.icon}</div>
        <h4 className="text-lg font-bold mb-2" style={{ color: currentLevelData.color }}>
          {currentLevelData.name}
        </h4>
        <p className="text-gray-600 text-sm">{currentLevelData.description}</p>
      </div>

      {/* Todos os níveis */}
      <div className="space-y-3">
        <h5 className="font-semibold text-gray-700 mb-3">Níveis de Maturidade:</h5>
        {levels.map((level) => {
          const isCurrent = level.name === currentLevelData.name;
          const isCompleted = score > level.range[1];
          
          return (
            <div 
              key={level.name}
              className={`flex items-center p-3 rounded-lg border-2 transition-all ${
                isCurrent 
                  ? 'border-blue-500 bg-blue-50' 
                  : isCompleted 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="text-2xl mr-3">{level.icon}</div>
              <div className="flex-1">
                <div className={`font-semibold ${
                  isCurrent ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {level.name}
                </div>
                <div className="text-xs text-gray-500">
                  {level.range[0]} - {level.range[1]} pontos
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full ${
                isCurrent 
                  ? 'bg-blue-500' 
                  : isCompleted 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
              }`} />
            </div>
          );
        })}
      </div>

      {/* Barra de progresso */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>0 pontos</span>
          <span>60 pontos</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((score / 60) * 100, 100)}%` }}
          />
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          {score} pontos alcançados
        </div>
      </div>
    </div>
  );
};

export default MaturityLevelIndicator; 