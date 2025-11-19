import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import useAsync from '../hooks/useAsync';
import { getGoals } from '../services/careers';

// PUBLIC_INTERFACE
export default function Goals() {
  /** Goals page tracking user progress. */
  const { data, loading, error, reload } = useAsync(getGoals, []);

  return (
    <div className="container">
      <SectionHeader
        title="Goals"
        description="Track your learning and career milestones."
        action={<Button variant="ghost" onClick={reload}>Refresh</Button>}
      />
      {loading && <p>Loading...</p>}
      {error && <p role="alert">Failed to load goals.</p>}
      <div className="card-grid">
        {(data || []).map((g) => (
          <div className="card-item" key={g.id}>
            <Card title={g.title} subtitle={`Progress: ${g.progress}%`}>
              <div aria-label="Progress bar" style={{background:'#E5E7EB', borderRadius:8, overflow:'hidden', height:10}}>
                <div style={{width:`${g.progress}%`, height:'100%', background:'linear-gradient(90deg, #1E3A8A, #F59E0B)'}} />
              </div>
              <div style={{marginTop:12}}>
                <Button>Update</Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
