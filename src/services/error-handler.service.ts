/**
 * Tipos de erro da aplicação
 */
export enum ErrorType {
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  VALIDATION = 'VALIDATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN'
}

/**
 * Interface para erros estruturados
 */
export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: unknown;
  statusCode?: number;
  details?: Record<string, unknown>;
}

/**
 * Serviço para tratamento centralizado de erros
 */
export class ErrorHandlerService {
  /**
   * Classifica e estrutura um erro
   */
  static handleError(error: unknown): AppError {
    console.error('🔴 [ErrorHandler] Processando erro:', error);

    // Erro de rede (fetch/axios)
    if (this.isNetworkError(error)) {
      return {
        type: ErrorType.NETWORK,
        message: 'Erro de conexão. Verifique sua internet e tente novamente.',
        originalError: error
      };
    }

    // Erro de autenticação (401)
    if (this.isAuthenticationError(error)) {
      return {
        type: ErrorType.AUTHENTICATION,
        message: 'Sessão expirada. Por favor, faça login novamente.',
        originalError: error,
        statusCode: 401
      };
    }

    // Erro de autorização (403)
    if (this.isAuthorizationError(error)) {
      return {
        type: ErrorType.AUTHORIZATION,
        message: 'Você não tem permissão para acessar este recurso.',
        originalError: error,
        statusCode: 403
      };
    }

    // Erro de validação (400)
    if (this.isValidationError(error)) {
      return {
        type: ErrorType.VALIDATION,
        message: 'Dados inválidos. Verifique as informações e tente novamente.',
        originalError: error,
        statusCode: 400
      };
    }

    // Erro de recurso não encontrado (404)
    if (this.isNotFoundError(error)) {
      return {
        type: ErrorType.NOT_FOUND,
        message: 'Recurso não encontrado.',
        originalError: error,
        statusCode: 404
      };
    }

    // Erro do servidor (500+)
    if (this.isServerError(error)) {
      return {
        type: ErrorType.SERVER,
        message: 'Erro no servidor. Tente novamente mais tarde.',
        originalError: error,
        statusCode: this.getStatusCode(error)
      };
    }

    // Erro desconhecido
    return {
      type: ErrorType.UNKNOWN,
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      originalError: error
    };
  }

  /**
   * Verifica se é erro de rede
   */
  private static isNetworkError(error: unknown): boolean {
    if (error instanceof Error) {
      return (
        error.message.includes('Network') ||
        error.message.includes('Failed to fetch') ||
        error.message.includes('ERR_NETWORK')
      );
    }
    return false;
  }

  /**
   * Verifica se é erro de autenticação (401)
   */
  private static isAuthenticationError(error: unknown): boolean {
    return this.getStatusCode(error) === 401;
  }

  /**
   * Verifica se é erro de autorização (403)
   */
  private static isAuthorizationError(error: unknown): boolean {
    return this.getStatusCode(error) === 403;
  }

  /**
   * Verifica se é erro de validação (400)
   */
  private static isValidationError(error: unknown): boolean {
    return this.getStatusCode(error) === 400;
  }

  /**
   * Verifica se é erro de não encontrado (404)
   */
  private static isNotFoundError(error: unknown): boolean {
    return this.getStatusCode(error) === 404;
  }

  /**
   * Verifica se é erro do servidor (500+)
   */
  private static isServerError(error: unknown): boolean {
    const statusCode = this.getStatusCode(error);
    return statusCode !== null && statusCode >= 500;
  }

  /**
   * Extrai status code do erro (se disponível)
   */
  private static getStatusCode(error: unknown): number | null {
    if (typeof error === 'object' && error !== null) {
      // Axios error
      if ('response' in error && typeof error.response === 'object' && error.response !== null) {
        if ('status' in error.response && typeof error.response.status === 'number') {
          return error.response.status;
        }
      }
      // Fetch error
      if ('status' in error && typeof error.status === 'number') {
        return error.status;
      }
    }
    return null;
  }

  /**
   * Formata mensagem de erro para exibição ao usuário
   */
  static getUserMessage(error: unknown): string {
    const appError = this.handleError(error);
    return appError.message;
  }

  /**
   * Loga erro no console (desenvolvimento) ou serviço de monitoramento (produção)
   */
  static logError(error: unknown, context?: string): void {
    const appError = this.handleError(error);
    
    console.group(`🔴 [ErrorHandler] ${context || 'Erro capturado'}`);
    console.error('Tipo:', appError.type);
    console.error('Mensagem:', appError.message);
    if (appError.statusCode) {
      console.error('Status Code:', appError.statusCode);
    }
    if (appError.details) {
      console.error('Detalhes:', appError.details);
    }
    console.error('Erro original:', appError.originalError);
    console.groupEnd();

    // Em produção, enviar para serviço de monitoramento
    // Nota: A integração com serviços de monitoramento (Sentry, LogRocket, etc.)
    // será implementada quando necessário para produção.
    if (process.env.NODE_ENV === 'production') {
      // Sentry.captureException(appError.originalError);
    }
  }

  /**
   * Verifica se erro deve ser retentado automaticamente
   */
  static shouldRetry(error: unknown): boolean {
    const appError = this.handleError(error);
    
    // Retentar apenas erros de rede e alguns erros de servidor
    return (
      appError.type === ErrorType.NETWORK ||
      (appError.statusCode !== undefined && appError.statusCode >= 500)
    );
  }
}

/**
 * Hook helper para usar no React
 */
export const useErrorHandler = () => {
  const handleError = (error: unknown, context?: string) => {
    ErrorHandlerService.logError(error, context);
    return ErrorHandlerService.getUserMessage(error);
  };

  return { handleError };
};

