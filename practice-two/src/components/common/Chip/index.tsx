// Library
import classNames from 'classnames';
import { ReactNode } from 'react';

export interface IChipProps {
  color: CHIP_COLOR;
  icon?: ReactNode;
  label: string;
  customClasses?: string;
}

export enum CHIP_COLOR {
  FIRE = 'fire',
  BUG = 'bug',
  WATER = 'water',
  FLYING = 'flying',
  POISON = 'poison',
  NORMAL = 'normal',
  ROCK = 'rock',
  GROUND = 'ground',
  FIGHTING = 'fighting',
  GHOST = 'ghost',
  PSYCHIC = 'psychic',
  ICE = 'ice',
  DRAGON = 'dragon',
  DARK = 'dark',
  FAIRY = 'fairy',
  ELECTRIC = 'electric',
  STEEL = 'steel',
  GRASS = 'grass'
}

const chipDefault: string = 'inline-block rounded-full py-1 px-4 capitalize';

const colorClasses: { [key in CHIP_COLOR]: string } = {
  fire: 'bg-fire',
  bug: 'bg-bug',
  water: 'bg-water',
  flying: 'bg-flying',
  poison: 'bg-poison',
  normal: 'bg-normal',
  rock: 'bg-rock',
  ground: 'bg-ground',
  fighting: 'bg-fighting',
  ghost: 'bg-ghost',
  psychic: 'bg-psychic',
  ice: 'bg-ice',
  dragon: 'bg-dragon',
  dark: 'bg-dark',
  fairy: 'bg-fairy',
  electric: 'bg-electric',
  steel: 'bg-steel',
  grass: 'bg-grass'
};

/**
 * Chip Component
 * @param color - The background color of the chip.
 * @param icon - The icon to be displayed on the chip.
 * @param label - The content to be displayed inside the chip.
 *
 * @returns {JSX.Element} - The Chip component.
 */

const Chip = ({ color = CHIP_COLOR.NORMAL, icon, label = '', customClasses = '' }: IChipProps): JSX.Element => {
  const chipClasses: string = classNames([chipDefault, colorClasses[color], customClasses]);

  return (
    <div className={chipClasses}>
      {icon && <span className="chip-icon">{icon}</span>}
      <span className="chip-label">{label}</span>
    </div>
  );
};

export default Chip;
