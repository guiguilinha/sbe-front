import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { QuizData, UserAnswer } from '@/types';
import type { EmpresaVinculo } from '@/types/enriched-user.types';
import { calculateResults } from '@/services/results/resultsService';
import { useSimpleAuth } from '@/auth/SimpleAuthProvider';
import { diagnosticMapperService } from '@/services/diagnostic/diagnostic-mapper.service';
import { diagnosticPersistenceService } from '@/services/diagnostic/diagnostic-persistence.service';
import { CompanySelectionModal } from './CompanySelectionModal';
import QuizHeader from './QuizHeader';
import QuizProgressBar from './QuizProgressBar';
import QuizAnswers from './QuizAnswers';

interface QuizContainerProps {
  data: QuizData;
}

const QuizContainer: React.FC<QuizContainerProps> = ({ data }) => {
  const navigate = useNavigate();
  const { enrichedUserData } = useSimpleAuth();
  const { header, questions, answers } = data;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState<EmpresaVinculo | null>(null);
  const [showCompanyModal, setShowCompanyModal] = useState(false);

  // Auto-selecionar empresa se houver apenas uma ou se houver uma principal
  useEffect(() => {
    if (enrichedUserData?.empresas) {
      if (enrichedUserData.empresas.length === 1) {
        // Se tem apenas uma empresa, selecionar automaticamente
        setEmpresaSelecionada(enrichedUserData.empresas[0]);
      } else if (enrichedUserData.empresas.length > 1) {
        // Se tem múltiplas, tentar selecionar a principal
        const empresaPrincipal = enrichedUserData.empresas.find(e => e.isPrincipal);
        if (empresaPrincipal) {
          setEmpresaSelecionada(empresaPrincipal);
        }
        // Mostrar modal no início do quiz
        setShowCompanyModal(true);
      }
    }
  }, [enrichedUserData]);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswerId = userAnswers.find(
    (answer) => answer.question_id === currentQuestion?.id
  )?.answer_id;

  // Filtrar respostas que pertencem à pergunta atual
  const currentQuestionAnswers = answers.filter(
    (answer) => answer.question_id === currentQuestion?.id
  );

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answerId: number) => {
    // Encontrar a resposta selecionada para obter o score
    const selectedAnswer = answers.find(answer => answer.id === answerId);
    
    const newAnswer: UserAnswer = {
      question_id: currentQuestion.id,
      answer_id: answerId,
      score: selectedAnswer?.score || 0,
      category_id: currentQuestion.category_id,
    };

    setUserAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (ans) => ans.question_id === currentQuestion.id
      );

      if (existingAnswerIndex > -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = newAnswer;
        console.log('🔄 [QuizContainer] Resposta atualizada:', newAnswer);
        return updatedAnswers;
      }
      const newAnswers = [...prevAnswers, newAnswer];
      console.log('➕ [QuizContainer] Nova resposta adicionada:', newAnswer);
      console.log('📊 [QuizContainer] Total de respostas agora:', newAnswers.length);
      return newAnswers;
    });

    // Avançar automaticamente
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, 500);
    }
  };

  const handleSubmit = async () => {
    console.log('🔍 [QuizContainer] Validando submissão...');
    console.log('📊 [QuizContainer] Respostas:', userAnswers.length);
    console.log('📊 [QuizContainer] Perguntas:', questions.length);
    console.log('📊 [QuizContainer] Respostas detalhadas:', userAnswers);
    
    if (userAnswers.length < questions.length) {
      console.log('❌ [QuizContainer] Validação falhou - respostas insuficientes');
      alert('Por favor, responda todas as perguntas antes de enviar.');
      return;
    }

    // Verificar se tem empresa selecionada (se usuário tem empresas)
    if (enrichedUserData?.empresas && enrichedUserData.empresas.length > 0 && !empresaSelecionada) {
      alert('Por favor, selecione uma empresa antes de finalizar o diagnóstico.');
      setShowCompanyModal(true);
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Calcular resultados
      console.log('📊 Calculando resultados...');
      const result = await calculateResults(userAnswers);
      console.log('✅ Resultado calculado:', result);
      
      // 2. Preparar dados para salvamento posterior (na ResultsPage)
      console.log('📋 Preparando dados para salvamento posterior...');
      console.log('📋 Dados disponíveis:', {
        hasEnrichedUserData: !!enrichedUserData,
        hasEmpresaSelecionada: !!empresaSelecionada,
        hasCalculatedResult: !!result.calculatedResult,
        hasUserAnswers: userAnswers.length > 0,
        hasQuizData: !!data
      });
      
      // 3. Navegar para resultados com dados para salvamento posterior
      navigate('/results', { 
        state: { 
          userAnswers,
          calculatedResult: result,
          // Dados adicionais para salvamento posterior
          enrichedUserData,
          empresaSelecionada,
          quizData: data
        }
      });
      
    } catch (error) {
      console.error('❌ Erro ao processar diagnóstico:', error);
      alert('Erro ao processar suas respostas. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (!currentQuestion) {
    return <div className="text-center text-gray-600">Nenhuma pergunta encontrada.</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <QuizHeader 
        title={header.title}
        subtitle={header.description}
      />

      
      <div className="flex-grow flex flex-col items-center justify-center py-8 w-full max-w-4xl">
        <QuizProgressBar 
          current={currentQuestionIndex + 1}
          total={questions.length}
        />

        <div className="w-full max-w-4xl mt-6">
          <QuizAnswers
            question={currentQuestion}
            answers={currentQuestionAnswers}
            selectedAnswer={selectedAnswerId}
            onAnswerSelect={handleAnswerSelect}
          />
        </div>
      </div>

      <div className="flex justify-between mt-auto pt-4">
        <Button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 text-lg"
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-5 w-5" /> Anterior
        </Button>

        {/* Mostrar botão "Calcular meu resultado" apenas na última pergunta */}
        {isLastQuestion && selectedAnswerId && (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-3 text-lg bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? 'Processando...' : 'Calcular meu resultado'}
          </Button>
        )}
      </div>

      {/* Modal de Seleção de Empresa */}
      <CompanySelectionModal
        isOpen={showCompanyModal}
        companies={enrichedUserData?.empresas || []}
        onSelect={(company) => {
          setEmpresaSelecionada(company);
          setShowCompanyModal(false);
        }}
        onClose={() => setShowCompanyModal(false)}
      />
    </div>
  );
};

export default QuizContainer; 