import React from 'react';

// PUBLIC_INTERFACE
export default function SearchBar({ placeholder = 'Search...', ariaLabel = 'Search', value, onChange }) {
  /** Accessible search input with icon styling. */
  return (
    <label className="searchbar" aria-label={ariaLabel}>
      <span aria-hidden="true" style={{color:'#6B7280'}}>🔎</span>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
      />
    </label>
  );
}
