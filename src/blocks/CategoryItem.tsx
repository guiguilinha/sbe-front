import { useState } from 'react';
import type { CategorySnapshot, ActionItem, ResourceLinkItem } from '@/types/contracts/dashboard.types';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CategoryBar } from '@/components/sdp/CategoryBar';
import { ChipStatus } from '@/components/sdp/ChipStatus';
import { TrendingUp, Lightbulb, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';

export type CategoryItemProps = { 
    data: CategorySnapshot; 
    defaultOpen?: boolean 
};

export default function CategoryItem({ 
    data, defaultOpen = false 
}: CategoryItemProps) { 
    const [isOpen, setIsOpen] = useState(defaultOpen);
    

    const maxScore = 12; // Score máximo por categoria

    return (
        <div className="border border-gray-200 p-6 rounded-2xl">
            {/* Header */}
            {isOpen ? (
            <>     
                <div className="flex flex-col">
                    <div className="flex-1">
                        <div className="flex items-center gap-9 justify-between">
                            <div className="items-center gap-2">
                                <p className="text-lg font-medium text-gray-900">{data.name}</p>
                                <span className="text-xs text-gray-500">{data.statusLabel || 'Aprendiz digital'}</span>
                            </div>
                            <ChipStatus status={data.status} className="align-end" />
                        </div>
                    </div>
                    {/* Barra de progresso */}
                    <CategoryBar
                        points={data.score}
                        total={maxScore}
                        status={data.status}
                        className="w-full mt-4"
                        labelPosition="right"
                    />
                    <Separator className="my-4" />
                </div>
                <div className="mt-4 space-y-4">
                    <div className="flex justify-between">
                        <p className="text-md font-medium text-gray-700">O que fazer a seguir</p>
                        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="gap-1 text-sm">
                            Ver menos
                            <ChevronUp className="w-4 h-4" />
                        </Button>
                    </div>
                    {/* Insights e dicas */}
                    {data.insight && (
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-md font-medium text-gray-700">Insight</p>
                                    <p className="text-sm text-gray-500">{data.insight}</p>
                                </div>
                            </div>

                            {/* Ações práticas */}
                            {data.actions && data.actions.length > 0 && (
                                <div className="flex items-start gap-3">
                                    <Lightbulb className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-md font-medium text-gray-700">Dica prática</p>
                                        <p className="text-sm text-gray-500">
                                            {data.actions.map((action: ActionItem) => action.text).join('; ')}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <Separator className="my-4" />

                            {/* Recursos relacionados */}
                            {data.resources && data.resources.length > 0 && (
                                <div className="space-y-2">
                                    {data.resources.map((resource: ResourceLinkItem, index: number) => (
                                        <a
                                            key={index}
                                            href={resource.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            {resource.label}
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </>
            ):(
            <div className="flex items-center justify-between">
                <div className="flex justify-between w-full">
                    <div className="flex items-center gap-9">
                        <div className="items-center gap-2">
                            <p className="text-lg font-medium text-gray-900">{data.name}</p>
                            <span className="text-xs text-gray-500">{data.statusLabel || 'Aprendiz digital'}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                            {data.score} pontos de {maxScore}
                        </span>
                        <ChipStatus status={data.status} />
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="gap-1 text-sm">
                        Ver mais
                        <ChevronDown className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            )}
                      
        </div> 
    );
}
