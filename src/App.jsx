import { useState } from "react";
import Dashboard from "./components/Dashboard";
import AddWidgetDrawer from "./components/AddWidgetDrawer";
import { useDashboardStore } from "./store/dashboardStore";

export default function App() {
  const openDrawer = useDashboardStore((state) => state.openDrawer);
  const [globalSearch, setGlobalSearch] = useState("");

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">Dashboard V2</div>

        <input
          className="global-search"
          placeholder="Search anything..."
          value={globalSearch}
          onChange={(event) => setGlobalSearch(event.target.value)}
        />

        <div className="topbar-actions">
          <button className="primary-btn" onClick={() => openDrawer()}>
            Add Widget +
          </button>

          <select className="range-select" defaultValue="2d">
            <option value="2d">Last 2 days</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
      </header>

      <main className="main-content">
        <h1>CNAPP Dashboard</h1>
        <Dashboard searchQuery={globalSearch} />
      </main>

      <AddWidgetDrawer />
    </div>
  );
}