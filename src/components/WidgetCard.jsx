import { useDashboardStore } from "../store/dashboardStore";

export default function WidgetCard({ categoryId, widget }) {
  const removeWidget = useDashboardStore((state) => state.removeWidget);

  return (
    <article className="widget-card">
      <button
        className="remove-widget"
        title="Remove widget"
        onClick={() => removeWidget(categoryId, widget.id)}
      >
        ×
      </button>

      <h3>{widget.name}</h3>
      <p>{widget.text}</p>
    </article>
  );
}