import { useEffect, useMemo, useState } from "react";
import { useDashboardStore } from "../store/dashboardStore";

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default function AddWidgetDrawer() {
  const {
    categories,
    isDrawerOpen,
    activeCategoryId,
    closeDrawer,
    setActiveCategory,
    setCategoryWidgets,
  } = useDashboardStore();

  const activeCategory = categories.find(
    (category) => category.id === activeCategoryId
  );

  const [selectedIds, setSelectedIds] = useState([]);
  const [draftWidgets, setDraftWidgets] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (!isDrawerOpen || !activeCategory) return;

    setSelectedIds(activeCategory.widgets.map((widget) => widget.id));
    setDraftWidgets([]);
    setSearch("");
    setName("");
    setText("");
  }, [isDrawerOpen, activeCategoryId]);

  const catalog = useMemo(() => {
    if (!activeCategory) return [];

    const allWidgets = [...activeCategory.catalog, ...draftWidgets];
    const seen = new Set();

    return allWidgets.filter((widget) => {
      if (seen.has(widget.id)) return false;
      seen.add(widget.id);
      return true;
    });
  }, [activeCategory, draftWidgets]);

  const filteredCatalog = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return catalog;

    return catalog.filter(
      (widget) =>
        widget.name.toLowerCase().includes(query) ||
        (widget.text || "").toLowerCase().includes(query)
    );
  }, [catalog, search]);

  if (!isDrawerOpen) return null;

  const toggleWidget = (widgetId) => {
    setSelectedIds((previous) =>
      previous.includes(widgetId)
        ? previous.filter((id) => id !== widgetId)
        : [...previous, widgetId]
    );
  };

  const handleAddNewWidget = (event) => {
    event.preventDefault();

    if (!name.trim()) return;

    const newWidget = {
      id: `custom-${createId()}`,
      name: name.trim(),
      text: text.trim() || "Custom widget",
    };

    setDraftWidgets((previous) => [...previous, newWidget]);
    setSelectedIds((previous) => [...previous, newWidget.id]);
    setName("");
    setText("");
  };

  const handleConfirm = () => {
    const selectedWidgets = catalog.filter((widget) =>
      selectedIds.includes(widget.id)
    );

    setCategoryWidgets(activeCategoryId, selectedWidgets);
    closeDrawer();
  };

  return (
    <div className="drawer-overlay">
      <aside className="drawer">
        <div className="drawer-header">
          <h2>Add Widget</h2>
          <button className="icon-btn" onClick={closeDrawer}>
            ×
          </button>
        </div>

        <p className="drawer-subtitle">
          Personalise your dashboard by adding the following widget
        </p>

        <div className="drawer-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={
                category.id === activeCategoryId ? "tab active" : "tab"
              }
              onClick={() => setActiveCategory(category.id)}
            >
              {category.tabLabel || category.title}
            </button>
          ))}
        </div>

        <input
          className="drawer-search"
          placeholder="Search widgets..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="widget-list">
          {filteredCatalog.length === 0 && (
            <p className="empty-state">No widgets found.</p>
          )}

          {filteredCatalog.map((widget) => (
            <label key={widget.id} className="widget-list-item">
              <input
                type="checkbox"
                checked={selectedIds.includes(widget.id)}
                onChange={() => toggleWidget(widget.id)}
              />
              <span>
                <strong>{widget.name}</strong>
                <small>{widget.text}</small>
              </span>
            </label>
          ))}
        </div>

        <form className="new-widget-form" onSubmit={handleAddNewWidget}>
          <h3>Create new widget</h3>

          <input
            placeholder="Widget name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <textarea
            placeholder="Widget text"
            rows={2}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />

          <button type="submit" className="secondary-btn">
            Add to list
          </button>
        </form>

        <div className="drawer-footer">
          <button className="ghost-btn" onClick={closeDrawer}>
            Cancel
          </button>
          <button className="primary-btn" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </aside>
    </div>
  );
}