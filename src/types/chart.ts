export interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ 
    value: number; 
    name: string; 
    color?: string;
    dataKey?: string;
  }>;
  label?: string;
}

export interface ChartLegendProps {
  payload?: Array<{ 
    value: string; 
    color: string;
    dataKey?: string;
  }>;
  verticalAlign?: "top" | "bottom";
}
