import React from 'react';
import { CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

interface ResultsDeepDiveProps {
  strengths: string[];
  areasForImprovement: string[];
  nextSteps: {
    title: string;
    description: string;
    url: string;
  }[];
}

const ResultsDeepDive: React.FC<ResultsDeepDiveProps> = ({
  strengths,
  areasForImprovement,
  nextSteps,
}) => {
  return (
    <div className="space-y-8">
      {/* Seção Pontos Fortes */}
      <section id="pontos-fortes" className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="flex items-center text-lg font-bold text-green-700 mb-3">
          <CheckCircle className="h-5 w-5 mr-2" />
          Seus Pontos Fortes
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 pl-2">
          {strengths.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </section>

      {/* Seção Áreas para Melhoria */}
      <section id="areas-melhoria" className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="flex items-center text-lg font-bold text-yellow-700 mb-3">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Áreas para Melhoria
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 pl-2">
          {areasForImprovement.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </section>

      {/* Seção Próximos Passos */}
      <section id="proximos-passos" className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Próximos Passos Recomendados</h3>
        <div className="space-y-4">
          {nextSteps.map((step, index) => (
            <a
              key={index}
              href={step.url}
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-blue-800">{step.title}</p>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-800 transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResultsDeepDive; 