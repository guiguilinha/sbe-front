// Tipos específicos do frontend para usuário enriquecido
// Apenas dados processados e seguros para o frontend
// Dados da empresa NÃO são enviados para o frontend por segurança

export interface ProcessedUserData {
  id: string;
  name: string;
  email: string;
  
  // Dados pessoais específicos do Keycloak
  given_name?: string;
  lastName?: string;
  cpf?: string;
  dataNascimento?: string;
  genero?: string;
  escolaridade?: string;
  
  // Endereço
  cidade?: string;
  uf?: string;
  
  // Contatos
  telefoneCelular?: string;
  telefoneResidencial?: string;
  telefoneTrabalho?: string;
  
  // Dados Sebrae
  codParceiro?: string;
  
  // Roles e permissões
  roles?: string[];
  permissions?: string[];
}

// Interface para empresa (dados seguros para o frontend)
export interface EmpresaVinculo {
  id: string; // UUID para identificar cada empresa
  cnpj: string;
  nome: string;
  isPrincipal: boolean;
  codStatusEmpresa: string;
  desTipoVinculo: string;
}

export interface EnrichedUserData {
  user: ProcessedUserData;
  empresas: EmpresaVinculo[]; // Array de empresas (dados seguros)
  metadata: {
    hasEmpresaData: boolean;
    empresaSource: 'cpe-backend' | null;
    lastUpdated: string;
    processingTime: number;
  };
}

export interface EnrichUserDataRequest {
  idToken: string;
}

export interface EnrichUserDataResponse {
  success: boolean;
  data?: EnrichedUserData;
  error?: string;
  message?: string;
}
