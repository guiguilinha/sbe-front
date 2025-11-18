import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, Play } from 'lucide-react';
import type { CalculatedResult } from '../../types';

interface ResultsMiniCardProps {
  calculatedResult: CalculatedResult;
  buttonUrl?: string;
}

export const ResultsMiniCard: React.FC<ResultsMiniCardProps> = ({ calculatedResult, buttonUrl }) => {
  const level = calculatedResult.general_level.title;

  return (
    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Play className="w-4 h-4 text-blue-600" />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-700 mb-3">
            Veja a trilha <strong>GRATUITA</strong> em vídeo preparada para você
          </p>
          <Button 
            size="sm" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
            onClick={() => buttonUrl && window.open(buttonUrl, '_blank')}
            disabled={!buttonUrl}
          >
            Ver a trilha {level}
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};