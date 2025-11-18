import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Text,
} from 'recharts';

interface CategoryScore {
  name: string;
  score: number;
}

interface ResultsDashboardProps {
  scores: CategoryScore[];
}

// Componente customizado para os textos do eixo
const CustomizedAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <Text
      x={x}
      y={y}
      textAnchor={x > 150 ? 'start' : x < 150 ? 'end' : 'middle'} // Ajusta a âncora do texto
      verticalAnchor="middle"
      fill="#4B5563" // Cor do texto (cinza)
      fontSize={12}
    >
      {payload.value}
    </Text>
  );
};

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ scores }) => {
  // O Recharts espera os dados com a chave 'fullMark'
  const data = scores.map(item => ({
    ...item,
    fullMark: 100, // Pontuação máxima para a escala do gráfico
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <h2 id="dashboard-title" className="text-xl font-bold text-gray-800 mb-4 text-center">
        Seu Desempenho em Detalhes
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#D1D5DB" />
          <PolarAngleAxis dataKey="name" tick={<CustomizedAxisTick />} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Maturidade"
            dataKey="score"
            stroke="#005EB8" // Azul Sebrae para a linha
            fill="#005EB8"   // Azul Sebrae para o preenchimento
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsDashboard; 