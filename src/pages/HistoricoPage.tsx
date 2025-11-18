import DashboardShell from '@/components/layout/DashboardShell';
import { useDiagnosticos } from '@/hooks/useDiagnosticos';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Link } from 'react-router-dom';

export default function HistoricoPage() {
  const { data, isLoading, error } = useDiagnosticos();
  
  if (isLoading) return (
    <DashboardShell>
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando histórico...</p>
        </div>
      </div>
    </DashboardShell>
  );
  
  if (error || !data) return (
    <DashboardShell>
      <div className="text-center py-8">
        <p className="text-red-600">Erro ao carregar histórico</p>
      </div>
    </DashboardShell>
  );

  // Ordenar por data (mais recente primeiro)
  const historyData = [...data].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Histórico de Resultados</h1>
            <p className="text-sm text-gray-600 mt-1">
              Acompanhe sua evolução ao longo do tempo
            </p>
          </div>
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
            Voltar ao Dashboard
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total de Diagnósticos</p>
                  <p className="text-2xl font-semibold">{historyData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Melhor Pontuação</p>
                  <p className="text-2xl font-semibold">
                    {Math.max(...historyData.map(h => h.overallScore))} pts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Evolução Total</p>
                  <p className="text-2xl font-semibold">
                    {historyData.length > 0 ? 
                      `+${historyData[0].overallScore - historyData[historyData.length - 1].overallScore} pts` : 
                      '0 pts'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Todos os Registros</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {historyData.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>Nenhum diagnóstico encontrado.</p>
                  <p className="text-sm mt-2">Realize seu primeiro diagnóstico para ver o histórico aqui.</p>
                </div>
              ) : (
                historyData.map((record, index) => {
                  // Calcular delta comparando com o registro anterior
                  const delta = index < historyData.length - 1 
                    ? record.overallScore - historyData[index + 1].overallScore 
                    : 0;
                  const isFirst = index === 0;
                  const isLast = index === historyData.length - 1;
                  
                  return (
                    <div key={record.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Date */}
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium">
                              {new Date(record.date).toLocaleDateString("pt-BR")}
                            </span>
                          </div>

                          {/* Score */}
                          <div className="text-sm">
                            <span className="font-medium">{record.overallScore} pts</span>
                          </div>

                          {/* Delta */}
                          {!isLast && (
                            <div className="flex items-center gap-1">
                              {delta > 0 ? (
                                <TrendingUp className="w-4 h-4 text-green-600" />
                              ) : delta < 0 ? (
                                <TrendingDown className="w-4 h-4 text-red-600" />
                              ) : (
                                <Minus className="w-4 h-4 text-gray-400" />
                              )}
                              <span className={`text-sm font-medium ${
                                delta > 0 ? 'text-green-600' : 
                                delta < 0 ? 'text-red-600' : 
                                'text-gray-500'
                              }`}>
                                {delta > 0 ? `+${delta}` : delta < 0 ? delta : '0'} pts
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {isFirst && (
                            <Badge variant="outline" className="text-xs">
                              Mais Recente
                            </Badge>
                          )}
                          {isLast && (
                            <Badge variant="outline" className="text-xs">
                              Primeiro
                            </Badge>
                          )}
                          <Link 
                            to={`/historico/${record.id}`}
                            state={{ from: 'historico' }}
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                          >
                            Ver detalhes
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
