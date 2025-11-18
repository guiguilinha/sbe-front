import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, X } from 'lucide-react';
import type { CalculatedResult } from '../../types';

interface ResultsBottomSheetProps {
  calculatedResult: CalculatedResult;
  isOpen: boolean;
  onClose: () => void;
}

export const ResultsBottomSheet: React.FC<ResultsBottomSheetProps> = ({ 
  calculatedResult, 
  isOpen, 
  onClose 
}) => {
  const level = calculatedResult.general_level.title;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-2xl z-50 md:hidden transform transition-transform duration-300">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Trilha Personalizada
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Ver a trilha {level}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};