import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import type { UserResultsData, CalculatedResult } from '../types';
import type { UserAnswer } from '../types/quiz-result';
import type { QuizData } from '../types/quiz';
import type { EmpresaVinculo } from '../types/enriched-user.types';
import { useDiagnosticSave } from '../hooks/useDiagnosticSave';
import { Play } from 'lucide-react';

import ResultsHero from '../components/results/ResultsHero';
import ResultsAdvice from '../components/results/ResultsAdvice';
import ResultsCategories from '../components/results/ResultsCategories';
import ResultsConclusion from '../components/results/ResultsConclusion';
import ResultsCourses from '../components/results/ResultsCourses';
import CTACard from '../components/layout/CTACard';
import MGMap from '../components/layout/map/MGMap';
import ResultsSidebar from '../components/results/ResultsSidebar';
import { ResultsBottomSheet } from '../components/results/ResultsBottomSheet';
import { useResultsPage } from '../hooks/useResultsPage';
import { DashboardHeader } from '../components/layout/DashboardHeader';
import Footer from '../components/layout/Footer';

interface ResultsPageProps {
  previewToken?: string;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ previewToken }) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const location = useLocation();
  const { 
    calculatedResult,
    userAnswers,
    empresaSelecionada,
    quizData
  } = (location.state || {}) as { 
    calculatedResult?: {
      success: boolean;
      data: UserResultsData;
      calculatedResult: CalculatedResult;
    };
    userAnswers?: UserAnswer[];
    empresaSelecionada?: EmpresaVinculo;
    quizData?: QuizData;
  };

  // Se temos previewToken, usar o hook para buscar dados
  const { data: previewData, loading: previewLoading, error: previewError } = useResultsPage(previewToken);
  
  // Abrir Bottom Sheet automaticamente após 2 segundos
  useEffect(() => {
    if (calculatedResult?.calculatedResult) {
      const timer = setTimeout(() => {
        setIsBottomSheetOpen(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [calculatedResult]);
  
  const [resultsData, setResultsData] = useState<UserResultsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Hook para salvar diagnóstico após carregar dados completos
  const { isSaving, saveError, isSaved } = useDiagnosticSave({
    resultsData,
    calculatedResult: calculatedResult?.calculatedResult || null,
    userAnswers: userAnswers || [],
    quizData: quizData || {} as QuizData,
    empresaSelecionada: empresaSelecionada || null
  });

  useEffect(() => {
    // Se temos previewToken, usar dados do preview
    if (previewToken && previewData) {
      setResultsData(previewData);
    } else if (calculatedResult?.success && calculatedResult?.data) {
      setResultsData(calculatedResult.data);
      
      // 🔍 Debug: Verificar trail-link
      const trailLink = calculatedResult.data["cta-section"]["trail-link"];
      console.log('🔗 Trail-link recebido:', trailLink);
      console.log('🔗 CTA Section completa:', calculatedResult.data["cta-section"]);
    } else {
      setError('Dados de resultados não encontrados');
    }
  }, [calculatedResult, previewToken, previewData]);

  // Logs do salvamento
  useEffect(() => {
    if (isSaving) {
      console.log('💾 [ResultsPage] Salvando diagnóstico...');
    }
    if (isSaved) {
      console.log('✅ [ResultsPage] Diagnóstico salvo com sucesso!');
    }
    if (saveError) {
      console.error('❌ [ResultsPage] Erro ao salvar diagnóstico:', saveError);
    }
  }, [isSaving, isSaved, saveError]);

  // Se estamos carregando dados de preview
  if (previewToken && previewLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <DashboardHeader />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-600">Carregando dados de preview...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Se há erro no preview
  if (previewToken && previewError) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <DashboardHeader />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-red-600">Erro ao carregar preview: {previewError}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <DashboardHeader />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-red-600">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!resultsData) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <DashboardHeader />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-600">Não foi possível carregar seus resultados.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader />
      {calculatedResult?.calculatedResult && (
        <ResultsBottomSheet 
          calculatedResult={calculatedResult.calculatedResult}
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
        />
      )}

      {/* Botão flutuante para mobile */}
      {calculatedResult?.calculatedResult && (
        <button
          onClick={() => setIsBottomSheetOpen(true)}
          className="fixed bottom-4 right-4 md:hidden bg-blue-600 text-white p-4 rounded-full shadow-lg z-30 hover:bg-blue-700 transition-colors"
        >
          <Play className="w-6 h-6" />
        </button>
      )}
      
      <div id="hero-section">
        <ResultsHero
          heroSection={resultsData["hero-section"]}
        />
      </div>
      <div className="container mx-auto px-4 max-w-7xl py-8 z-10 -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div id="advice-section">
              <ResultsAdvice 
                adviceSection={resultsData["advice-section"]}
              />
            </div>
            <div id="category-section">
              <ResultsCategories 
                categorySection={resultsData["category-section"]}
              />
            </div>
             <div id="cta-section">
               <CTACard 
                title={resultsData["cta-section"]["cta-title"]}
                description={resultsData["cta-section"]["cta-content"]}
                buttonText={`${resultsData["cta-section"]["cta-button-text"]} ${resultsData["cta-section"]["cta-general-level"]}`}
                buttonUrl={resultsData["cta-section"]["trail-link"] || undefined}
                className="mt-8"
              />
             </div>
            <div id="conclusion-section">
              <ResultsConclusion 
                conclusionSection={resultsData["conclusion-section"]}
                categorySection={resultsData["category-section"]}
              />
            </div>
            <div id="content-section">
              <ResultsCourses 
                contentSection={resultsData["content-section"]}
              />
            </div>
            <MGMap 
              map-title={resultsData["map-section"]["map-title"]}
              map-content={resultsData["map-section"]["map-content"]}
              regions={resultsData["map-section"]["map-region"]}
            />
           
          </div>
          <div className="lg:col-span-1 hidden lg:block">
            {calculatedResult?.calculatedResult && (
              <ResultsSidebar
                calculatedResult={calculatedResult.calculatedResult}
                resultsData={resultsData}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResultsPage; 