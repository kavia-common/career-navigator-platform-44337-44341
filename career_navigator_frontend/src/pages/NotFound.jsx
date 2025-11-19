import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function NotFound() {
  /** Fallback 404 page. */
  return (
    <div className="container">
      <SectionHeader title="Page not found" description="We couldn't find what you're looking for." />
      <p>Return to the home page to continue exploring.</p>
      <Link to="/"><Button>Go home</Button></Link>
    </div>
  );
}
