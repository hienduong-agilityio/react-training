// Libraries
import classNames from 'classnames';
import { memo } from 'react';

// Utils
import { getNamePlaceholder } from '@/helper/nameAbbreviation';

export interface IAvatarProps {
  // name: The name of the person.
  name: string;
  // src: The avatar URL.
  src?: string;
  // customClass: Custom variant class for the Avatar.
  customClass?: string;
}

const defaultClasses: string =
  'inline-flex border-2 border-gray-100 items-center justify-center w-10 h-10 overflow-hidden bg-primary-0';

/**
 * Avatar component
 *
 * @returns {JSX.Element} - Avatar element.
 */
const Avatar = ({ name, src, customClass = 'rounded-xl' }: IAvatarProps): JSX.Element => {
  const avatarClasses: string = classNames(defaultClasses, customClass);
  const placeholderText = getNamePlaceholder(name);

  return (
    <div className={avatarClasses}>
      {src ? (
        <img src={src} alt={`${name} avatar`} />
      ) : (
        <span className='font-bold text-primary-500'>{placeholderText}</span>
      )}
    </div>
  );
};

export default memo(Avatar);
