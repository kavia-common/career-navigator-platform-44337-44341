import React from 'react';
import Button from './Button';

// PUBLIC_INTERFACE
export default function EmptyState({ title, description, actionLabel, onAction }) {
  /** Empty state display with optional action. */
  return (
    <div className="empty-state">
      <h2 style={{marginTop:0}}>{title}</h2>
      {description && <p style={{color:'#6B7280'}}>{description}</p>}
      {actionLabel && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
