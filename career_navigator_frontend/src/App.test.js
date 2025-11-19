import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

test('renders Explore page at root', async () => {
  renderAt('/');
  expect(await screen.findByRole('heading', { name: /Explore Careers/i })).toBeInTheDocument();
});

test('renders Recommendations page', async () => {
  renderAt('/recommendations');
  expect(await screen.findByRole('heading', { name: /Recommendations/i })).toBeInTheDocument();
});

test('renders Library page', async () => {
  renderAt('/library');
  expect(await screen.findByRole('heading', { name: /Resource Library/i })).toBeInTheDocument();
});

test('renders Goals page', async () => {
  renderAt('/goals');
  expect(await screen.findByRole('heading', { name: /Goals/i })).toBeInTheDocument();
});

test('renders 404 for unknown route', async () => {
  renderAt('/unknown');
  expect(await screen.findByRole('heading', { name: /Page not found/i })).toBeInTheDocument();
});
