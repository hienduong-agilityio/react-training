import { render } from '@testing-library/react';
import App from '../App';
import { AppProvider } from '../context/PokemonProvider';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(
    <AppProvider>
      <App />
    </AppProvider>
  );
  expect(true).toBeTruthy();
});
