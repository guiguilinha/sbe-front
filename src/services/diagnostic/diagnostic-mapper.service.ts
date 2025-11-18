import type { CompleteDiagnosticRequest } from '@contracts';
import type { EnrichedUserData, EmpresaVinculo } from '@/types/enriched-user.types';
import type { CalculatedResult, UserAnswer, CategoryMaturityLevel } from '@/types/quiz-result';
import type { QuizData } from '@/types/quiz';
import type { UserResultsData } from '@/types';

/**
 * Serviço responsável por mapear dados do frontend para o formato de persistência do backend
 */
export class DiagnosticMapperService {
  /**
   * Mapeia dados do usuário enriquecido para estrutura de persistência
   */
  private mapUserData(
    enrichedUserData: EnrichedUserData,
    empresaSelecionada: EmpresaVinculo
  ) {
    console.log('[DiagnosticMapper] Mapeando dados do usuário');
    
    return {
      given_name: enrichedUserData.user.given_name || '',
      lastName: enrichedUserData.user.lastName || '',
      cpf: enrichedUserData.user.cpf || '',
      dataNascimento: enrichedUserData.user.dataNascimento || '',
      genero: enrichedUserData.user.genero || '',
      uf: enrichedUserData.user.uf || '',
      cidade: enrichedUserData.user.cidade || '',
      email: enrichedUserData.user.email || '',
      empresa: enrichedUserData.empresas.map(emp => ({
        cnpj: emp.cnpj,
        nome: emp.nome,
        isPrincipal: emp.isPrincipal,
        codStatusEmpresa: emp.codStatusEmpresa,
        desTipoVinculo: emp.desTipoVinculo
      }))
    };
  }

  /**
   * Mapeia resultados calculados para estrutura de diagnóstico
   */
  private mapDiagnosticData(
    calculatedResult: CalculatedResult,
    userAnswers: UserAnswer[],
    quizData: QuizData,
    empresaSelecionada: EmpresaVinculo
  ) {
    console.log('[DiagnosticMapper] Mapeando dados do diagnóstico');
    
    return {
      empresaSelecionada: empresaSelecionada.cnpj,
      dataRealizacao: new Date().toISOString(),
      nivelGeral: calculatedResult.general_level.title,
      pontuacaoGeral: calculatedResult.total_score,
      insightGeral: '', // Não disponível na estrutura atual
      status: 'Concluído',
      categorias: this.mapCategories(calculatedResult, userAnswers, quizData)
    };
  }

  /**
   * Mapeia categorias com respostas
   */
  private mapCategories(
    calculatedResult: CalculatedResult,
    userAnswers: UserAnswer[],
    quizData: QuizData
  ) {
    console.log('[DiagnosticMapper] Mapeando categorias:', calculatedResult.categories?.length || 0);
    
    return calculatedResult.categories.map((cat) => ({
      idCategoria: cat.category_id,
      nomeCategoria: `Categoria ${cat.category_id}`, // Nome não disponível na estrutura atual
      idNivelCategoria: cat.level.id,
      nivelCategoria: cat.level.title,
      pontuacaoCategoria: cat.score,
      insightCategoria: '', // Não disponível na estrutura atual
      dicaCategoria: '', // Não disponível na estrutura atual
      respostasCategoria: this.mapAnswers(cat.category_id, userAnswers, quizData)
    }));
  }

  /**
   * Mapeia categorias com insights e dicas da página de resultados
   */
  private mapCategoriesWithInsights(
    calculatedResult: CalculatedResult,
    userAnswers: UserAnswer[],
    quizData: QuizData,
    resultsData: UserResultsData
  ) {
    console.log('[DiagnosticMapper] Mapeando categorias com insights:', calculatedResult.categories?.length || 0);
    
    return calculatedResult.categories.map((cat, index) => {
      // Buscar insights e dicas da página de resultados
      const categoryItem = resultsData['category-section']?.['category-itens']?.[index];
      const insight = categoryItem?.['category-item-insight'] || '';
      const advice = categoryItem?.['category-item-advice'] || '';
      
      console.log(`[DiagnosticMapper] Categoria ${cat.category_id}:`, {
        idCategoria: cat.category_id,
        nomeCategoria: categoryItem?.['category-item-title'] || `Categoria ${cat.category_id}`,
        idNivelCategoria: cat.level.id,
        nivelCategoria: cat.level.title,
        pontuacaoCategoria: cat.score,
        insight: insight.substring(0, 50) + '...',
        advice: advice.substring(0, 50) + '...'
      });
      
      return {
        idCategoria: cat.category_id,
        nomeCategoria: categoryItem?.['category-item-title'] || `Categoria ${cat.category_id}`,
        idNivelCategoria: cat.level.id,
        nivelCategoria: cat.level.title,
        pontuacaoCategoria: cat.score,
        insightCategoria: insight,
        dicaCategoria: advice,
        respostasCategoria: this.mapAnswers(cat.category_id, userAnswers, quizData)
      };
    });
  }

