// Libraries
import { JSX, memo } from 'react';

// Components
import { Tag } from '../../components';

interface IResourceTagProps {
  // resources: Optional string representing resources associated with the project.
  resources?: string;
}

/**
 * ResourceTag component
 *
 * @returns {JSX.Element} - ResourceTag element.
 */
const ResourceTag = ({ resources = '' }: IResourceTagProps): JSX.Element => {
  return (
    <div>
      {resources ? (
        <Tag customClasses='py-[3px] px-2'>{resources}</Tag>
      ) : (
        <Tag customClasses='cursor-pointer border-dashed border-2 border-primary-400 rounded-md py-[3px] px-[4px] hover:bg-gray-200'>
          <svg
            role='img'
            className='w-4 h-4 fill-current text-gray-500'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 22 20'
          >
            <path d='M10 5v5H5v2h5v5h2v-5h5v-2h-5V5h-2z' />
          </svg>
        </Tag>
      )}
    </div>
  );
};

export default memo(ResourceTag);
