// Library
import { memo } from 'react';

// Components
import Avatar from '@/components/common/Avatar';
import StatusLabel from '@/components/common/StatusLabel';
import Timeline from '@/components/Timeline';
import ResourceTag from '@/components/ResourcesTag';
import CurrencyText from '@/components/CurrencyText';
import ProjectOptionsDropdown from '@/components/ProjectOptionsDropdown';

// Types
import type { ITimelineProps } from '@/components/Timeline';

// Enums
import { STATUS } from '@/enums/status';
import { COLORS } from '@/enums/theme';

export interface IProjectItemProps {
  // id: The unique identifier for the project.
  id: string;
  // projectName: The name of the project.
  projectName: string;
  // status: The current status of the project or string, indicating progress or risk level.
  status: STATUS | string;
  // managerName: The name of the project manager responsible for overseeing the project.
  managerName: string;
  // managerImage: Optional URL for the project manager's avatar image.
  managerImage?: string;
  // lastUpdate: The date when the project was last updated.
  lastUpdate: string;
  // resources: Optional resources associated with the project, displayed as tags.
  resources?: string;
  // timeline: Optional timeline object containing start and end times for the project.
  timeline?: ITimelineProps;
  // estimation: Optional estimated cost of the project, displayed as a financial estimate.
  estimation?: string;
  // index: The index of the project in the list.
  index?: number;
}

interface IProjectItem extends IProjectItemProps {
  // onOpenEdit: The function to open edit modal
  onOpenEdit: (id: string) => void;
  // onDeleted: The function to open delete modal
  onDelete: () => void;
}

const getColorFromStatus = (status: STATUS | string): COLORS => {
  switch (status) {
    case STATUS.ON_TRACK:
      return COLORS.SUCCESS;
    case STATUS.POTENTIAL_RISK:
      return COLORS.WARNING;
    case STATUS.AT_RISK:
      return COLORS.DANGER;
    default:
      return COLORS.DEFAULT;
  }
};

/**
 * Component to render a single project item.
 * @param {IProjectItem} prop - The properties for the ProjectItem component.
 *
 * @returns {JSX.Element} The rendered project item as a table row.
 */
const ProjectItem = ({
  id,
  index,
  projectName,
  status,
  managerName,
  managerImage,
  lastUpdate,
  resources,
  timeline = { timeStart: '-', timeEnd: '-' },
  estimation,
  onOpenEdit,
  onDelete
}: IProjectItem): JSX.Element => {
  const color = getColorFromStatus(status);

  return (
    <tr className='border-b border-gray-200 hover:bg-light group'>
      <td className='px-3 py-5 font-medium'>
        <p>{index}</p>
      </td>
      <td>
        <p className='text-primary-500 font-semibold hover:underline cursor-pointer'>{projectName}</p>
      </td>
      <td className='text-center px-2'>
        <Avatar name={managerName} src={managerImage} />
      </td>
      <td>
        <StatusLabel color={color}>{status}</StatusLabel>
      </td>
      <td>
        <p className='text-gray-600'>{lastUpdate}</p>
      </td>
      <td className='text-center px-2'>
        <ResourceTag resources={resources} />
      </td>
      <td>
        <Timeline timeStart={timeline.timeStart} timeEnd={timeline.timeEnd} />
      </td>
      <td>
        <div className='flex items-center w-32 justify-between'>
          <CurrencyText currency={estimation} />
          <div className='group-hover:block hidden'>
            <ProjectOptionsDropdown projectId={id} onOpenEdit={onOpenEdit} onDelete={onDelete} />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default memo(ProjectItem);
