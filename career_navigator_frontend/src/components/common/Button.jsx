import React from 'react';

// PUBLIC_INTERFACE
export default function Button({ variant = 'primary', children, ...props }) {
  /** Button component supporting primary, secondary, and ghost variants. */
  const className = `btn ${variant === 'secondary' ? 'secondary' : variant === 'ghost' ? 'ghost' : ''}`;
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
