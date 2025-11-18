import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import AuthGroupButtons from "./AuthGroupButtons";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function AuthRequiredModal({ 
  isOpen, 
  onClose, 
  title = "Autenticação Necessária",
  message = "Para acessar o quiz de maturidade digital, você precisa estar logado."
}: AuthRequiredModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {message}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <AuthGroupButtons />
        </div>
      </DialogContent>
    </Dialog>
  );
}
