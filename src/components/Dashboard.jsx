import { useDashboardStore } from "../store/dashboardStore";
import CategorySection from "./CategorySection";

export default function Dashboard({ searchQuery = "" }) {
  const categories = useDashboardStore((state) => state.categories);

  const normalizedSearch = searchQuery.trim().toLowerCase();

  return (
    <div className="dashboard">
      {categories.map((category) => {
        const filteredWidgets = normalizedSearch
          ? category.widgets.filter(
              (widget) =>
                widget.name.toLowerCase().includes(normalizedSearch) ||
                (widget.text || "").toLowerCase().includes(normalizedSearch)
            )
          : category.widgets;

        return (
          <CategorySection
            key={category.id}
            category={{
              ...category,
              widgets: filteredWidgets,
            }}
          />
        );
      })}
    </div>
  );
}