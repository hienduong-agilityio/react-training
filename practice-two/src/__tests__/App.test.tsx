import { render } from '@testing-library/react';
import App from '../App';
import { PokemonProvider } from '@stores/PokemonProvider';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(
    <PokemonProvider>
      <App />
    </PokemonProvider>
  );
  expect(true).toBeTruthy();
});
