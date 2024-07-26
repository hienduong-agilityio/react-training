import { CHIP_COLOR } from '@components/common/Chip';

const POKEMON_CHECKBOX_TYPES: {
  type: CHIP_COLOR;
  checked: boolean;
}[] = [
  { type: CHIP_COLOR.FIRE, checked: false },
  { type: CHIP_COLOR.BUG, checked: false },
  { type: CHIP_COLOR.WATER, checked: false },
  { type: CHIP_COLOR.FLYING, checked: false },
  { type: CHIP_COLOR.POISON, checked: false },
  { type: CHIP_COLOR.NORMAL, checked: false },
  { type: CHIP_COLOR.ROCK, checked: false },
  { type: CHIP_COLOR.GROUND, checked: false },
  { type: CHIP_COLOR.FIGHTING, checked: false },
  { type: CHIP_COLOR.GHOST, checked: false },
  { type: CHIP_COLOR.PSYCHIC, checked: false },
  { type: CHIP_COLOR.ICE, checked: false },
  { type: CHIP_COLOR.DRAGON, checked: false },
  { type: CHIP_COLOR.DARK, checked: false },
  { type: CHIP_COLOR.FAIRY, checked: false },
  { type: CHIP_COLOR.ELECTRIC, checked: false },
  { type: CHIP_COLOR.STEEL, checked: false },
  { type: CHIP_COLOR.GRASS, checked: false }
];

export { POKEMON_CHECKBOX_TYPES };
