import React, { useEffect, useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import api from '../services/apiClient';

// PUBLIC_INTERFACE
export default function GapAnalysis({ currentRole, targetRole, competencyModel }) {
  /**
   * Gap analysis page: fetch and compare skills for roles, highlight strengths/gaps, call /skills and /gap-analysis API.
   */
  const [loading, setLoading] = useState(true);
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  // Initial fetch: Get required skills for target role & user's skills (stub)
  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get('/skills?role=' + encodeURIComponent(targetRole || '')),
      api.get('/skills?role=' + encodeURIComponent(currentRole || '')),
    ]).then(([req, user]) => {
      setRequiredSkills(Array.isArray(req) ? req : []);
      setUserSkills(Array.isArray(user) ? user : []);
      return api.post('/gap-analysis', { required: req, user });
    }).then(ga => setAnalysis(ga))
      .finally(() => setLoading(false));
  }, [currentRole, targetRole]);

  return (
    <div className="container">
      <SectionHeader
        title="Skill Gap Analysis"
        description={`Comparing your current skills with those required for ${targetRole || 'target role'}.`}
      />
      {loading && <p>Loading gap analysis...</p>}
      {!loading && analysis && (
        <div className="card" style={{padding:16, marginTop:16}}>
          <h3>Gap Overview</h3>
          <ul>
            {analysis.strengths && analysis.strengths.length > 0 && (
              <li>
                <strong>Strengths:</strong>
                <ul>
                  {analysis.strengths.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
              </li>
            )}
            {analysis.gaps && analysis.gaps.length > 0 && (
              <li>
                <strong>Skill Gaps:</strong>
                <ul>
                  {analysis.gaps.map(skill => <li key={skill} style={{color:'#DC2626'}}>{skill}</li>)}
                </ul>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
