import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

test('Library page renders heading', async () => {
  render(
    <MemoryRouter initialEntries={['/library']}>
      <App />
    </MemoryRouter>
  );
  expect(await screen.findByRole('heading', { name: /Resource Library/i })).toBeInTheDocument();
});
