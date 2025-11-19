import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

test('Goals page renders heading', async () => {
  render(
    <MemoryRouter initialEntries={['/goals']}>
      <App />
    </MemoryRouter>
  );
  expect(await screen.findByRole('heading', { name: /Goals/i })).toBeInTheDocument();
});
