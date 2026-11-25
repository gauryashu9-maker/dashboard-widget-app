import WidgetCard from "./WidgetCard";
import { useDashboardStore } from "../store/dashboardStore";

export default function CategorySection({ category }) {
  const openDrawer = useDashboardStore((state) => state.openDrawer);

  return (
    <section className="category">
      <h2>{category.title}</h2>

      <div className="widget-grid">
        {category.widgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            categoryId={category.id}
            widget={widget}
          />
        ))}

        <button
          className="add-widget-card"
          onClick={() => openDrawer(category.id)}
        >
          + Add Widget
        </button>
      </div>
    </section>
  );
}