import { useState } from 'react';
import type { EmpresaVinculo } from '@/types/enriched-user.types';

interface CompanySelectionModalProps {
  isOpen: boolean;
  companies: EmpresaVinculo[];
  onSelect: (company: EmpresaVinculo) => void;
  onClose: () => void;
}

export function CompanySelectionModal({ 
  isOpen, 
  companies, 
  onSelect, 
  onClose 
}: CompanySelectionModalProps) {
  const [selectedCompany, setSelectedCompany] = useState<EmpresaVinculo | null>(null);

  const handleConfirm = () => {
    if (selectedCompany) {
      onSelect(selectedCompany);
      setSelectedCompany(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Selecione a empresa para o diagnóstico
          </h2>
          <p className="text-gray-600 mt-2">
            Escolha para qual empresa deseja realizar o diagnóstico de maturidade digital.
          </p>
        </div>

        {/* Companies List */}
        <div className="p-6">
          <div className="space-y-3">
            {companies.map((company) => (
              <div
                key={company.cnpj}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedCompany?.cnpj === company.cnpj
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCompany(company)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {company.nome}
                      </h3>
                      {company.isPrincipal && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Principal
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p><strong>CNPJ:</strong> {company.cnpj}</p>
                      <p><strong>Vínculo:</strong> {company.desTipoVinculo}</p>
                      <p><strong>Status:</strong> {company.codStatusEmpresa}</p>
                    </div>
                  </div>
                  <div className="ml-4">
                    {selectedCompany?.cnpj === company.cnpj && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedCompany}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedCompany
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuar com o Teste
          </button>
        </div>
      </div>
    </div>
  );
}
