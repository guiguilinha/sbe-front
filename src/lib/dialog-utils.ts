import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

/**
 * Hook para confirmação de saída do quiz
 * Protege o usuário de sair acidentalmente durante o quiz
 */
export function useQuizExitConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const isQuiz = location.pathname.startsWith("/quiz");

  // Handler para links do menu quando estiver no quiz
  function handleMenuClick(e: React.MouseEvent, url: string) {
    if (isQuiz) {
      e.preventDefault();
      setPendingUrl(url);
      setModalOpen(true);
    }
    // Fora do quiz, navegação normal
  }

  function handleConfirm() {
    if (pendingUrl) {
      setModalOpen(false);
      navigate(pendingUrl);
      setPendingUrl(null);
    }
  }

  function handleCancel() {
    setModalOpen(false);
    setPendingUrl(null);
  }

  return {
    isQuiz,
    modalOpen,
    setModalOpen,
    handleMenuClick,
    handleConfirm,
    handleCancel,
    pendingUrl,
  };
}

/**
 * Hook genérico para confirmação de ações
 * Pode ser usado para qualquer tipo de confirmação
 */
export function useConfirmationDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function showConfirmation(
    action: () => void,
    dialogTitle: string,
    dialogDescription: string
  ) {
    setPendingAction(() => action);
    setTitle(dialogTitle);
    setDescription(dialogDescription);
    setIsOpen(true);
  }

  function handleConfirm() {
    if (pendingAction) {
      pendingAction();
      setIsOpen(false);
      setPendingAction(null);
    }
  }

  function handleCancel() {
    setIsOpen(false);
    setPendingAction(null);
  }

  return {
    isOpen,
    title,
    description,
    showConfirmation,
    handleConfirm,
    handleCancel,
  };
}

/**
 * Hook para confirmação de navegação
 * Útil para confirmar saída de páginas com dados não salvos
 */
export function useNavigationConfirmation() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function confirmNavigation(
    url: string,
    dialogTitle = "Confirmar navegação",
    dialogDescription = "Você tem certeza que deseja sair? As alterações não salvas serão perdidas."
  ) {
    setPendingUrl(url);
    setTitle(dialogTitle);
    setDescription(dialogDescription);
    setIsOpen(true);
  }

  function handleConfirm() {
    if (pendingUrl) {
      setIsOpen(false);
      navigate(pendingUrl);
      setPendingUrl(null);
    }
  }

  function handleCancel() {
    setIsOpen(false);
    setPendingUrl(null);
  }

  return {
    isOpen,
    title,
    description,
    confirmNavigation,
    handleConfirm,
    handleCancel,
  };
} 