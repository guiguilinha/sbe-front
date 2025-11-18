import { LoadingSpinner, ErrorMessage } from "@/components/ui";
import { MaskedParallaxCard } from '@/components/brand/MaskedParallaxCard';
import { Button } from "@/components/ui/button";
import { fixImageUrl } from "@/services/api";
import { useQuizAccess } from "@/hooks/useQuizAccess";
import { AuthRequiredModal } from "@/components/ui/AuthRequiredModal";
import type { MaturityLevelsData, HeroData } from "@/types";

interface MaturityLevelsProps {
  data?: MaturityLevelsData;
  heroData?: HeroData;
  loading?: boolean;
  error?: string | null;
}

export function MaturityLevels({ data, loading, error, heroData }: MaturityLevelsProps) {
  const { handleQuizAccess, showAuthModal, closeAuthModal } = useQuizAccess();

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <LoadingSpinner size="lg" text="Carregando níveis de maturidade..." />
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ErrorMessage 
            message={error || "Erro ao carregar os níveis de maturidade."}
            onRetry={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  const { overline, title, description, cards } = data;
  const buttonLabel = heroData?.label_button || "Começar Quiz";

  // Verificar se cards existe e é um array
  if (!cards || !Array.isArray(cards) || cards.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {title || "Níveis de Maturidade"}
            </h2>
            <p className="text-gray-600">
              {description || "Nenhum nível de maturidade disponível no momento."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          {overline && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-6">
              <span className="text-blue-500">◆</span>
              {overline}
            </div>
          )}
          {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          )}
          {description && (
            <p className="text-gray-600 max-w-5xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 ">
         {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex p-6"
            >
              {/* Content */}
              <div className="p-6 w-1/2">
                {card.overline && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full text-xs text-blue-600 mb-3">
                    <span className="text-blue-500">◆</span>
                    {card.overline}
                  </div>
                )}
                {card.title && (
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                )}
                {card.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                )}
              </div>
              {/* Background Image */}
              <div className="h-48 relative w-1/2">
                <MaskedParallaxCard
                  bgImages={card.bg_image ? [fixImageUrl(card.bg_image)] : []}
                  characterImage={card.image ? fixImageUrl(card.image) : undefined}
                  level={card.title?.split(' ')[0]?.toLowerCase() || 'default'}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-16">
          <Button
            variant="default"
            size="lg"
            onClick={handleQuizAccess}
          >
            {buttonLabel}
          </Button>
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