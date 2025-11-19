import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

test('Explore page renders heading', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(await screen.findByRole('heading', { name: /Explore Careers/i })).toBeInTheDocument();
});
