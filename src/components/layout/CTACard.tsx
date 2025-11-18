import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface CTACardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl?: string;
  onButtonClick?: () => void;
  highlightedText?: string;
  className?: string;
}

const CTACard: React.FC<CTACardProps> = ({
  title,
  description,
  buttonText,
  buttonUrl,
  onButtonClick,
  highlightedText,
  className = '',
}) => {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (buttonUrl) {
      window.open(buttonUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Função para destacar texto específico
  const renderHighlightedText = (text: string) => {
    if (!highlightedText) return text;
    
    const parts = text.split(highlightedText);
    return (
      <>
        {parts[0]}
        <span className="text-blue-600 font-semibold">{highlightedText}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`bg-blue-50 rounded-xl shadow-lg p-8 ${className}`}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Seção de Texto */}
        <div className="flex-1 space-y-4">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800 leading-tight">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
            {renderHighlightedText(description)}
          </p>
        </div>

        {/* Seção do Botão */}
        <div className="flex-shrink-0">
          <Button
            onClick={handleClick}
            size="default"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-sm lg:text-md md:text-md sm:text-md font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            {buttonText}
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CTACard; 