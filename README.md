# CNAPP Dashboard — Widget Management App

A dynamic, JSON-driven CNAPP dashboard built with **React + Vite + Zustand**.
Categories and widgets are rendered from a JSON config, and users can **add, remove, toggle, and search** widgets per category — all persisted locally via a Zustand store.

Built as a submission for the **Frontend Trainee** assignment.

---

## 📋 Assignment Requirements Coverage

| # | Requirement | Status | Where |
|---|-------------|--------|-------|
| 1 | Dashboard built dynamically from JSON (categories → widgets) | ✅ | `src/data/dashboard.json` |
| 2 | Users can add / remove a widget from a category | ✅ | `AddWidgetDrawer.jsx`, `WidgetCard.jsx`, `dashboardStore.js` |
| 3 | Individual widget shows random/placeholder text | ✅ | `widget.text` field in JSON |
| 4 | "Add Widget" opens a form to create a widget (name + text) | ✅ | Form in `AddWidgetDrawer.jsx` |
| 5 | Remove widget via a cross (×) icon **or** uncheck from the category list | ✅ | `WidgetCard.jsx` (×), drawer checkbox list |
| 6 | Search across all widgets | ✅ | Global search bar (`App.jsx`) + drawer search (`AddWidgetDrawer.jsx`) |
| 7 | Built with React or Angular | ✅ | React 18/19 |
| 8 | Store management for add/remove (local state) | ✅ | Zustand — `src/store/dashboardStore.js` |
| 9 | Code shared via GitHub / zip | ✅ | This repo |
| 10 | Steps to run locally | ✅ | [Getting Started](#-getting-started) |

---

## ✨ Features

- **Dynamic rendering** — all categories and widgets come from `src/data/dashboard.json`
- **Add widgets** — open the drawer, check widgets to include in a category, or create a new custom widget
- **Remove widgets** — hover any widget and click the **×** icon, or uncheck it from the drawer list
- **Per-category widget lists** — each category has an independent set of widgets
- **Global search** — filters widgets across all categories in real time
- **Drawer search** — filters the widget catalog inside the Add Widget panel
- **Custom widget creation** — add a widget with a custom name and text
- **Responsive layout** — 3-column grid on desktop → 2 on tablet → 1 on mobile
- **Zustand store** — lightweight, no boilerplate, no extra dependencies

---

## 🛠 Tech Stack

| Layer | Choice |
|---|---|
| Framework | React |
| Build tool | Vite |
| State management | Zustand |
| Styling | Plain CSS (`src/styles.css`) |
| Language | JavaScript (ES modules) |

No UI library, no Tailwind, no CSS-in-JS — just React and CSS, to keep the submission small and reviewable.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher — check with `node -v`
- **npm** (bundled with Node) — check with `npm -v`

### 1. Clone the repository

```bash
git clone https://github.com/gauryashu9-maker/dashboard-widget-app.git
cd dashboard-widget-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the app

Visit **http://localhost:5173** in your browser.

You should see the CNAPP dashboard with three categories (`CSPM`, `CWPP`, `Registry Scan`), each with widgets and a `+ Add Widget` button.

---

## 🏗 Build for Production

```bash
npm run build      # generates ./dist
npm run preview    # serves the production build on http://localhost:4173
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with HMR at `http://localhost:5173` |
| `npm run build` | Build a production bundle into `dist/` |
| `npm run preview` | Preview the production build locally at `http://localhost:4173` |
| `npm run lint` | Run ESLint over the source |

---

## 📁 Project Structure

```txt
dashboard-widget-app/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx                       # App entry point
    ├── App.jsx                        # Layout: header + dashboard
    ├── styles.css                     # Global styles (CSS, no framework)
    ├── data/
    │   └── dashboard.json             # Source of truth: categories + widgets
    ├── store/
    │   └── dashboardStore.js          # Zustand store (add/remove/open drawer)
    └── components/
        ├── Dashboard.jsx              # Renders all categories, applies global search
        ├── CategorySection.jsx        # One category: heading + widget grid
        ├── WidgetCard.jsx             # One widget: name, text, × remove button
        └── AddWidgetDrawer.jsx        # Slide-in panel: tabs, checkboxes, search, create form
```

---

## 🧠 How It Works

### 1. JSON-driven rendering

The entire dashboard is described in `src/data/dashboard.json`:

```json
{
  "categories": [
    {
      "id": "cspm",
      "title": "CSPM Executive Dashboard",
      "tabLabel": "CSPM",
      "widgets": [
        { "id": "cloud-accounts", "name": "Cloud Accounts", "text": "2 Total" }
      ]
    }
  ]
}
```

Adding a new category or seed widget **requires no code changes** — edit the JSON and reload.

### 2. Zustand store

`src/store/dashboardStore.js` holds:

- `categories` — current state of the dashboard
- `isDrawerOpen`, `activeCategoryId` — drawer UI state
- `removeWidget(categoryId, widgetId)` — remove a widget from a category
- `setCategoryWidgets(categoryId, widgets)` — replace a category's widget set (used by Confirm)
- `openDrawer`, `closeDrawer`, `setActiveCategory` — drawer controls

Each category also carries a `catalog` array — the full list of widgets it can show — so widgets removed from the dashboard can be re-added later by unchecking/rechecking in the drawer.

### 3. Add Widget flow

1. User clicks `+ Add Widget` on a category (or the header button)
2. `openDrawer(categoryId)` sets `activeCategoryId` and opens the panel
3. The drawer shows tabs for each category, a search box, and a checkbox list of the active category's catalog
4. The user:
   - checks/unchecks widgets, **and/or**
   - fills the "Create new widget" form to add a custom widget to the catalog
5. **Confirm** → `setCategoryWidgets(categoryId, selectedWidgets)` updates state → drawer closes → dashboard re-renders

### 4. Remove Widget flow

- **Hover a widget** → a red `×` appears → click it → `removeWidget(categoryId, widgetId)` fires
- Or: open the drawer, **uncheck** the widget, click **Confirm**

### 5. Search

- **Global search** in the header filters widgets across all categories live (see `Dashboard.jsx`)
- **Drawer search** filters the widget catalog inside the Add Widget panel

---

## 🎨 Design Notes

- No state management library other than Zustand — kept intentionally lightweight
- No UI framework — a single `styles.css` file, so the reviewer can see all styling in one place
- Fully controlled component state — no `useRef` hacks, no DOM manipulation
- Accessible: semantic `<section>`, `<article>`, `<button>`, labelled inputs
- Removal is guarded with a `title` tooltip for clarity

---

## 🧪 Manual Test Checklist

Use this to verify the app after cloning:

- [ ] Dashboard loads with 3 categories and 6 seeded widgets
- [ ] Hover a widget → `×` appears → clicking removes the widget
- [ ] Click `+ Add Widget` → drawer opens on the correct category
- [ ] Uncheck a widget → **Confirm** → widget disappears from the dashboard
- [ ] Create a custom widget (name + text) → **Confirm** → it appears in the category
- [ ] Global search filters widgets in real time
- [ ] Drawer search filters the widget catalog
- [ ] Resize window → grid collapses 3 → 2 → 1 column

---

## 📝 License

This project is submitted for evaluation purposes only.

---

## 👤 Author

**<Yashu Gaur>**
- GitHub: (https://github.com/<gauryashu9-maker)
- Submitted for: Frontend Trainee role
- Link: https://github.com/gauryashu9-maker/dashboard-widget-app.git