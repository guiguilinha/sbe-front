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
import { CompanyCreationModal } from './CompanyCreationModal';
import QuizHeader from './QuizHeader';
import QuizProgressBar from './QuizProgressBar';
import QuizAnswers from './QuizAnswers';

interface QuizContainerProps {
  data: QuizData;
}

const QuizContainer: React.FC<QuizContainerProps> = ({ data }) => {
  const navigate = useNavigate();
  const { enrichedUserData, authenticated, refreshEnrichedUserData } = useSimpleAuth();
  const { header, questions, answers } = data;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState<EmpresaVinculo | null>(null);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showCompanyCreationModal, setShowCompanyCreationModal] = useState(false);
  const [quizBlocked, setQuizBlocked] = useState(false);
  const [isCreatingCompany, setIsCreatingCompany] = useState(false);

  // Verificar empresas antes de iniciar o quiz
  useEffect(() => {
    // Não verificar se está criando empresa (evita loop)
    if (isCreatingCompany) {
      console.log('⏳ [QuizContainer] Criando empresa, aguardando...');
      return;
    }

    // Se já tem empresa selecionada, não verificar novamente
    if (empresaSelecionada) {
      console.log('✅ [QuizContainer] Empresa já selecionada, não verificar novamente');
      setQuizBlocked(false);
      return;
    }

    console.log('🔍 [QuizContainer] Verificando empresas antes de iniciar quiz...');
    console.log('🔍 [QuizContainer] Dados do usuário:', JSON.stringify({
      hasEnrichedUserData: !!enrichedUserData,
      hasEmpresaData: enrichedUserData?.metadata?.hasEmpresaData || false,
      empresasCount: enrichedUserData?.empresas?.length || 0,
      empresas: enrichedUserData?.empresas?.map((e: any) => ({
        id: e.id,
        cnpj: e.cnpj,
        nome: e.nome,
        isPrincipal: e.isPrincipal
      })) || []
    }, null, 2));
    
    // Verificar se tem dados de empresa (hasEmpresaData do metadata)
    if (!enrichedUserData?.metadata?.hasEmpresaData) {
      // Não há empresas - mostrar modal de criação
      setQuizBlocked(true);
      setShowCompanyCreationModal(true);
      console.warn('⚠️ [QuizContainer] hasEmpresaData: false - modal de criação será exibido');
      return;
    }
    
    if (enrichedUserData?.empresas) {
      const empresas = enrichedUserData.empresas;
      
      if (empresas.length === 0) {
        // Não há empresas mesmo com hasEmpresaData: true - mostrar modal de criação
        setQuizBlocked(true);
        setShowCompanyCreationModal(true);
        console.warn('⚠️ [QuizContainer] Nenhuma empresa encontrada - modal de criação será exibido');
      } else if (empresas.length === 1) {
        // Se tem apenas uma empresa, selecionar automaticamente
        setEmpresaSelecionada(empresas[0]);
        setQuizBlocked(false);
        console.log('✅ [QuizContainer] Empresa única selecionada automaticamente:', JSON.stringify({
          cnpj: empresas[0].cnpj,
          nome: empresas[0].nome
        }, null, 2));
      } else if (empresas.length > 1) {
        // Se tem múltiplas empresas, verificar se já tem uma selecionada
        const empresaPrincipal = empresas.find(e => e.isPrincipal);
        
        console.log('🔍 [QuizContainer] Múltiplas empresas encontradas:', JSON.stringify({
          total: empresas.length,
          temPrincipal: !!empresaPrincipal,
          empresaPrincipal: empresaPrincipal ? {
            cnpj: empresaPrincipal.cnpj,
            nome: empresaPrincipal.nome
          } : null,
          empresaSelecionada: empresaSelecionada ? {
            cnpj: empresaSelecionada.cnpj,
            nome: empresaSelecionada.nome
          } : null
        }, null, 2));
        
        if (empresaPrincipal && !empresaSelecionada) {
          // Selecionar principal automaticamente mas ainda mostrar modal para confirmação
          setEmpresaSelecionada(empresaPrincipal);
          setShowCompanyModal(true);
          setQuizBlocked(true); // Bloquear até confirmar seleção
          console.log('⚠️ [QuizContainer] Múltiplas empresas encontradas - modal de seleção será exibido');
        } else if (!empresaSelecionada) {
          // Não tem principal e não tem selecionada - mostrar modal obrigatório
          setShowCompanyModal(true);
          setQuizBlocked(true);
          console.log('⚠️ [QuizContainer] Múltiplas empresas encontradas - seleção obrigatória');
        } else {
          // Já tem empresa selecionada
          setQuizBlocked(false);
          console.log('✅ [QuizContainer] Empresa já selecionada, quiz desbloqueado');
        }
      }
    } else {
      // Não há dados de empresas - bloquear quiz
      setQuizBlocked(true);
      console.warn('⚠️ [QuizContainer] Dados de empresas não disponíveis - quiz bloqueado');
    }
  }, [enrichedUserData, empresaSelecionada, isCreatingCompany]);

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
    // Bloquear se empresa não foi selecionada
    if (quizBlocked || !empresaSelecionada) {
      console.warn('⚠️ [QuizContainer] Quiz bloqueado - selecione uma empresa primeiro');
      setShowCompanyModal(true);
      return;
    }

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
    <div className="flex flex-col flex-1 min-h-0">
      <QuizHeader 
        title={header.title}
        subtitle={header.description}
      />

      
      <div className="flex-grow flex flex-col items-center justify-center py-8 w-full max-w-4xl overflow-y-auto">
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
          setQuizBlocked(false); // Desbloquear quiz após seleção
          console.log('✅ [QuizContainer] Empresa selecionada:', company.cnpj);
        }}
        onClose={() => {
          // Se quiz está bloqueado, não permitir fechar sem selecionar
          if (quizBlocked && !empresaSelecionada) {
            console.warn('⚠️ [QuizContainer] Seleção de empresa é obrigatória');
            return;
          }
          setShowCompanyModal(false);
        }}
      />

      {/* Modal de Criação de Empresa */}
      <CompanyCreationModal
        isOpen={showCompanyCreationModal}
        onCompanyCreated={async (company) => {
          setIsCreatingCompany(true);
          setEmpresaSelecionada(company);
          setShowCompanyCreationModal(false);
          setQuizBlocked(false);
          console.log('✅ [QuizContainer] Empresa criada e selecionada:', company.cnpj);
          
          // Recarregar dados do usuário para atualizar enrichedUserData
          try {
            await refreshEnrichedUserData();
            console.log('✅ [QuizContainer] Dados do usuário recarregados após criar empresa');
          } catch (error) {
            console.error('❌ [QuizContainer] Erro ao recarregar dados do usuário:', error);
            // Mesmo com erro, continuamos com a empresa criada
          } finally {
            setIsCreatingCompany(false);
          }
        }}
        onClose={() => {
          // Não permitir fechar sem criar empresa
          if (quizBlocked && !empresaSelecionada) {
            console.warn('⚠️ [QuizContainer] Criação de empresa é obrigatória');
            return;
          }
          setShowCompanyCreationModal(false);
        }}
      />
      
      {/* Bloqueio visual do quiz se empresa não selecionada */}
      {quizBlocked && !empresaSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-2">Seleção de Empresa Necessária</h3>
            <p className="text-gray-600 mb-4">
              Por favor, selecione uma empresa antes de iniciar o diagnóstico.
            </p>
            <Button
              onClick={() => setShowCompanyModal(true)}
              className="w-full"
            >
              Selecionar Empresa
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizContainer; 