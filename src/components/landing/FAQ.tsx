import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LoadingSpinner, ErrorMessage } from "@/components/ui";
import type { FAQData } from "@/types";

interface FAQProps {
  data?: FAQData;
  loading?: boolean;
  error?: string | null;
}

export function FAQ({ data, loading, error }: FAQProps) {
  if (loading) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-4">
          <LoadingSpinner size="lg" text="Carregando FAQ..." />
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-4">
          <ErrorMessage 
            message={error || "Erro ao carregar FAQ"}
            onRetry={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  const { overline, title, description, items } = data;

  // Verificar se items existe e é um array
  if (!items || !Array.isArray(items) || items.length === 0) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {title || "FAQ"}
            </h2>
            <p className="text-gray-600">
              {description || "Nenhuma pergunta disponível no momento."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
      <div className="text-center mb-16">
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

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-0">
            {items.map((item, index) => (
              <div key={item.id}>
                <AccordionItem 
                  value={String(item.id)}
                  className="border-none"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6 px-0">
                    <span className="text-lg font-medium text-gray-900">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-0 pb-6 px-0">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Separator line (except for last item) */}
                {index < items.length - 1 && (
                  <div className="border-t border-gray-200"></div>
                )}
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
} 