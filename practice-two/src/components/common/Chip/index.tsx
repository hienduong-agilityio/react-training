import { ReactNode } from 'react';

export interface IChipProps {
  color: '';
  size: '';
  icon: ReactNode;
  label: string;
}
/**
 * Chip Component
 * @param color - The background color of the chip.
 * @param size - The size of the chip. Possible values: 'small', 'medium'.
 * @param variant - The style possible values: 'solid', 'plain', 'outlined', 'soft'.
 * @param icon - The icon to be displayed on the chip.
 * @param label - The content to be displayed inside the chip.
 * @returns {JSX.Element} - The Chip component.
 */
const Chip = ({ color = '', size = '', icon, label }: IChipProps): JSX.Element => {
  const chipStyles = {
    backgroundColor: disabled ? 'gray' : color,
    fontSize: size === 'small' ? '0.8rem' : '1rem'
  };

  return (
    <div className={chipClasses} style={chipStyles}>
      {icon && <span className="chip-icon">{icon}</span>}
      <span className="chip-label">{label}</span>
    </div>
  );
};

export default Chip;
