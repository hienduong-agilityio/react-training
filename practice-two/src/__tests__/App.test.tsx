// Library
import { render } from '@testing-library/react';

// Components
import App from '../App';

// Stores
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
