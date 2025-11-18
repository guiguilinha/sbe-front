import React from 'react';
import { motion } from 'framer-motion';
import type { AdviceSectionData } from '../../types';
import { BookOpen } from 'lucide-react';

interface ResultsAdviceProps {
  adviceSection: AdviceSectionData;
}

const ResultsAdvice: React.FC<ResultsAdviceProps> = ({
  adviceSection,
}) => {
  
  // Método para animações de entrada do container
  const getContainerAnimation = () => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  });

  // Método para animações de texto com delay
  const getTextAnimation = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay }
  });

  return (
    <div className="space-y-12">
      
      {/* Seção de Conselhos */}
      <motion.section
        {...getContainerAnimation()}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <motion.div
          {...getTextAnimation(0.2)}
          className="text-start mb-8 max-w-2xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-balance">
            <span className="font-medium font-sans pb-4">{adviceSection["advice-title"]}</span> <br/>
            <span className="text-blue-600 text-3xl">{adviceSection["advice-general-level"]}</span> 
          </h2>
        </motion.div>

        <motion.div
          {...getTextAnimation(0.4)}
          className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed">
                {adviceSection["advice-content"]}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default ResultsAdvice; 