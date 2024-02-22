import { render } from '@testing-library/react';
import PokemonCard from './index';
import { CHIP_COLOR } from '../Chip';
import '@testing-library/jest-dom';

describe('PokemonCard component', () => {
  const mockProps = {
    pokemonID: '001',
    pokemonName: 'Bulbasaur',
    pokemonType: [CHIP_COLOR.GRASS, CHIP_COLOR.POISON],
    pokemonImg: 'https://example.com/bulbasaur.png'
  };

  it('renders correctly with given props', () => {
    const { asFragment, getByText, getByAltText } = render(<PokemonCard {...mockProps} />);

    // Check if the name is rendered
    expect(getByText('Bulbasaur')).toBeInTheDocument();

    // Check if the ID is rendered
    expect(getByText('#001')).toBeInTheDocument();

    // Check if the image is rendered
    expect(getByAltText('Bulbasaur')).toBeInTheDocument();

    // Check if the chips for types are rendered
    expect(getByText('grass')).toBeInTheDocument();
    expect(getByText('poison')).toBeInTheDocument();

    // Update snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
