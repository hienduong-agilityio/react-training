// Library
import { JSX, memo } from 'react';
import { Link } from 'react-router-dom';

// Components
import { ProjectOptionsDropdown, CurrencyText, ResourceTag, Timeline, StatusLabel, Avatar } from '../../components';

// Enums
import { STATUS } from '../../enums';

// Constants
import { ROUTE } from '../../constants';

// Helper
import { getColorFromStatus } from '../../helpers';

// Types
import type { IProjectItemProps } from '../../interfaces';

export interface IProjectItem extends IProjectItemProps {
  // managerName: The name of the project manager responsible for overseeing the project.
  managerName?: string;
  // managerImage: Optional URL for the project manager's avatar image.
  managerImage?: string;
  // timeStart: Optional start time for the timeline. Defaults to an empty string if not provided.
  timeStart?: string;
  // timeEnd: Optional end time for the timeline. Defaults to an empty string if not provided.
  timeEnd?: string;
  // onDeleteProject: The function to open delete modal
  onDeleteProject: (projectId: string) => void;
}

/**
 * Component to render a single project item.
 * @param {IProjectItem} prop - The properties for the ProjectItem component.
 *
 * @returns {JSX.Element} The rendered project item as a table row.
 */
const ProjectItem = ({
  id = '',
  projectName = 'Unnamed Project',
  status = STATUS.ON_HOLD,
  managerName = '',
  managerImage = '',
  lastUpdate = 'N/A',
  resources = '0',
  timeStart = '-',
  timeEnd = '-',
  budget = 0,
  onDeleteProject = () => {}
}: IProjectItem): JSX.Element => {
  const color = getColorFromStatus(status);

  const truncatedId = id.slice(-3);

  return (
    <tr className='border-b border-gray-200 hover:bg-light group'>
      <td className='px-3 py-5 font-medium'>
        <p>{truncatedId}</p>
      </td>
      <td>
        <Link
          to={`${ROUTE.PROJECT}/${id}`}
          className='text-primary-500 font-semibold hover:underline cursor-pointer w-max'
        >
          {projectName}
        </Link>
      </td>
      <td className='text-center px-2'>
        <Avatar name={managerName} src={managerImage} customClass='w-7 h-7' />
      </td>
      <td>
        <StatusLabel color={color} customClasses='text-xs py-[1px] px-2 color-success'>
          {status}
        </StatusLabel>
      </td>
      <td>
        <p className='text-gray-600 w-max'>{lastUpdate}</p>
      </td>
      <td className='text-center px-2'>
        <ResourceTag resources={resources} />
      </td>
      <td>
        <Timeline timeStart={timeStart} timeEnd={timeEnd} />
      </td>
      <td>
        <div className='flex items-center w-44 justify-between'>
          <CurrencyText currency={budget} className='text-primary-400 font-bold' />
          <div className='group-hover:block hidden'>
            <ProjectOptionsDropdown projectId={id} onDeleteProject={onDeleteProject} />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default memo(ProjectItem);
