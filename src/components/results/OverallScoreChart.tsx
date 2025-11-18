import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface OverallScoreChartProps {
  score: number;
  level: string;
}

const OverallScoreChart: React.FC<OverallScoreChartProps> = ({ score, level }) => {
  // Criar dados para o gráfico de rosca
  const data = [
    { name: 'Pontuação', value: score, fill: '#005EB8' }, // Azul Sebrae
    { name: 'Restante', value: 100 - score, fill: '#E5E7EB' }, // Cinza claro
  ];

  // Customizar tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">
            {payload[0].name}: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Determinar cor baseada no nível
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'iniciante':
        return '#FF6B35'; // Laranja
      case 'intermediário':
        return '#F59E0B'; // Amarelo
      case 'avançado':
        return '#10B981'; // Verde
      case 'expert':
        return '#7C3AED'; // Roxo
      default:
        return '#005EB8'; // Azul Sebrae
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Sua Pontuação Geral
      </h3>
      
      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Pontuação central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-gray-800">{score}%</div>
          <div className="text-sm text-gray-600 mt-1">{level}</div>
        </div>
      </div>

      {/* Indicador de nível */}
      <div className="mt-4">
        <div 
          className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
          style={{ 
            backgroundColor: getLevelColor(level) + '20',
            color: getLevelColor(level)
          }}
        >
          {level}
        </div>
      </div>
    </div>
  );
};

export default OverallScoreChart; 