import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import type { EvolutionBlockProps } from "@/types/dashboard";

interface EvolutionData {
  month: string;
  level: number;
  score: number;
}

const mockData: EvolutionData[] = [
  { month: "Jan", level: 1, score: 15 },
  { month: "Feb", level: 2, score: 28 },
  { month: "Mar", level: 2, score: 32 },
  { month: "Apr", level: 2, score: 35 },
  { month: "May", level: 3, score: 42 },
  { month: "Jun", level: 3, score: 45 },
];

const levelLabels = ["Iniciante", "Aprendiz", "Empreendedor", "Inovador"];

export function EvolutionBlock({ 
  insightLines
}: EvolutionBlockProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"3m" | "6m" | "12m">("6m");
  const [selectedView, setSelectedView] = useState<"geral" | "categorias">("geral");

  const [l1, l2] = Array.isArray(insightLines)
   ? insightLines 
   : (():[string, string] => {
    const [a, b] = insightLines.split('\n');
    return [a, b ?? ''];
   })();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{`Mês: ${label}`}</p>
          <p className="text-blue-600">{`Nível: ${levelLabels[payload[0].value - 1] || 'N/A'}`}</p>
          <p className="text-green-600">{`Pontuação: ${payload[0].payload.score} pts`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="rounded-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base md:text-lg">Evolução ao longo do tempo</CardTitle>
          <div className="flex items-center gap-4">
            <Select value={selectedPeriod} onValueChange={(value: string) => setSelectedPeriod(value as "3m" | "6m" | "12m")}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3m">3m</SelectItem>
                <SelectItem value="6m">6m</SelectItem>
                <SelectItem value="12m">12m</SelectItem>
              </SelectContent>
            </Select>
            
            <Tabs value={selectedView} onValueChange={(value: string) => setSelectedView(value as "geral" | "categorias")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="categorias">Por categorias</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Gráfico de linha real */}
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#666"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                domain={[0, 4]}
                ticks={[1, 2, 3, 4]}
                tickFormatter={(value) => levelLabels[value - 1] || ''}
                stroke="#666"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="level" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Indicador de performance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+10,4% na última semana</span>
          </div>
          
          <Button variant="ghost" size="sm">
            Ver como tabela →
          </Button>
        </div>

        {/* Insights */}
        <p className="text-sm text-muted-foreground">{l1}</p>
        <p className="text-sm text-muted-foreground">{l2}</p>
      </CardContent>
    </Card>
  );
}