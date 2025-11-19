import React from 'react';
import logo from '../../assets/logo.svg';
import SearchBar from '../common/SearchBar';
import UserMenu from '../profile/UserMenu';

// PUBLIC_INTERFACE
export default function TopNav() {
  /** Top navigation with brand/logo, centered search bar, and right-aligned user menu. */
  return (
    <nav className="container" aria-label="Top navigation" style={{display:'flex', alignItems:'center', gap:16, height:64}}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <img src={logo} alt="Career Navigator logo" height={28} />
        <strong style={{color:'var(--color-primary)'}}>Career Navigator</strong>
      </div>
      <div style={{flex:1, maxWidth:640, margin:'0 auto'}}>
        <SearchBar placeholder="Search careers, skills, industries..." ariaLabel="Global search" />
      </div>
      <div>
        <UserMenu />
      </div>
    </nav>
  );
}
