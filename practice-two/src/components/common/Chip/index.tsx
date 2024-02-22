// Library
import classNames from 'classnames';
import { ReactNode } from 'react';

export interface IChipProps {
  color?: CHIP_COLOR;
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

const chipBackground: { [key in CHIP_COLOR]: string } = {
  fire: 'bg-fire-300',
  bug: 'bg-bug-300',
  water: 'bg-water-300',
  flying: 'bg-flying-300',
  poison: 'bg-poison-300',
  normal: 'bg-normal-300',
  rock: 'bg-rock-300',
  ground: 'bg-ground-300',
  fighting: 'bg-fighting-300',
  ghost: 'bg-ghost-300',
  psychic: 'bg-psychic-300',
  ice: 'bg-ice-300',
  dragon: 'bg-dragon-300',
  dark: 'bg-dark-300',
  fairy: 'bg-fairy-300',
  electric: 'bg-electric-300',
  steel: 'bg-steel-300',
  grass: 'bg-grass-300'
};

const chipDefault: string = 'inline-block rounded-full py-1 px-4 capitalize';

/**
 * Chip Component
 * @param color - The background color of the chip.
 * @param icon - The icon to be displayed on the chip.
 * @param label - The content to be displayed inside the chip.
 *
 * @returns {JSX.Element} - The Chip component.
 */

const Chip = ({ color = CHIP_COLOR.NORMAL, icon, label = '', customClasses = '' }: IChipProps): JSX.Element => {
  const chipClasses: string = classNames([chipDefault, chipBackground[color], customClasses]);

  return (
    <div className={chipClasses}>
      {icon && <span className="chip-icon">{icon}</span>}
      <span className="chip-label">{label}</span>
    </div>
  );
};

export default Chip;
