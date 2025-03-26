// Components
import { Avatar, StatusLabel, Tag, CurrencyText, ResourceTag } from '../../../components';

// Enums
import { COLORS } from '../../../enums';

// Interfaces
import type { IProjectItemProps } from '../../../interfaces';

// Helpers
import { getColorFromStatus } from '../../../helpers';

export interface ProjectDetailInfoProps extends Partial<IProjectItemProps> {
  managerName: string;
  managerAvatar?: string;
}

/**
 * Component to render detailed information for a single project.
 *
 * @returns The rendered project detail info.
 */
export const ProjectDetailInfo = ({
  projectName,
  status,
  managerName = 'Unknown',
  managerAvatar = '',
  lastUpdate,
  resources,
  timeline,
  budget
}: ProjectDetailInfoProps) => {
  const color = getColorFromStatus(status as COLORS);

  return (
    <div className='flex items-center p-8 h-full gap-36 space-y-6 flex-row'>
      {/* Manager Information */}
      <div className='flex-shrink-0 w-5/12 h-full flex flex-col items-center'>
        <Avatar name={managerName} src={managerAvatar} customClass='w-3/4 h-full' />
        <p className='text-primary-400 text-lg mt-4 text-center'>{managerName}</p>
      </div>

      {/* Project Overview */}
      <div className='flex-grow lg:w-7/12 h-full space-y-6'>
        <h2 className='text-4xl font-bold text-primary-600'>{projectName}</h2>

        <div className='flex items-center space-x-3 mb-4'>
          <span className='text-2xl font-medium'>Status: </span>
          <StatusLabel color={color} customClasses='text-lg py-[2px] px-3'>
            {status}
          </StatusLabel>
        </div>

        <div className='flex-col'>
          <span className='text-2xl font-medium'>Project Manager</span>
          <p className='text-lg mt-2 text-primary-400'>{managerName}</p>
        </div>

        <div className='flex flex-col gap-2'>
          <span className='text-2xl font-medium'>Last Update</span>
          <p className='text-lg text-primary-400'>{lastUpdate}</p>
        </div>

        <div className='flex flex-col gap-2'>
          <span className='text-2xl font-medium'>Resources</span>
          <ResourceTag resources={resources} />
        </div>

        <div className='flex flex-col gap-2'>
          <span className='text-2xl font-medium'>Time Start</span>
          <Tag customClasses='w-32 p-2 h-6'>{timeline?.timeStart || '-'}</Tag>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-2xl font-medium'>Time End</span>
          <Tag customClasses='w-32 p-2 h-6'>{timeline?.timeEnd || '-'}</Tag>
        </div>

        <div className='flex flex-col gap-2'>
          <span className='text-2xl font-medium'>Estimated Cost</span>
          <CurrencyText className='text-lg text-primary-400 font-bold' currency={budget} />
        </div>
      </div>
    </div>
  );
};
