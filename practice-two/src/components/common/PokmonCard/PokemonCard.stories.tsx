import type { Meta, StoryObj } from '@storybook/react';
import PokemonCard from './index';
import { CHIP_COLOR } from '../Chip';

const meta = {
  title: 'Components/common/PokemonCard',
  component: PokemonCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof PokemonCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pokemonID: '1',
    pokemonName: 'pikachu',
    pokemonType: [CHIP_COLOR.FIRE, CHIP_COLOR.BUG],
    pokemonImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png'
  }
};
