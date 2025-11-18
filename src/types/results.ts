// Tipos para a Results Page
// Baseados nos endpoints do backend

// =======================================================================
// Tipos para resposta da API
// =======================================================================

export interface UserResultsData {
  "hero-section": {
    "hero-start": string;
    "hero-content": string;
    "hero-general-level": string;
    "hero-insight": string;
    "hero-icon": string;
    "hero-score-text": string;
    "hero-score": string;
    "hero-percent": string;
    "hero-image": string;
  };
  "advice-section": {
    "advice-title": string;
    "advice-general-level": string;
    "advice-content": string;
  };
  "category-section": {
    "category-title": string;
    "category-itens": Array<{
      "category-item-title": string;
      "category-item-level": string;
      "category-item-score": string;
      "category-item-percent": string;
      "category-item-advice": string;
      "category-item-insight": string;
      "category-item-recomendations": Array<{
        "content-course-title": string;
        "content-course-description": string;
        "content-course-image": string;
        "content-course-image_alt": string;
        "content-course-link": string;
        "content-course-levels": number[];
        "content-course-categories": number[];
      }>;
    }>;
  };
  "cta-section": {
    "cta-title": string;
    "cta-content": string;
    "cta-button-text": string;
    "cta-general-level": string;
    "trail-link": string;
  };
  "conclusion-section": {
    "conclusion-title": string;
    "conclusion-positive-feedback": string;
    "conclusion-attention-feeback": string;
    "conclusion-advice": string;
  };
  "content-section": {
    "content-title": string;
    "content-text": string;
    "content-general-level": string;
    "content-courses": Array<{
      "content-course-title": string;
      "content-course-description": string;
      "content-course-image": string;
      "content-course-image_alt": string;
      "content-course-link": string;
      "content-course-levels": number[];
      "content-course-categories": number[];
    }>;
  };
  "map-section": {
    "map-title": string;
    "map-content": string;
    "map-region": Array<{
      "map-region-title": string;
      "map-region-city-title": string;
      "map-region-phone-number": string;
    }>;
  };
}

export interface CalculatedResult {
  total_score: number;
  general_level: {
    id: number;
    title: string;
  };
  categories: Array<{
    category_id: number;
    score: number;
    level: {
      id: number;
      title: string;
    };
  }>;
}

// =======================================================================
// Tipos para o frontend
// =======================================================================

export interface ResultsData {
  userResults: UserResultsData;
  calculatedResult: CalculatedResult;
}

// Tipos para componentes específicos
export interface HeroSectionData {
  "hero-start": string;
  "hero-content": string;
  "hero-general-level": string;
  "hero-insight": string;
  "hero-icon": string;
  "hero-score-text": string;
  "hero-score": string;
  "hero-percent": string;
  "hero-image": string;
}

export interface AdviceSectionData {
  "advice-title": string;
  "advice-general-level": string;
  "advice-content": string;
}

export interface CategoryItemData {
  "category-item-title": string;
  "category-item-level": string;
  "category-item-score": string;
  "category-item-percent": string;
  "category-item-advice": string;
  "category-item-insight": string;
  "category-item-recomendations": Array<{
    "content-course-title": string;
    "content-course-description": string;
    "content-course-image": string;
    "content-course-image_alt": string;
    "content-course-link": string;
    "content-course-levels": number[];
    "content-course-categories": number[];
  }>;
}

export interface CategorySectionData {
  "category-title": string;
  "category-itens": CategoryItemData[];
}

export interface CTASectionData {
  title: string;
  content: string;
  buttonText: string;
  generalLevel: string;
}

export interface ConclusionSectionData {
  title: string;
  positiveFeedback: string;
  attentionFeedback: string;
  advice: string;
}

export interface ContentSectionData {
  "content-title": string;
  "content-text": string;
  "content-general-level": string;
  "content-courses": Array<{
    "content-course-title": string;
    "content-course-description": string;
    "content-course-image": string;
    "content-course-image_alt": string;
    "content-course-link": string;
    "content-course-levels": number[];
    "content-course-categories": number[];
  }>;
}

export interface MapSectionData {
  title: string;
  content: string;
  regions: Array<{
    regionTitle: string;
    cityTitle: string;
    phoneNumber: string;
  }>;
} 