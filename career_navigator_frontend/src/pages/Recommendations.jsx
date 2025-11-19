import React, { useMemo, useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import useAsync from '../hooks/useAsync';
import { getRecommendations } from '../services/careers';

// PUBLIC_INTERFACE
export default function Recommendations() {
  /** Personalized recommendations page with mock profile context, filters and sort controls. */
  const { data, loading, error, reload } = useAsync(getRecommendations, []);
  const [onlyGrowing, setOnlyGrowing] = useState(false);
  const [sortBy, setSortBy] = useState('title');

  const interests = ['Web Development', 'Data', 'UX'];
  const skills = ['React', 'Python', 'SQL'];

  const filtered = useMemo(() => {
    const list = (data || []).filter(r => (onlyGrowing ? r.trend === 'growing' || r.trend === 'emerging' : true));
    return [...list].sort((a,b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'trend') return String(a.trend).localeCompare(String(b.trend));
      return 0;
    });
  }, [data, onlyGrowing, sortBy]);

  return (
    <div className="container">
      <SectionHeader
        title="Recommendations"
        description="Personalized career paths and roles you might like."
        action={<Button variant="ghost" onClick={reload}>Refresh</Button>}
      />

      <div className="card" style={{padding:16, marginBottom:16}}>
        <strong>Your profile (mock)</strong>
        <div style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:8}}>
          <div>
            <div style={{fontSize:12, color:'#6B7280'}}>Interests</div>
            <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              {interests.map(i => <span key={i} className="badge info">{i}</span>)}
            </div>
          </div>
          <div>
            <div style={{fontSize:12, color:'#6B7280'}}>Skills</div>
            <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              {skills.map(s => <span key={s} className="badge success">{s}</span>)}
            </div>
          </div>
        </div>
      </div>

      <div style={{display:'flex', gap:12, alignItems:'center', marginBottom:12, flexWrap:'wrap'}}>
        <label style={{display:'flex', alignItems:'center', gap:6}}>
          <input type="checkbox" checked={onlyGrowing} onChange={(e)=>setOnlyGrowing(e.target.checked)} />
          Growing/Emerging only
        </label>
        <label style={{display:'flex', alignItems:'center', gap:6}}>
          Sort by
          <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
            <option value="title">Title</option>
            <option value="trend">Trend</option>
          </select>
        </label>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p role="alert">Failed to load recommendations.</p>}
      <div className="card-grid">
        {filtered.map((rec) => (
          <div className="card-item" key={rec.id}>
            <Card title={rec.title} subtitle={`${rec.reason} • Trend: ${rec.trend}`}>
              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                {rec.tags.map(tag => (
                  <span key={tag} className="badge info">{tag}</span>
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
