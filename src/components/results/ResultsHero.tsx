import React from 'react';
import { motion } from 'framer-motion';
import type { HeroSectionData } from '../../types';
import { CheckCircle, Award } from 'lucide-react';
import { fixDirectusImageUrl } from '../../utils';

interface ResultsHeroProps {
  heroSection: HeroSectionData;
}

const ResultsHero: React.FC<ResultsHeroProps> = ({
  heroSection,
}) => {
  

  
  // Método para animações de entrada do container
  const getContainerAnimation = () => ({
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.7 }
  });

  // Método para animações de texto com delay
  const getTextAnimation = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay }
  });

  // Método para animação da imagem
  const getImageAnimation = () => ({
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.8, delay: 0.3 }
  });

  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4 max-w-7xl pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-center">
          
          {/* Coluna de Texto - 70% da largura */}
          <motion.div
            {...getContainerAnimation()}
            className="lg:col-span-7 z-10"
          >
            {/* Linha 1: "Parabéns!" */}
            {heroSection["hero-start"] && (
              <motion.h1
                {...getTextAnimation(0.2)}
                className="text-3xl md:text-3xl font-medium text-white/80 mb-1"
              >
                {heroSection["hero-start"]}
              </motion.h1>
            )}
            
            {/* Linha 2: Subtítulo */}
            {heroSection["hero-content"] && (
              <motion.p
                {...getTextAnimation(0.4)}
                className="text-lg md:text-xl text-white/80 font-medium mb-6"
              >
                {heroSection["hero-content"]}
              </motion.p>
            )}

            {/* Linha 3: Nível com destaque */}
            <motion.h2
              {...getTextAnimation(0.6)}
              className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-8"
            >
              {heroSection["hero-general-level"]}
            </motion.h2>

            {/* Caixa de descrição com ícone */}
            {heroSection["hero-insight"] && (
              <motion.div
                {...getTextAnimation(0.8)}
                className="bg-blue-400/30 backdrop-blur-sm rounded-lg p-0 mb-8 flex items-start gap-4 border-s-4 border-green-400"
              >
                <div className="flex items-start align-middle gap-3">
                  <CheckCircle className="text-green-400 w-6 h-6 mx-6 my-auto flex-shrink-0" />
                  <p className="text-white leading-relaxed font-light py-6 pe-6">
                    {heroSection["hero-insight"]}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Pontuação com ícone */}
            <motion.div
              {...getTextAnimation(1.0)}
              className="flex items-center gap-4 text-white mb-2"
            >
              <Award className="text-white w-6 h-6" />
              <div className="text-xl lg:text-2xl md:text-2xl font-semibold">
                {heroSection["hero-score-text"]} {heroSection["hero-score"]} / 60 pontos
              </div>
            </motion.div>

            {/* Percentual */}
            <motion.div
              {...getTextAnimation(1.2)}
              className="text-white/90 mb-2"
            >
              {heroSection["hero-percent"]}% de 100%
            </motion.div>

            {/* Barra de progresso */}
            <motion.div
              {...getTextAnimation(1.4)}
              className="w-full bg-green-200/30 rounded-full h-4 overflow-hidden"
            >
              <div 
                className="bg-green-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${heroSection["hero-percent"]}%` }}
              ></div>
            </motion.div>
          </motion.div>

          {/* Coluna de Imagem - 30% da largura */}
          <motion.div
            {...getImageAnimation()}
            className="lg:col-span-3 relative z-10 flex justify-center"
          >
            {/* Círculo azul claro com imagem do insight ou placeholder */}
            <div className="relative">
              <div className="w-64 h-64 bg-blue-300/40 rounded-full flex items-center justify-center overflow-hidden">
                {heroSection["hero-image"] && heroSection["hero-image"].trim() !== "" ? (
                  // Imagem do insight quando disponível
                                     <img 
                     src={fixDirectusImageUrl(heroSection["hero-image"])}
                     alt="Insight visual" 
                     className="w-48 h-48 object-cover"
                     onError={(e) => {
                       console.error('❌ Erro ao carregar imagem:', heroSection["hero-image"]);
                       console.error('❌ URL construída:', fixDirectusImageUrl(heroSection["hero-image"]));
                       e.currentTarget.style.display = 'none';
                     }}
                     onLoad={() => {
                       console.log('✅ Imagem carregada com sucesso:', heroSection["hero-image"]);
                     }}
                   />
                ) : (
                  // Placeholder quando não há imagem
                  <div className="text-center">
                    <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mb-4">
                      <div className="text-green-700 text-6xl">🌱</div>
                    </div>
                    <div className="w-24 h-8 bg-amber-800 rounded-full mx-auto"></div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResultsHero; 