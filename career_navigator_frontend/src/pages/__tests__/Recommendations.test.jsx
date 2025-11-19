import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

test('Recommendations page renders heading', async () => {
  render(
    <MemoryRouter initialEntries={['/recommendations']}>
      <App />
    </MemoryRouter>
  );
  expect(await screen.findByRole('heading', { name: /Recommendations/i })).toBeInTheDocument();
});
