import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimpleAuth } from '@/auth/SimpleAuthProvider';

interface QuizAccessResult {
  canAccess: boolean;
  handleQuizAccess: () => void;
  showAuthModal: boolean;
  closeAuthModal: () => void;
}

export function useQuizAccess(redirectTo: string = '/quiz'): QuizAccessResult {
  const { authenticated, loading } = useSimpleAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Auto-navegação quando o usuário se autentica
  useEffect(() => {
    if (authenticated && showAuthModal) {
      setShowAuthModal(false);
      navigate(redirectTo);
    }
  }, [authenticated, showAuthModal, navigate, redirectTo]);

  const handleQuizAccess = useCallback(() => {
    if (loading) {
      return; // Aguarda o carregamento
    }
    
    if (authenticated) {
      navigate(redirectTo);
    } else {
      setShowAuthModal(true);
    }
  }, [authenticated, loading, navigate, redirectTo]);

  const closeAuthModal = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  return {
    canAccess: authenticated,
    handleQuizAccess,
    showAuthModal,
    closeAuthModal,
  };
}