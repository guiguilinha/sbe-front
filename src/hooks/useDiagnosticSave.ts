import { useEffect, useState } from 'react';
import { useSimpleAuth } from '@/auth/SimpleAuthProvider';
import { diagnosticMapperService } from '@/services/diagnostic/diagnostic-mapper.service';
import { diagnosticPersistenceService } from '@/services/diagnostic/diagnostic-persistence.service';
import type { UserResultsData, CalculatedResult } from '@/types';
import type { UserAnswer } from '@/types/quiz';
import type { QuizData } from '@/types/quiz';
import type { EmpresaVinculo } from '@/types/enriched-user.types';

interface UseDiagnosticSaveProps {
  resultsData: UserResultsData | null;
  calculatedResult: CalculatedResult | null;
  userAnswers: UserAnswer[];
  quizData: QuizData;
  empresaSelecionada: EmpresaVinculo | null;
}

/**
 * Hook para salvar diagnóstico após carregar dados completos da página de resultados
 */
export function useDiagnosticSave({
  resultsData,
  calculatedResult,
  userAnswers,
  quizData,
  empresaSelecionada
}: UseDiagnosticSaveProps) {
  const { enrichedUserData } = useSimpleAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Só tentar salvar se temos todos os dados necessários
    if (
      !resultsData || 
      !calculatedResult || 
      !enrichedUserData || 
      !empresaSelecionada ||
      isSaved
    ) {
      return;
    }

    const saveDiagnostic = async () => {
      try {
        setIsSaving(true);
        setSaveError(null);
        
        console.log('💾 [useDiagnosticSave] Iniciando salvamento com dados completos...');
        
        // Construir dados completos com insights e dicas
        const diagnosticData = diagnosticMapperService.buildCompleteDiagnosticRequestWithInsights(
          enrichedUserData,
          calculatedResult,
          userAnswers,
          quizData,
          empresaSelecionada,
          resultsData
        );
        
        await diagnosticPersistenceService.saveDiagnostic(diagnosticData);
        
        console.log('✅ [useDiagnosticSave] Diagnóstico salvo com sucesso!');
        setIsSaved(true);
        
      } catch (error) {
        console.error('❌ [useDiagnosticSave] Erro ao salvar diagnóstico:', error);
        setSaveError(error instanceof Error ? error.message : 'Erro desconhecido');
      } finally {
        setIsSaving(false);
      }
    };

    // Aguardar um pouco para garantir que a página carregou completamente
    const timer = setTimeout(saveDiagnostic, 1000);
    
    return () => clearTimeout(timer);
  }, [resultsData, calculatedResult, enrichedUserData, empresaSelecionada, isSaved]);

  return {
    isSaving,
    saveError,
    isSaved
  };
}