  /**
   * Mapeia respostas de uma categoria
   */
  private mapAnswers(
    categoryId: number,
    userAnswers: UserAnswer[],
    quizData: QuizData
  ) {
    const categoryAnswers = userAnswers.filter(ans => ans.category_id === categoryId);
    
    console.log(`[DiagnosticMapper] Mapeando respostas da categoria ${categoryId}:`, categoryAnswers.length);
    
    return categoryAnswers.map(ans => {
      const question = quizData.questions.find(q => q.id === ans.question_id);
      const answer = quizData.answers.find(a => a.id === ans.answer_id);
      
      return {
        idPergunta: ans.question_id,
        pergunta: question?.title || '',
        idResposta: ans.answer_id,
        resposta: answer?.title || '',
        pontuacao: ans.score
      };
    });
  }

  /**
   * Método principal: constrói requisição completa para persistência
   * 
   * @param enrichedUserData - Dados do usuário enriquecido (Keycloak + CPE)
   * @param calculatedResult - Resultado calculado do quiz
   * @param userAnswers - Respostas do usuário
   * @param quizData - Dados do quiz (perguntas e respostas)
   * @param empresaSelecionada - Empresa selecionada para este diagnóstico
   * @returns CompleteDiagnosticRequest pronto para enviar ao backend
   */
  buildCompleteDiagnosticRequest(
    enrichedUserData: EnrichedUserData,
    calculatedResult: CalculatedResult,
    userAnswers: UserAnswer[],
    quizData: QuizData,
    empresaSelecionada: EmpresaVinculo
  ): CompleteDiagnosticRequest {
    console.log('[DiagnosticMapper] Construindo requisição completa de diagnóstico');
    console.log('[DiagnosticMapper] Usuário:', enrichedUserData.user.name);
    console.log('[DiagnosticMapper] Empresa:', empresaSelecionada.nome);
    console.log('[DiagnosticMapper] Pontuação geral:', calculatedResult.total_score);
    console.log('[DiagnosticMapper] Categorias:', calculatedResult.categories?.length || 0);
    console.log('[DiagnosticMapper] Respostas:', userAnswers.length);
    
    const request: CompleteDiagnosticRequest = {
      usuario: this.mapUserData(enrichedUserData, empresaSelecionada),
      diagnostico: this.mapDiagnosticData(
        calculatedResult,
        userAnswers,
        quizData,
        empresaSelecionada
      )
    };
    
    console.log('[DiagnosticMapper] ✅ Requisição construída com sucesso');
    
    return request;
  }

  /**
   * Método principal com insights: constrói requisição completa para persistência
   * Usa dados da página de resultados para capturar insights e dicas
   * 
   * @param enrichedUserData - Dados do usuário enriquecido (Keycloak + CPE)
   * @param calculatedResult - Resultado calculado do quiz
   * @param userAnswers - Respostas do usuário
   * @param quizData - Dados do quiz (perguntas e respostas)
   * @param empresaSelecionada - Empresa selecionada para este diagnóstico
   * @param resultsData - Dados completos da página de resultados (com insights)
   * @returns CompleteDiagnosticRequest pronto para enviar ao backend
   */
  buildCompleteDiagnosticRequestWithInsights(
    enrichedUserData: EnrichedUserData,
    calculatedResult: CalculatedResult,
    userAnswers: UserAnswer[],
    quizData: QuizData,
    empresaSelecionada: EmpresaVinculo,
    resultsData: UserResultsData
  ): CompleteDiagnosticRequest {
    console.log('[DiagnosticMapper] Construindo requisição completa com insights');
    console.log('[DiagnosticMapper] Usuário:', enrichedUserData.user.name);
    console.log('[DiagnosticMapper] Empresa:', empresaSelecionada.nome);
    console.log('[DiagnosticMapper] Pontuação geral:', calculatedResult.total_score);
    console.log('[DiagnosticMapper] Categorias:', calculatedResult.categories?.length || 0);
    console.log('[DiagnosticMapper] Respostas:', userAnswers.length);
    console.log('[DiagnosticMapper] Dados de resultados disponíveis:', !!resultsData);
    
    const request: CompleteDiagnosticRequest = {
      usuario: this.mapUserData(enrichedUserData, empresaSelecionada),
      diagnostico: {
        empresaSelecionada: empresaSelecionada.cnpj,
        dataRealizacao: new Date().toISOString(),
        nivelGeral: calculatedResult.general_level.title,
        pontuacaoGeral: calculatedResult.total_score,
        insightGeral: resultsData['advice-section']?.['advice-content'] || '',
        status: 'Concluído',
        categorias: this.mapCategoriesWithInsights(calculatedResult, userAnswers, quizData, resultsData)
      }
    };
    
    console.log('[DiagnosticMapper] ✅ Requisição com insights construída com sucesso');
    
    return request;
  }
}

// Exportar instância singleton
export const diagnosticMapperService = new DiagnosticMapperService();
