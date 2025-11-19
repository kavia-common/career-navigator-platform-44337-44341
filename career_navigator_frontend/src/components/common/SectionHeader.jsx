import React from 'react';

// PUBLIC_INTERFACE
export default function SectionHeader({ title, description, action }) {
  /** Section header with title, description, and optional right-aligned action. */
  return (
    <div className="section-header">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
