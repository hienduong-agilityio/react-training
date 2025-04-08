// Libraries
import classNames from 'classnames';
import { JSX, memo } from 'react';

// Utils
import { getNamePlaceholder } from '../../helpers';

export interface IAvatarProps {
  // name: The name of the person.
  name: string;
  // src: The avatar URL.
  src?: string;
  // customClass: Custom variant class for the Avatar.
  customClass?: string;
}

const defaultClasses: string =
  'inline-flex border-2 border-gray-100 items-center justify-center overflow-hidden bg-primary-0 rounded-lg';

/**
 * Avatar component
 *
 * @returns {JSX.Element} - Avatar element.
 */
const Avatar = ({ name = '', src = '', customClass = '' }: IAvatarProps): JSX.Element => {
  const avatarClasses: string = classNames(defaultClasses, customClass);
  const placeholderText = getNamePlaceholder(name);

  return (
    <div className={avatarClasses}>
      {src ? (
        <img src={src} alt={`${name} avatar`} className='h-full w-full object-cover' />
      ) : (
        <span className='font-bold text-xs text-primary-500'>{placeholderText}</span>
      )}
    </div>
  );
};

export default memo(Avatar);
