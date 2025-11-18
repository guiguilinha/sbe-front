import { LoadingSpinner, ErrorMessage } from "@/components/ui";
import type { HowItWorksData } from "@/types";

interface HowItWorksProps {
  data?: HowItWorksData;
  loading?: boolean;
  error?: string | null;
}

export function HowItWorks({ data, loading, error }: HowItWorksProps) {
  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <LoadingSpinner size="lg" text="Carregando como funciona..." />
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <ErrorMessage 
            message={error || "Não foi possível carregar esta seção."}
            onRetry={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  const { overline, title, description, steps } = data;

  // Verificar se steps existe e é um array
  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {title || "Como Funciona"}
            </h2>
            <p className="text-gray-600">
              {description || "Nenhum passo disponível no momento."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-white bg-grid-pattern">
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

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={step.id} className="text-center">
              {/* Number Circle */}
              <div className={`w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 pulse-circle`} style={{ animationDelay: `${index * 0.5}s` }}>
                <span className="text-white text-xl font-bold">{step.order}</span>
              </div>
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 