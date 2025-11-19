import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import useAsync from '../hooks/useAsync';
import { getRecommendations } from '../services/careers';

// PUBLIC_INTERFACE
export default function Recommendations() {
  /** Personalized recommendations page. */
  const { data, loading, error, reload } = useAsync(getRecommendations, []);

  return (
    <div className="container">
      <SectionHeader
        title="Recommendations"
        description="Personalized career paths and roles you might like."
        action={<Button variant="ghost" onClick={reload}>Refresh</Button>}
      />
      {loading && <p>Loading...</p>}
      {error && <p role="alert">Failed to load recommendations.</p>}
      <div className="card-grid">
        {(data || []).map((rec) => (
          <div className="card-item" key={rec.id}>
            <Card title={rec.title} subtitle={rec.reason}>
              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                {rec.tags.map(tag => (
                  <span key={tag} style={{background:'#E0F2FE', color:'#075985', padding:'4px 8px', borderRadius:6, fontSize:12}}>{tag}</span>
                ))}
              </div>
              <div style={{marginTop:12, display:'flex', gap:8}}>
                <Button>Save</Button>
                <Button variant="secondary">Learn more</Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
