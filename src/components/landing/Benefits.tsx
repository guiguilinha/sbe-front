import { ErrorMessage } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { fixImageUrl } from "@/services/api";
import type { BenefitsData } from "@/types";

interface BenefitsProps {
  data?: BenefitsData;
  loading?: boolean;
  error?: string | null;
}

export function Benefits({ data, loading, error }: BenefitsProps) {
  if (loading) {
    return (
      <section className="pt-24 pb-16 mt-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <Skeleton className="h-8 w-40 mb-4 mx-auto rounded" />
            <Skeleton className="h-10 w-2/3 mb-4 mx-auto rounded" />
            <Skeleton className="h-6 w-1/2 mx-auto rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="pt-24 pb-16 mt-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <ErrorMessage 
            message={error || "Erro ao carregar benefícios"}
            onRetry={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  const { overline, title, description, benefits } = data;

  // Verificar se benefits existe e é um array
  if (!benefits || !Array.isArray(benefits) || benefits.length === 0) {
    return (
      <section className="pt-24 pb-16 mt-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {title || "Benefícios"}
            </h2>
            <p className="text-gray-600">
              {description || "Nenhum benefício disponível no momento."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-16 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          {overline && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-6">
              <span className="text-blue-500">◆</span>
              {overline}
            </div>
          )}
          {title && (
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 max-w-5xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((card, index) => (
            <div key={card.id || index} className="px-6 py-2 flex flex-col transition-transform transform hover:-translate-y-2">
              <div className="rounded-lg h-72 flex items-center justify-center overflow-hidden z-10 px-6">
              {card.image ? (
                <img
                  src={fixImageUrl(card.image)}
                  alt={card.image_alt || card.title}
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
              <div className="flex-grow bg-white border border-gray-200 rounded-xl -mt-32 2xl:pt-40 xl:pt-40 lg:pt-24 md:pt-24 sm:pt-40 pt-24 p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900">
                  {card.title}
                </h3>
                <p className="text-gray-600">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 