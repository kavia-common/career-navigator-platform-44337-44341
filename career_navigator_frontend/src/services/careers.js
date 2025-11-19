const delay = (ms) => new Promise(res => setTimeout(res, ms));

const sampleCareers = [
  { id: 'data-analyst', title: 'Data Analyst', trend: 'growing', tags: ['SQL','Python','Tableau'] },
  { id: 'frontend-dev', title: 'Frontend Developer', trend: 'steady', tags: ['React','CSS','Accessibility'] },
  { id: 'product-manager', title: 'Product Manager', trend: 'growing', tags: ['Roadmaps','Stakeholders','Metrics'] },
  { id: 'cloud-engineer', title: 'Cloud Engineer', trend: 'growing', tags: ['AWS','IaC','Security'] },
  { id: 'ux-designer', title: 'UX Designer', trend: 'steady', tags: ['Figma','Research','Prototyping'] },
  { id: 'ml-engineer', title: 'ML Engineer', trend: 'emerging', tags: ['PyTorch','MLOps','Data Pipelines'] },
];

const sampleResources = [
  { id: 'r1', title: 'SQL for Data Analysis', type: 'Course', source: 'Coursera' },
  { id: 'r2', title: 'React Official Docs', type: 'Docs', source: 'react.dev' },
  { id: 'r3', title: 'Designing for Accessibility', type: 'Article', source: 'W3C' },
];

const sampleGoals = [
  { id: 'g1', title: 'Complete React fundamentals', progress: 60 },
  { id: 'g2', title: 'Build a portfolio project', progress: 30 },
  { id: 'g3', title: 'Earn AWS Cloud Practitioner', progress: 10 },
];

// PUBLIC_INTERFACE
export async function getExplore() {
  /** Returns mock exploration data: featured careers and trending topics. */
  await delay(200);
  return {
    featured: sampleCareers.slice(0, 3),
    trending: sampleCareers.slice(3, 6),
  };
}

// PUBLIC_INTERFACE
export async function getRecommendations() {
  /** Returns mock personalized recommendations with reasons. */
  await delay(250);
  return sampleCareers.slice(0, 4).map((c, idx) => ({
    ...c,
    reason: idx % 2 ? 'Based on your interest in web development' : 'People with your skills viewed this',
  }));
}

// PUBLIC_INTERFACE
export async function getResources() {
  /** Returns mock learning resources library. */
  await delay(180);
  return sampleResources;
}

// PUBLIC_INTERFACE
export async function getGoals() {
  /** Returns mock user goals. */
  await delay(150);
  return sampleGoals;
}
