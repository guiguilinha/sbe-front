import type { CategorySnapshot } from '@/types/contracts/dashboard.types';
import CategoryItem from './CategoryItem';
export default function CategoryList({ 
  categories, defaultOpenCount = 2 
}
: { categories: CategorySnapshot[]; 
    defaultOpenCount?: number; 
  }) {
     console.log('🔑 Blocks/CategoryList - Gerando keys para categorias:', categories.map((c, i) => `category-${c.id || c.name}-${i}`));
     
     return (
       <div className="space-y-4 p-6 rounded-2xl border-0 shadow-lg">
        <div className="space-y-1">
          <p className="text-lg font-medium text-gray-900">Categorias de maturidade digital</p>
          <p className="text-xs text-gray-600 mt-0">Veja como está cada áreas no seu negócio</p>
        </div>
         {categories.map((c, i) => {
           const key = `category-${c.id || c.name}-${i}`;
           console.log(`🔑 Blocks/CategoryList - Key gerada: ${key} para categoria: ${c.name}`);
           return <CategoryItem key={key} data={c} defaultOpen={i < defaultOpenCount} />;
         })}
       </div>
     );
  }
