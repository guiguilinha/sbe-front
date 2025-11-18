import React from 'react';
import { Share2, Mail } from 'lucide-react';
import { fixImageUrl } from "@/services/api";
import type { CalculatedResult, UserResultsData } from '../../types';
import { handleSmoothScroll } from '../../lib/scroll-utils';
import { useCallback } from 'react';
import { ResultsMiniCard } from './MiniCard';

interface ResultsSidebarProps {
  calculatedResult: CalculatedResult;
  resultsData: UserResultsData;
}

const ResultsSidebar: React.FC<ResultsSidebarProps> = ({
  calculatedResult,
  resultsData
}) => {
  const level = calculatedResult.general_level.title;
  const totalScore = calculatedResult.total_score;
  const maxScore = 60; // Score máximo fixo
  const percentage = Math.round((totalScore / maxScore) * 100);
  const heroImage = resultsData["hero-section"]["hero-image"];

  const navLinks = [
    { href: '#hero-section', label: 'Início', id: 'hero-section' },
    { href: '#advice-section', label: 'Seu nível', id: 'advice-section' },
    { href: '#category-section', label: 'Análise por categoria', id: 'category-section' },
    { href: '#cta-section', label: `Trilha ${level}`, id: 'cta-section' },
    { href: '#conclusion-section', label: 'Conclusão', id: 'conclusion-section' },
    { href: '#content-section', label: 'Conteúdos', id: 'content-section' },
    { href: '#mapa-mg', label: 'Nossas agências', id: 'mapa-mg' },
  ];

  // Estado para controlar qual link está ativo
  const [activeSection, setActiveSection] = React.useState('hero-section');

  // Detectar qual seção está ativa baseada no scroll
  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['hero-section', 'advice-section', 'category-section', 'cta-section', 'conclusion-section', 'content-section', 'mapa-mg'];
          const scrollPosition = window.scrollY + 150; // Offset para considerar o header

          for (let i = sections.length - 1; i >= 0; i--) {
            const element = document.getElementById(sections[i]);
            if (element && element.offsetTop <= scrollPosition) {
              setActiveSection(sections[i]);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Callback otimizado para scroll suave
  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSmoothScroll(e, href, 100, 800);
  }, []);

  return (
    <div className="sticky top-20 bg-white rounded-lg shadow-lg p-6 space-y-6">
      {/* Seção de Nível */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          {heroImage ? (
            <img 
              src={fixImageUrl(heroImage)} 
              alt="Ícone de maturidade" 
              className="w-8 h-8 rounded-full object-cover" /> 
          ) : (
            <img 
              src="/assets/sprout-icon.svg" 
              alt="Ícone de crescimento" 
              className="w-4 h-4" /> 
          )}
        </div>
        <div>
          <p className="text-sm text-gray-600">Seu nível de maturidade é:</p>
          <p className="font-bold text-gray-900">{level}</p>
        </div>
      </div>

      {/* Progresso */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progresso</span>
          <span className="text-sm text-gray-600">{totalScore} / {maxScore} pontos</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">({percentage}% do máximo)</p>
      </div>
      <ResultsMiniCard 
        calculatedResult={calculatedResult} 
        buttonUrl={resultsData["cta-section"]["trail-link"]}
      />
      {/* Navegação */}
      <div>
        <h4 className="font-bold text-gray-900 mb-3">NESTA PÁGINA</h4>
        <nav className="space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`block text-sm py-2 px-3 rounded transition-colors cursor-pointer ${
                activeSection === link.id
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Botões de Ação */}
      {/*
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
          <Share2 size={16} />
          <span>Compartilhar resultados</span>
        </button>
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
          <Mail size={16} />
          <span>Enviar por e-mail</span>
        </button>
      </div>
      */}
    </div>
  );
};

export default ResultsSidebar; 