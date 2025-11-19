import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../router/Routes';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Sidebar navigation with collapsible behavior on mobile. */
  const [open, setOpen] = useState(true);

  // Show toggle on small screens by default
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const apply = () => setOpen(!mq.matches); // closed when small
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `navlink ${isActive ? 'nav-active' : ''}`;

  return (
    <div style={{padding:12}}>
      <button
        className="btn ghost"
        aria-expanded={open}
        aria-controls="sidebar-nav"
        onClick={() => setOpen(o => !o)}
        style={{width:'100%', marginBottom:12, display:'block'}}
      >
        ☰ Menu
      </button>

      <nav id="sidebar-nav" aria-label="Primary sections" style={{display: open ? 'block' : 'none'}}>
        <ul style={{listStyle:'none', padding:0, margin:0, display:'grid', gap:6}}>
          <li><NavLink to={ROUTES.explore} className={navLinkClass}>🏝️ Explore</NavLink></li>
          <li><NavLink to={ROUTES.recommendations} className={navLinkClass}>✨ Recommendations</NavLink></li>
          <li><NavLink to={ROUTES.library} className={navLinkClass}>📚 Library</NavLink></li>
          <li><NavLink to={ROUTES.goals} className={navLinkClass}>🎯 Goals</NavLink></li>
        </ul>
      </nav>
    </div>
  );
}
