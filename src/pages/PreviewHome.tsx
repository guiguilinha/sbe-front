import { useEffect } from "react";
import HomePage from "@/pages/HomePage"; // ou ajuste o caminho
import { smoothScrollToElement } from "@/lib/scroll-utils";

export default function PreviewHome() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const focus = params.get("focus"); // Ex: home_hero:123
    const previewToken = params.get("token"); // Preview token do Directus

    console.log('[PreviewHome] Parâmetros:', {
      focus,
      hasPreviewToken: !!previewToken,
      previewTokenLength: previewToken?.length || 0
    });

    if (!focus) return;

    const [collection] = focus.split(":");

    const sectionMap: Record<string, string> = {
      home_hero: "hero",
      home_benefits: "beneficios",
      home_how_it_works: "como-funciona",
      home_maturity_levels: "niveis-maturidade",
      home_faq: "faq",
    };

    const targetId = sectionMap[collection];
    if (targetId) {
      setTimeout(() => {
        smoothScrollToElement(targetId, 80, 700); // offset p/ header fixo, se tiver
        // opcional: destaque visual temporário
        const el = document.getElementById(targetId);
        if (el) {
          el.classList.add("ring-2", "ring-offset-2", "ring-blue-500");
          setTimeout(() => {
            el.classList.remove("ring-2", "ring-offset-2", "ring-blue-500");
          }, 3000);
        }
      }, 500); // espera renderizar
    }
  }, []);

  // Extrair preview token da URL para passar para o HomePage
  const params = new URLSearchParams(window.location.search);
  const previewToken = params.get("token");

  return <HomePage previewToken={previewToken || undefined} />;
}
