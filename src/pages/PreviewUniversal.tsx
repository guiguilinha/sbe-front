import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import HomePage from './HomePage';
import QuizPage from './QuizPage';
import ResultsPage from './ResultsPage';
import { useWebSocketMulti } from '../hooks/useWebSocket';

interface PreviewUniversalProps {}

const PreviewUniversal: React.FC<PreviewUniversalProps> = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [finalToken, setFinalToken] = useState<string | undefined>(undefined);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  
  const token = searchParams.get('token');
  const page = searchParams.get('page');

  // Mapeamento de páginas para collections
  const pageToCollections: Record<string, string[]> = {
    home: ['home_hero', 'home_benefits', 'home_faq', 'home_footer', 'home_how_it_works', 'home_maturity_explanation'],
    quiz: ['quiz_questions', 'quiz_answers', 'quiz_header'],
    results: ['results_hero', 'results_categories', 'results_text', 'results_level_insights', 'results_courses']
  };

  // Collections para a página atual
  const currentCollections = pageToCollections[currentPage] || pageToCollections.home;

  // WebSocket hook para as collections da página atual
  const { isConnected } = useWebSocketMulti(currentCollections, (collection: string, data: any) => {
    console.log(`🔄 Atualização recebida via WebSocket para ${collection}:`, data);
    setLastUpdate(new Date());
    
    // Aqui você pode adicionar lógica específica para cada collection
    // Por exemplo, recarregar dados específicos ou mostrar notificação
  });

  // Função para buscar token dinamicamente
  const fetchPreviewToken = async (): Promise<string | null> => {
    try {
      console.log('[PreviewUniversal] Buscando token de preview...');
      const response = await fetch('/api/homepage/preview-token');
      if (response.ok) {
        const data = await response.json();
        console.log('[PreviewUniversal] Token obtido:', data.token ? 'Sim' : 'Não');
        return data.token;
      }
    } catch (error) {
      console.error('[PreviewUniversal] Erro ao buscar token:', error);
    }
    return null;
  };

  useEffect(() => {
    const processParameters = async () => {
      console.log('[PreviewUniversal] Parâmetros recebidos:', {
        token,
        page,
        hasToken: !!token,
        tokenLength: token?.length || 0
      });

      // Se não tem token na URL, buscar automaticamente
      if (!token) {
        setIsLoading(true);
        const dynamicToken = await fetchPreviewToken();
        setFinalToken(dynamicToken || undefined);
        setIsLoading(false);
      } else {
        setFinalToken(token);
      }

      // Determinar a página baseado nos parâmetros
      if (page) {
        setCurrentPage(page);
      } else {
        // Default para home
        setCurrentPage('home');
      }
    };

    processParameters();
  }, [page, token]);

  if (isLoading) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando preview...</p>
        </div>
      </div>
    );
  }

  // Indicador de status do WebSocket
  const WebSocketStatus = () => (
    <div className="fixed top-4 right-4 z-50">
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
        isConnected 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {isConnected ? '🔌 WebSocket Conectado' : '🔌 WebSocket Desconectado'}
      </div>
      {lastUpdate && (
        <div className="mt-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Última atualização: {lastUpdate.toLocaleTimeString()}
        </div>
      )}
    </div>
  );

  // Renderizar a página apropriada
  switch (currentPage) {
    case 'quiz':
      return (
        <>
          <WebSocketStatus />
          <QuizPage previewToken={finalToken} />
        </>
      );
    case 'results':
      return (
        <>
          <WebSocketStatus />
          <ResultsPage previewToken={finalToken} />
        </>
      );
    case 'home':
    default:
      return (
        <>
          <WebSocketStatus />
          <HomePage previewToken={finalToken} />
        </>
      );
  }
};

export default PreviewUniversal;
