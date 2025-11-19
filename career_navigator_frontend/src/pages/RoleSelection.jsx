import React, { useEffect, useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import useAsync from '../hooks/useAsync';
import api from '../services/apiClient';

// PUBLIC_INTERFACE
export default function RoleSelection({ onNext }) {
  /**
   * Role selection page: pick current/target roles, select competency model.
   * Fetches roles list and models from API (stubbed), displays dropdowns, advances on selection.
   */
  const [currentRole, setCurrentRole] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [competencyModel, setCompetencyModel] = useState('sfia');
  const [roles, setRoles] = useState([]);
  const [models, setModels] = useState(['SFIA']);

  useEffect(() => {
    let mounted = true;
    api.get('/roles')
      .then(r => { if (mounted) setRoles(Array.isArray(r) ? r : []); })
      .catch(() => { if (mounted) setRoles([]); });
    api.get('/competency-models')
      .then(m => { if (mounted && Array.isArray(m)) setModels(m); })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!currentRole || !targetRole) return;
    if (onNext) onNext({ currentRole, targetRole, competencyModel });
  }

  return (
    <div className="container">
      <SectionHeader
        title="Select Your Career Path"
        description="Choose your current role, desired target role, and competency model."
      />
      <form className="card" style={{padding: 16, display: 'grid', gap: 16, maxWidth: 480, margin: '0 auto'}} onSubmit={handleSubmit}>
        <label>
          Current Role
          <select
            value={currentRole}
            onChange={e => setCurrentRole(e.target.value)}
            required
            aria-label="Current role">
            <option value="">-- Choose --</option>
            {roles.map(role => (
              <option value={role} key={role}>{role}</option>
            ))}
          </select>
        </label>
        <label>
          Target Role
          <select
            value={targetRole}
            onChange={e => setTargetRole(e.target.value)}
            required
            aria-label="Target role">
            <option value="">-- Choose --</option>
            {roles.map(role => (
              <option value={role} key={role + '-t'}>{role}</option>
            ))}
          </select>
        </label>
        <label>
          Competency Model
          <select
            value={competencyModel}
            onChange={e => setCompetencyModel(e.target.value)}
            aria-label="Competency model">
            {models.map(m => (
              <option value={m.toLowerCase()} key={m}>{m}</option>
            ))}
          </select>
        </label>
        <Button type="submit" disabled={!currentRole || !targetRole}>Start Analysis</Button>
      </form>
    </div>
  );
}
