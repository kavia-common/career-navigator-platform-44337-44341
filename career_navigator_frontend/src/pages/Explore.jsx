import React, { useMemo, useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import useAsync from '../hooks/useAsync';
import { getExplore } from '../services/careers';

// PUBLIC_INTERFACE
export default function Explore() {
  /** Explore careers page showing featured and trending items with search, filters, and a details drawer placeholder. */
  const { data, loading, error, reload } = useAsync(getExplore, []);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [openId, setOpenId] = useState(null);

  const categories = ['All', 'Tech', 'Healthcare', 'Business'];

  const filterFn = (c) => {
    const q = query.trim().toLowerCase();
    const matchQ = !q || c.title.toLowerCase().includes(q) || c.tags.some(t => t.toLowerCase().includes(q));
    const matchCat = category === 'All' || (category === 'Tech' && ['sql','python','react','pytorch','css'].some(k => c.tags.join(' ').toLowerCase().includes(k)))
      || (category === 'Healthcare' && c.tags.join(' ').toLowerCase().includes('research'))
      || (category === 'Business' && (c.title.toLowerCase().includes('product') || c.tags.join(' ').toLowerCase().includes('metrics')));
    return matchQ && matchCat;
  };

  const featured = useMemo(() => (data ? data.featured.filter(filterFn) : []), [data, query, category]);
  const trending = useMemo(() => (data ? data.trending.filter(filterFn) : []), [data, query, category]);

  return (
    <div className="container">
      <SectionHeader
        title="Explore Careers"
        description="Discover roles, industries, and paths aligned with your interests."
        action={<Button variant="ghost" onClick={reload}>Refresh</Button>}
      />
      <div style={{display:'flex', gap:12, alignItems:'center', marginBottom:16, flexWrap:'wrap'}}>
        <div style={{flex:1, minWidth:240}}>
          <SearchBar
            placeholder="Search careers, skills, industries..."
            ariaLabel="Search careers"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div role="group" aria-label="Category filters" style={{display:'flex', gap:8, flexWrap:'wrap'}}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`btn ${category === cat ? '' : 'ghost'}`}
              aria-pressed={category === cat}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p role="alert">Failed to load explore data.</p>}
      {data && (
        <>
          <h2 style={{margin:'8px 0'}}>Featured</h2>
          <div className="card-grid">
            {featured.map((c) => (
              <div className="card-item" key={c.id}>
                <Card title={c.title} subtitle={`Trend: ${c.trend}`}>
                  <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                    {c.tags.map(tag => (
                      <span key={tag} className="badge primary">{tag}</span>
                    ))}
                  </div>
                  <div style={{marginTop:12}}>
                    <Button onClick={() => setOpenId(c.id)}>View details</Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <h2 style={{margin:'16px 0 8px'}}>Trending</h2>
          <div className="card-grid">
            {trending.map((c) => (
              <div className="card-item" key={c.id}>
                <Card title={c.title} subtitle={`Trend: ${c.trend}`}>
                  <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                    {c.tags.map(tag => (
                      <span key={tag} className="badge warn">{tag}</span>
                    ))}
                  </div>
                  <div style={{marginTop:12}}>
                    <Button variant="secondary" onClick={() => setOpenId(c.id)}>Explore</Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <aside className={`drawer ${openId ? 'open' : ''}`} aria-hidden={!openId} aria-label="Career details panel">
            <div className="drawer-header">
              <strong>Career details</strong>
              <button className="btn ghost" onClick={() => setOpenId(null)} aria-label="Close details">Close</button>
            </div>
            <div style={{padding:16}}>
              {openId ? (
                <>
                  <p style={{marginTop:0}}>This is a placeholder for the details view. Integrate with API later to fetch description, salary ranges, and career path information.</p>
                  <ul>
                    <li>Operation: GET {`/careers/${openId}`}</li>
                    <li>Base URL: from env REACT_APP_API_BASE or REACT_APP_BACKEND_URL</li>
                  </ul>
                </>
              ) : null}
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
