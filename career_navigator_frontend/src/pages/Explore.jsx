import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import useAsync from '../hooks/useAsync';
import { getExplore } from '../services/careers';

// PUBLIC_INTERFACE
export default function Explore() {
  /** Explore careers page showing featured and trending items. */
  const { data, loading, error, reload } = useAsync(getExplore, []);

  return (
    <div className="container">
      <SectionHeader
        title="Explore Careers"
        description="Discover roles, industries, and paths aligned with your interests."
        action={<Button variant="ghost" onClick={reload}>Refresh</Button>}
      />
      {loading && <p>Loading...</p>}
      {error && <p role="alert">Failed to load explore data.</p>}
      {data && (
        <>
          <h2 style={{margin:'8px 0'}}>Featured</h2>
          <div className="card-grid">
            {data.featured.map((c) => (
              <div className="card-item" key={c.id}>
                <Card title={c.title} subtitle={`Trend: ${c.trend}`}>
                  <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                    {c.tags.map(tag => (
                      <span key={tag} style={{background:'#EEF2FF', color:'#1E3A8A', padding:'4px 8px', borderRadius:6, fontSize:12}}>{tag}</span>
                    ))}
                  </div>
                  <div style={{marginTop:12}}>
                    <Button>View details</Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <h2 style={{margin:'16px 0 8px'}}>Trending</h2>
          <div className="card-grid">
            {data.trending.map((c) => (
              <div className="card-item" key={c.id}>
                <Card title={c.title} subtitle={`Trend: ${c.trend}`}>
                  <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                    {c.tags.map(tag => (
                      <span key={tag} style={{background:'#FEF3C7', color:'#92400E', padding:'4px 8px', borderRadius:6, fontSize:12}}>{tag}</span>
                    ))}
                  </div>
                  <div style={{marginTop:12}}>
                    <Button variant="secondary">Explore</Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
