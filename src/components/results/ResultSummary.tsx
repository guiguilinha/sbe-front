import React from 'react';

interface ResultSummaryProps {
  level: string;
  subtitle?: string;
  summary: string;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({ level, subtitle, summary }) => {
  return (
    <section className="" id="resumo-nivel">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col">
            <p className="text-gray-700 text-lg font-regular leading-relaxed mb-6">{summary}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Entenda como é calculado o nível de maturidade {level}</h2>
            {subtitle && <h3 className="text-lg text-gray-700 mb-2">{subtitle}</h3>}
            <p className="text-gray-700 text-lg font-regular leading-relaxed mb-6">
            O nível de maturidade digital é formado com a média do resultado de cinco importantes temas observados, cada resposta é relacionada a um tema e recebe uma pontuação.

A pontuação total em cada tema determina seu nível de maturidade digital neste tema, a soma total destes resultados indica o nível de maturidade digital do seu negócio.
            </p>
        </div>
    </section>
  );
};

export default ResultSummary; 