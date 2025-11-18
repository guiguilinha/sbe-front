import { CategoryItem } from "./CategoryItem";
import type { CategoryItemProps } from "@/types/dashboard";

type CategoryListProps = {
  items: CategoryItemProps[];
  expandedCount?: number; // default 2
};

export function CategoryList({ items, expandedCount = 2 }: CategoryListProps) {
  console.log('🔑 CategoryList - Gerando keys para categorias:', items.map((it, idx) => `category-${it.name}-${idx}`));
  
  return (
    <div className="space-y-4">
      {items.map((it, idx) => {
        const key = `category-${it.name}-${idx}`;
        console.log(`🔑 CategoryList - Key gerada: ${key} para categoria: ${it.name}`);
        return (
          <CategoryItem
            key={key}
            {...it}
            defaultOpen={idx < expandedCount || it.defaultOpen}
          />
        );
      })}
    </div>
  );
}
