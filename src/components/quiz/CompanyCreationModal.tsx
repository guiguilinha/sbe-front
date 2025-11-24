import { useState } from 'react';
import type { EmpresaVinculo } from '@/types/enriched-user.types';
import api from '@/services/api';

interface CompanyCreationModalProps {
  isOpen: boolean;
  onCompanyCreated: (company: EmpresaVinculo) => void;
  onClose: () => void;
}

export function CompanyCreationModal({ 
  isOpen, 
  onCompanyCreated,
  onClose: _onClose 
}: CompanyCreationModalProps) {
  const [mode, setMode] = useState<'form' | 'skip'>('form');
  const [cnpj, setCnpj] = useState('');
  const [nome, setNome] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateReal = async () => {
    if (!cnpj || !nome) {
      setError('CNPJ e nome são obrigatórios');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const response = await api.post<{ success: boolean; data: EmpresaVinculo }>(
        '/company/create',
        {
          type: 'real',
          companyData: {
            cnpj: cnpj.replace(/\D/g, ''), // Remove formatação
            nome
          }
        }
      );

      if (response.data.success) {
        onCompanyCreated(response.data.data);
      } else {
        throw new Error('Erro ao criar empresa');
      }
    } catch (err) {
      console.error('Erro ao criar empresa:', err);
      setError(err instanceof Error ? err.message : 'Erro ao criar empresa');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateFictitious = async () => {
    setIsCreating(true);
    setError(null);

    try {
      const response = await api.post<{ success: boolean; data: EmpresaVinculo }>(
        '/company/create',
        {
          type: 'fictitious'
        }
      );

      if (response.data.success) {
        onCompanyCreated(response.data.data);
      } else {
        throw new Error('Erro ao criar empresa fictícia');
      }
    } catch (err) {
      console.error('Erro ao criar empresa fictícia:', err);
      setError(err instanceof Error ? err.message : 'Erro ao criar empresa fictícia');
    } finally {
      setIsCreating(false);
    }
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 14) {
      return numbers.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
    }
    return value;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Cadastrar Empresa
          </h2>
          <p className="text-gray-600 mt-2">
            Para realizar o diagnóstico, é necessário cadastrar uma empresa.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === 'form' ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-2">
                  CNPJ *
                </label>
                <input
                  id="cnpj"
                  type="text"
                  value={cnpj}
                  onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
                  placeholder="00.000.000/0000-00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={18}
                />
              </div>

              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Empresa *
                </label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite o nome da empresa"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setMode('skip')}
                  className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  disabled={isCreating}
                >
                  Pular
                </button>
                <button
                  onClick={handleCreateReal}
                  disabled={isCreating || !cnpj || !nome}
                  className={`flex-1 px-6 py-2 rounded-lg font-medium transition-colors ${
                    isCreating || !cnpj || !nome
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isCreating ? 'Criando...' : 'Cadastrar Empresa'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  Ao pular, será criada uma empresa fictícia com base no seu CPF. 
                  Você poderá atualizar os dados posteriormente.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setMode('form')}
                  className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  disabled={isCreating}
                >
                  Voltar
                </button>
                <button
                  onClick={handleCreateFictitious}
                  disabled={isCreating}
                  className={`flex-1 px-6 py-2 rounded-lg font-medium transition-colors ${
                    isCreating
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isCreating ? 'Criando...' : 'Criar Empresa Fictícia'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

