import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/SimpleUseAuth";

function AuthGroupButtons() {
  const { isAuthenticated, user, login, logout, register } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex gap-2">
        <Button size="sm" onClick={() => login()}>
          Entrar
        </Button>

        <Button variant="outline" size="sm" onClick={() => register()}>
          Cadastre-se
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">Olá, {user?.name ?? "usuário"}!</span>
      <Button size="sm" variant="outline" onClick={() => logout()}>
        Sair
      </Button>
    </div>
  );
}

export default AuthGroupButtons;
