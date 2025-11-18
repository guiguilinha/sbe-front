import api from './api';
import type { 
  HomeData, 
  Benefit, 
  HowItWorksStep, 
  MaturityExplanationCard, 
  FAQItem, 
  HomePageResponse,
  CardData,
  FAQItemData
} from '../types';

/**
 * Busca todos os dados da Home Page em uma única chamada
 * Os dados já vêm aninhados na resposta da API
 */
export const getHomeData = async (previewToken?: string): Promise<HomeData> => {
  try {
    
    // Buscar todos os dados em uma única chamada
    const search = new URLSearchParams(window.location.search);
    const isPreview = search.get("preview") === "1" || search.get("mode") === "preview";
    
    // Construir URL com preview token se fornecido
    let url = '/homepage';
    const params = new URLSearchParams();
    
    if (isPreview) {
      params.append('mode', 'preview');
    }
    
    if (previewToken) {
      params.append('token', previewToken);
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await api.get<HomePageResponse>(url);
    const data = response.data;

    // Mapear cards para os tipos esperados pelo frontend
    const mapCardToBenefit = (card: CardData): Benefit => ({
      id: card.id,
      title: card.title,
      description: card.description,
      image: card.image,
      image_alt: card.image_alt,
      label_button: card.label_button || undefined,
      order: card.order,
      parent: card.parent
    });

    const mapCardToHowItWorksStep = (card: CardData): HowItWorksStep => ({
      id: card.id,
      title: card.title,
      description: card.description,
      order: card.order,
      parent: card.parent
    });

    const mapCardToMaturityCard = (card: CardData): MaturityExplanationCard => ({
      id: card.id,
      title: card.title,
      description: card.description,
      image: card.image,
      image_alt: card.image_alt,
      bg_image: card.bg_image,
      order: card.order,
      parent: card.parent
    });

    const mapFAQItemToFAQItem = (item: FAQItemData): FAQItem => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      order: item.order,
      parent: item.parent
    });

    // Estruturar dados conforme esperado pelo frontend
    const homeData: HomeData = {
      hero: data.hero,
      benefits: {
        overline: data.benefits.section.overline,
        title: data.benefits.section.title,
        description: data.benefits.section.description,
        benefits: (data.benefits.cards || []).map(mapCardToBenefit)
      },
      howItWorks: {
        id: data.how_it_works.section.id,
        overline: data.how_it_works.section.overline,
        title: data.how_it_works.section.title,
        description: data.how_it_works.section.description,
        steps: (data.how_it_works.cards || []).map(mapCardToHowItWorksStep)
      },
      maturityLevels: {
        id: data.maturity_levels.section.id,
        overline: data.maturity_levels.section.overline,
        title: data.maturity_levels.section.title,
        description: data.maturity_levels.section.description,
        cards: (data.maturity_levels.cards || []).map(mapCardToMaturityCard)
      },
      faq: {
        id: data.faq.section.id,
        overline: data.faq.section.overline,
        title: data.faq.section.title,
        description: data.faq.section.description,
        items: (data.faq.items || []).map(mapFAQItemToFAQItem)
      },
      footer: data.footer
    };
    
    return homeData;
    
  } catch (error) {
    console.error('❌ Erro ao buscar dados da Home Page:', error);
    
    if (error instanceof Error) {
      throw new Error(`Falha ao carregar dados da Home Page: ${error.message}`);
    }
    
    throw new Error('Erro inesperado ao carregar dados da Home Page');
  }
}; 