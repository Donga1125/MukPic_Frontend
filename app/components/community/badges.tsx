import { ReactNode } from "react";

type FoodCategoryBadgeProps = {
    children: ReactNode;
}

export function FoodCategoryBadge({ children }: FoodCategoryBadgeProps) {
    return (
        <div className="food-category-badge">
            <span className="food-category-badge-text">{children}</span>
        </div>
    );
}