import { Button, ErrorMessage } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { fixImageUrl } from "@/services/api";
import { useQuizAccess } from "@/hooks/useQuizAccess";
import { AuthRequiredModal } from "@/components/ui/AuthRequiredModal";
import type { HeroData } from "@/types";

interface HeroProps {
  data?: HeroData;
  loading?: boolean;
  error?: string | null;
}

export function Hero({ data, loading, error }: HeroProps) {
  const { handleQuizAccess, showAuthModal, closeAuthModal } = useQuizAccess();

  if (loading) {
    return (
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16 min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-12 animate-pulse">
          {/* Esquerda: Título, subtítulo, botão */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <Skeleton className="h-12 w-3/4 mx-auto lg:mx-0 mb-4 rounded" />
            <Skeleton className="h-6 w-2/3 mx-auto lg:mx-0 mb-6 rounded" />
            <Skeleton className="h-12 w-40 mx-auto lg:mx-0 rounded" />
          </div>
          {/* Direita: Imagem/ilustração */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <Skeleton className="h-80 w-80 rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16 min-h-[60vh] flex items-center justify-center">
        <ErrorMessage 
          message={error || "Erro ao carregar dados da seção principal"}
          onRetry={() => window.location.reload()}
        />
      </section>
    );
  }

  const { overline, title, description, image, image_alt, label_button } = data;
  
  return (
    <section 
      className="text-white py-16 px-8"
      aria-labelledby="hero-title"
      role="banner"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Conteúdo Textual - Lado Esquerdo */}
        <div className="lg:w-1/2 space-y-6 lg:text-left xl:pt-16 lg:pt-0 pt-10">
          <div className="space-y-4 ">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-6">
              <span className="text-blue-500">◆</span>
              {overline}
            </div>
            <h1 
              id="hero-title"
              className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
            >
              {title}
            </h1>
            <p className="text-xl font-light text-primary-foreground leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            {/* Botão principal */}
            <Button
              size="lg"
              className="bg-white text-primary border border-primary border-2 hover:bg-gray-100 font-semibold text-lg px-8 py-4 h-auto"
              onClick={handleQuizAccess}
            >
              {label_button}
            </Button>
          </div>
        </div>
        {/* Imagem/Ilustração - Lado Direito */}
        <div className="relative">
          {image ? (
            <img
              src={fixImageUrl(image)}
              alt={image_alt || title}
              className="h-auto rounded-lg"
              loading="lazy"
            />
          ) : (
            <div className="w-full max-w-md lg:max-w-lg h-80 bg-white/10 rounded-lg flex items-center justify-center">
              <div className="text-center text-white/70">
                <div className="text-6xl mb-4">💼</div>
                <p className="text-lg">Ilustração do diagnóstico digital</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal de autenticação */}
      <AuthRequiredModal 
        isOpen={showAuthModal} 
        onClose={closeAuthModal} 
      />
    </section>
  );
} 