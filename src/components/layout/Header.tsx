import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AuthGroupButtons from "@/components/ui/AuthGroupButtons";
import LogoSebrae from "@/components/brand/LogoSebrae";
import { QuizExitDialog } from "@/components/brand/QuizExitDialog";
import { useQuizExitConfirmation } from "@/lib";
import { useCallback } from "react";
import { handleSmoothScroll } from "@/lib";

// Dados de navegação
const menuItems = [
  { title: "Início", url: "#hero" },
  { title: "Benefícios", url: "#beneficios" },
  { title: "Como Funciona", url: "#como-funciona" },
  { title: "Níveis de Maturidade Digital", url: "#niveis-maturidade" },
  { title: "FAQ", url: "#faq" },
];

function Header() {
  const location = useLocation();
  
  const {
    isQuiz,
    modalOpen,
    setModalOpen,
    handleMenuClick,
    handleConfirm,
    handleCancel,
  } = useQuizExitConfirmation();

  // Handler para scroll suave customizado
  const handleSmoothScrollClick = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) => {
    handleSmoothScroll(e, url, 80, 700);
  }, []);

  return (
    <header className="py-4 border-b px-8 sticky top-0 z-50 bg-background">
      <div className="container mx-auto flex items-center justify-between">
        {/* --- Menu para Telas Grandes (Desktop) --- */}
        <nav className="hidden lg:flex items-center justify-between w-full">
          <div className="flex items-center gap-6">
            {isQuiz ? (
              <a
                href="/"
                className="flex items-center gap-2"
                onClick={(e) => handleMenuClick(e, "/")}
                tabIndex={0}
                aria-label="Página inicial Sebrae"
              >
                <LogoSebrae className="max-h-10 text-primary" />
              </a>
            ) : (
              <Link to="/" className="flex items-center gap-2">
                <LogoSebrae className="max-h-10 text-primary" />
              </Link>
            )}
            {location.pathname === "/" && (
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {isQuiz ? (
                      <a
                        href={item.url}
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-normal transition-colors hover:bg-muted hover:text-accent-foreground"
                        onClick={(e) => handleMenuClick(e, item.url)}
                        tabIndex={0}
                      >
                        {item.title}
                      </a>
                    ) : (
                      <a
                        href={item.url}
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-normal transition-colors hover:bg-muted hover:text-accent-foreground"
                        onClick={(e) => handleSmoothScrollClick(e, item.url)}
                      >
                        {item.title}
                      </a>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            )}
          </div>
          <AuthGroupButtons />
        </nav>

        {/* --- Menu para Telas Pequenas (Mobile) --- */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <Link to="/" className="flex items-center gap-2">
            <LogoSebrae className="max-h-10 text-primary" />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto" side="right">
              <SheetHeader>
                <SheetTitle>
                  {isQuiz ? (
                    <a
                      href="/"
                      className="flex items-center gap-2"
                      onClick={(e) => handleMenuClick(e, "/")}
                      tabIndex={0}
                      aria-label="Página inicial Sebrae"
                    >
                      <LogoSebrae className="max-h-8 text-primary" />
                    </a>
                  ) : (
                    <Link to="/" className="flex items-center gap-2">
                      <LogoSebrae className="max-h-8 text-primary" />
                    </Link>
                  )}
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4">
                {menuItems.map((item) => (
                  isQuiz ? (
                    <a
                      key={item.title}
                      href={item.url}
                      className="text-md font-semibold hover:underline"
                      onClick={(e) => handleMenuClick(e, item.url)}
                      tabIndex={0}
                    >
                      {item.title}
                    </a>
                  ) : (
                    <a
                      key={item.title}
                      href={item.url}
                      className="text-md font-semibold hover:underline"
                      onClick={(e) => handleSmoothScroll(e, item.url)}
                    >
                      {item.title}
                    </a>
                  )
                ))}
                <div className="border-t pt-4">
                  <AuthGroupButtons />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Modal de confirmação ao sair do quiz */}
      <QuizExitDialog
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </header>
  );
};

export default Header; 