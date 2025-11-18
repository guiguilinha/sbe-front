import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Loader2, BarChart3, Table } from "lucide-react";
import { useEvolution } from "@/hooks/useEvolution";
import { useDashboard } from "@/hooks/useDashboard";
import type { EvolutionBlockProps } from "@/types/dashboard";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

// levelLabels será obtido dinamicamente dos dados

export function EvolutionBlock({ 
  insightLines
}: EvolutionBlockProps) {
  const [showTableView, setShowTableView] = useState(false);
  
  const {
    currentView,
    setCurrentView,
    currentPeriod,
    setCurrentPeriod,
    filteredGeneralData,
    filteredCategoriesData,
    currentPerformance,
    isLoading,
    error,
    refetch
  } = useEvolution();

  // Obter levelLabels dinamicamente do dashboard principal
  const { data: dashboardData } = useDashboard();

  const [l1, l2] = Array.isArray(insightLines)
   ? insightLines 
   : (():[string, string] => {
    const [a, b] = insightLines.split('\n');
    return [a, b ?? ''];
   })();

  // Dados para o gráfico baseado na view atual
  const chartData = currentView === 'geral' ? filteredGeneralData : filteredCategoriesData;
  
  // Performance atual
  const performance = currentPerformance;

  // levelLabels obtidos do dashboard principal
  const finalLevelLabels = (dashboardData as any)?.evolution?.levelLabels || ["Iniciante", "Aprendiz", "Empreendedor", "Inovador"];

  // Função para obter as cores corretas de cada nível
  const getLevelColors = (levelLabel: string) => {
    switch (levelLabel) {
      case 'Iniciante':
        return 'bg-red-100 text-red-800';
      case 'Aprendiz':
        return 'bg-yellow-100 text-yellow-800';
      case 'Empreendedor':
        return 'bg-blue-100 text-blue-800';
      case 'Inovador':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Transformar dados de categorias para o formato do Recharts
  const transformedCategoriesData = filteredCategoriesData?.map(monthData => {
    const transformed: any = { month: monthData.month };
    monthData.topCategories?.forEach((category: any, index: number) => {
      transformed[`category_${index}`] = category.level;
      transformed[`category_${index}_name`] = category.name;
      transformed[`category_${index}_level`] = category.levelLabel; // Adicionar levelLabel
      transformed[`category_${index}_color`] = category.color;
      transformed[`category_${index}_score`] = category.score;
    });
    return transformed;
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      if (currentView === 'geral') {
        return (
          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg gap-4">
            <p className="text-sm font-medium">{`Mês: ${label}`}</p>
            <p className="text-sm text-blue-600">{`Nível: ${payload[0].payload.levelLabel || 'N/A'}`}</p>
            <p className="text-sm text-green-600">{`Pontuação: ${payload[0].payload.score} pts`}</p>
            <p className="text-sm text-gray-500">{`Delta: ${payload[0].payload.delta > 0 ? '+' : ''}${payload[0].payload.delta}`}</p>
          </div>
        );
      } else {
        // Para categorias, mostrar as 3 linhas
        return (
          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
            <p className="font-medium">{`Mês: ${label}`}</p>
            {payload.map((item: any, index: number) => {
              const categoryIndex = item.dataKey.replace('category_', '');
              const categoryName = item.payload[`category_${categoryIndex}_name`];
              const categoryLevel = item.payload[`category_${categoryIndex}_level`];
              const categoryScore = item.payload[`category_${categoryIndex}_score`];
              const categoryColor = item.payload[`category_${categoryIndex}_color`];
              
              return (
                <>
                  <div key={index} className="flex items-center gap-2 mt-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: categoryColor }}
                    />
                    <span className="text-sm">
                      {categoryName}: {categoryScore} pts <br/>
                      {categoryLevel} digital
                    </span>
                  </div>
                  <Separator className="my-2" />
                </>
              );
            })}
          </div>
        );
      }
    }
    return null;
  };

  // Loading state
  if (isLoading) {
    return (
      <Card className="rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-900">Evolução ao longo do tempo</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48">
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Carregando dados de evolução...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-900">Evolução ao longo do tempo</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48">
          <div className="text-center">
            <p className="text-red-500 mb-2">Erro ao carregar dados</p>
            <Button variant="outline" size="sm" onClick={refetch}>
              Tentar novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-900">Evolução ao longo do tempo</CardTitle>
          <div className="flex items-center gap-4">
            <Select value={currentPeriod} onValueChange={(value: string) => setCurrentPeriod(value as "3m" | "6m" | "12m")}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3m">3 meses</SelectItem>
                <SelectItem value="6m">6 meses</SelectItem>
                <SelectItem value="12m">12 meses</SelectItem>
              </SelectContent>
            </Select>
            
            <Tabs value={currentView} onValueChange={(value: string) => setCurrentView(value as "geral" | "categorias")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="categorias">Por categorias</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 px-6">
        {/* Gráfico ou Tabela */}
        {!showTableView ? (
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={currentView === 'geral' ? (chartData || []) : (transformedCategoriesData || [])}
                margin={{ top: 20, right: 40, left: 60, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, 4]}
                  ticks={[1, 2, 3, 4]}
                  tickFormatter={(value) => finalLevelLabels[value - 1] || ''}
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  width={100}
                  tickMargin={10}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {currentView === 'geral' ? (
                  <Line 
                    type="monotone" 
                    dataKey="level" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#ffffff', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                ) : (
                  // Para categorias, renderizar múltiplas linhas
                  filteredCategoriesData?.[0]?.topCategories?.map((category: any, index: number) => (
                    <Line
                      key={category.id}
                      type="monotone"
                      dataKey={`category_${index}`}
                      stroke={category.color}
                      strokeWidth={2}
                      dot={{ fill: '#ffffff', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: category.color, strokeWidth: 2 }}
                      name={category.name}
                    />
                  ))
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="w-full">
            {currentView === 'geral' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium text-gray-600">Mês</th>
                      <th className="text-left py-2 font-medium text-gray-600">Nível</th>
                      <th className="text-left py-2 font-medium text-gray-600">Pontuação</th>
                      <th className="text-left py-2 font-medium text-gray-600">Delta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGeneralData?.map((item: any, index: number) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2 font-medium">{item.month}</td>
                        <td className="py-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColors(item.levelLabel)}`}>
                            {item.levelLabel}
                          </span>
                        </td>
                        <td className="py-2 font-medium">{item.score} pts</td>
                        <td className="py-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            item.delta > 0 ? 'bg-green-100 text-green-800' : 
                            item.delta < 0 ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.delta > 0 ? '+' : ''}{item.delta}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium text-gray-600">Mês</th>
                      {filteredCategoriesData?.[0]?.topCategories?.map((category: any) => (
                        <th key={category.id} className="text-left py-2 font-medium text-gray-600">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: category.color }}
                            />
                            {category.name}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategoriesData?.map((monthData: any, index: number) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2 font-medium">{monthData.month}</td>
                        {monthData.topCategories?.map((category: any) => (
                          <td key={category.id} className="py-2">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColors(category.levelLabel)}`}>
                                  {category.levelLabel}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {category.score} pts
                                <span className={`ml-1 ${
                                  category.delta > 0 ? 'text-green-600' : 
                                  category.delta < 0 ? 'text-red-600' : 
                                  'text-gray-600'
                                }`}>
                                  ({category.delta > 0 ? '+' : ''}{category.delta})
                                </span>
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Legenda para categorias */}
        {currentView === 'categorias' && filteredCategoriesData?.[0]?.topCategories && (
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            {filteredCategoriesData[0].topCategories.map((category: any) => (
              <div key={category.id} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-gray-600">{category.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Indicador de performance */}
        <div className="flex items-center justify-between">
          {currentView === 'geral' ? (
            <div className="flex items-center gap-2">
              {performance?.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : performance?.trend === 'down' ? (
                <TrendingDown className="w-4 h-4 text-red-600" />
              ) : (
                <div className="w-4 h-4 bg-gray-400 rounded-full" />
              )}
              <span className={`text-sm font-medium ${
                performance?.trend === 'up' ? 'text-green-600' : 
                performance?.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {performance.percentage}% 
              </span>
                {performance ? (
                  <>
                    <span className="text-sm font-regular text-gray-500"> no {performance.period}</span>
                  </>
                ) : 'Dados não disponíveis'}
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {performance && typeof performance === 'object' ? (
                Object.entries(performance).map(([categoryId, perf]: [string, any]) => {
                  // Obter nome da categoria dinamicamente dos dados
                  const categoryName = filteredCategoriesData?.[0]?.topCategories?.find(
                    (cat: any) => cat.id === categoryId
                  )?.name || categoryId;
                  
                  return (
                    <div key={categoryId} className="flex items-center gap-2">
                      {perf.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : perf.trend === 'down' ? (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      ) : (
                        <div className="w-4 h-4 bg-gray-400 rounded-full" />
                      )}
                      <span className={`text-sm font-medium ${
                        perf.trend === 'up' ? 'text-green-600' : 
                        perf.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}> 
                        {perf.percentage}%
                      </span>
                      <span className="text-sm font-regular text-gray-500">{categoryName}:</span>
                    </div>
                  );
                })
              ) : (
                <span className="text-sm text-gray-500">Dados não disponíveis</span>
              )}
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowTableView(!showTableView)}
            className="flex items-center gap-2"
          >
            {showTableView ? (
              <>
                <BarChart3 className="w-4 h-4" />
                Ver como gráfico
              </>
            ) : (
              <>
                <Table className="w-4 h-4" />
                Ver como tabela
              </>
            )}
          </Button>
        </div>

        {/* Insights */}
        <p className="text-sm text-muted-foreground mt-0">{l2}</p>
      </CardContent>
    </Card>
  );
}