import React from 'react';

// PUBLIC_INTERFACE
export default function Card({ title, subtitle, actions, children }) {
  /** Card component with title, subtitle, actions, and content area. */
  return (
    <div className="card" style={{padding:16}}>
      {(title || actions) && (
        <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:8}}>
          <div>
            {title && <h3 style={{margin:'0 0 4px 0'}}>{title}</h3>}
            {subtitle && <p style={{margin:0, color:'#6B7280'}}>{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  );
}
