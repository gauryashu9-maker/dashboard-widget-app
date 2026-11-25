import { create } from "zustand";
import dashboardData from "../data/dashboard.json";

const clone = (value) => JSON.parse(JSON.stringify(value));

const initialCategories = clone(dashboardData.categories).map((category) => ({
  ...category,
  catalog: clone(category.widgets),
}));

export const useDashboardStore = create((set, get) => ({
  categories: initialCategories,
  isDrawerOpen: false,
  activeCategoryId: initialCategories[0]?.id ?? null,

  openDrawer: (categoryId) =>
    set((state) => ({
      isDrawerOpen: true,
      activeCategoryId:
        categoryId ||
        state.activeCategoryId ||
        state.categories[0]?.id ||
        null,
    })),

  closeDrawer: () => set({ isDrawerOpen: false }),

  setActiveCategory: (categoryId) => set({ activeCategoryId: categoryId }),

  removeWidget: (categoryId, widgetId) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter(
                (widget) => widget.id !== widgetId
              ),
            }
          : category
      ),
    })),

  setCategoryWidgets: (categoryId, widgets) =>
    set((state) => ({
      categories: state.categories.map((category) => {
        if (category.id !== categoryId) return category;

        const catalog = [...category.catalog];

        widgets.forEach((widget) => {
          if (!catalog.some((item) => item.id === widget.id)) {
            catalog.push(widget);
          }
        });

        return {
          ...category,
          widgets,
          catalog,
        };
      }),
    })),
}));