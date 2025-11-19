import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TopNav from './components/layout/TopNav';
import Sidebar from './components/layout/Sidebar';
import Explore from './pages/Explore';
import Recommendations from './pages/Recommendations';
import Library from './pages/Library';
import Goals from './pages/Goals';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './store/simpleStore';
import RoleSelection from './pages/RoleSelection';
import GapAnalysis from './pages/GapAnalysis';
import MindMap from './pages/MindMap';

/* PUBLIC_INTERFACE */
function AppShell() {
  /** App shell combining TopNav, Sidebar, and main content outlet with routing and accessible skip target. Routes: /, /recommendations, /library, /goals. */
  return (
    <div className="app-shell">
      <div className="topnav">
        <TopNav />
      </div>
      <aside className="sidebar" aria-label="Sidebar navigation">
        <Sidebar />
      </aside>
      <main className="content" id="main-content" tabIndex="-1" aria-live="polite">
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/library" element={<Library />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/select-roles" element={<RoleSelection />} />
          <Route path="/gap-analysis" element={<GapAnalysis />} />
          <Route path="/mind-map" element={<MindMap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Root app with BrowserRouter and ThemeProvider. */
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
