import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import useAsync from '../hooks/useAsync';
import { getResources } from '../services/careers';

// PUBLIC_INTERFACE
export default function Library() {
  /** Resource library page with learning materials. */
  const { data, loading, error, reload } = useAsync(getResources, []);

  return (
    <div className="container">
      <SectionHeader
        title="Resource Library"
        description="Curated learning materials to grow your skills."
        action={<Button variant="ghost" onClick={reload}>Refresh</Button>}
      />
      {loading && <p>Loading...</p>}
      {error && <p role="alert">Failed to load resources.</p>}
      {!loading && data && data.length === 0 && (
        <EmptyState title="No resources yet" description="Check back later for new content." />
      )}
      <div className="card-grid">
        {(data || []).map((r) => (
          <div className="card-item" key={r.id}>
            <Card title={r.title} subtitle={`${r.type} • ${r.source}`}>
              <div style={{display:'flex', gap:8, alignItems:'center', justifyContent:'space-between'}}>
                <span className={`badge ${r.type === 'Course' ? 'success' : r.type === 'Article' ? 'warn' : 'info'}`}>{r.type}</span>
                <a href="#" onClick={(e)=>e.preventDefault()} aria-label={`Open ${r.title}`} className="btn secondary">Open</a>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
