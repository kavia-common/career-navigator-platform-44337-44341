import React, { useMemo, useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import useAsync from '../hooks/useAsync';
import { getGoals } from '../services/careers';

// PUBLIC_INTERFACE
export default function Goals() {
  /** Goals page tracking user progress with local add/edit/remove controls. */
  const { data, loading, error, reload } = useAsync(getGoals, []);
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Not started');

  React.useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const statuses = ['Not started','In progress','Done'];

  const addGoal = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const id = `g_${Date.now()}`;
    setItems(prev => [...prev, { id, title: title.trim(), progress: status === 'Done' ? 100 : status === 'In progress' ? 50 : 0, date }]);
    setTitle(''); setDate(''); setStatus('Not started');
  };

  const removeGoal = (id) => setItems(prev => prev.filter(g => g.id !== id));
  const updateProgress = (id, delta) => setItems(prev => prev.map(g => g.id === id ? { ...g, progress: Math.max(0, Math.min(100, g.progress + delta)) } : g));

  const sorted = useMemo(() => {
    return [...items].sort((a,b) => (a.date || '').localeCompare(b.date || ''));
  }, [items]);

  return (
    <div className="container">
      <SectionHeader
        title="Goals"
        description="Track your learning and career milestones."
        action={<Button variant="ghost" onClick={reload}>Reload mock</Button>}
      />

      <form onSubmit={addGoal} className="card" style={{padding:16, marginBottom:16, display:'grid', gap:8}}>
        <strong>Add a goal</strong>
        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr auto', gap:8}}>
          <input aria-label="Goal title" placeholder="Goal title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <input aria-label="Target date" type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
          <select aria-label="Status" value={status} onChange={(e)=>setStatus(e.target.value)}>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <Button type="submit">Add</Button>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p role="alert">Failed to load goals.</p>}
      <div className="card-grid">
        {sorted.map((g) => (
          <div className="card-item" key={g.id}>
            <Card title={g.title} subtitle={`${g.date ? `Target: ${g.date} • ` : ''}Progress: ${g.progress}%`}>
              <div aria-label="Progress bar" style={{background:'#E5E7EB', borderRadius:8, overflow:'hidden', height:10}}>
                <div style={{width:`${g.progress}%`, height:'100%', background:'linear-gradient(90deg, #1E3A8A, #F59E0B)'}} />
              </div>
              <div style={{marginTop:12, display:'flex', gap:8, flexWrap:'wrap'}}>
                <Button onClick={()=>updateProgress(g.id, +10)}>+10%</Button>
                <Button variant="ghost" onClick={()=>updateProgress(g.id, -10)}>-10%</Button>
                <Button variant="secondary" onClick={()=>removeGoal(g.id)}>Remove</Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
