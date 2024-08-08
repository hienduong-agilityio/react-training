// Components
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import InputField from '@/components/common/InputField';

// Enums
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from '@/enums/theme';

// SVG
import arrowRight from '/images/arrowRightIcon.svg';

interface IProjectModalForm {
  // title: A title for Form modal.
  title: string;
  // isOpen: A boolean indicating whether the modal is open.
  isOpen: boolean;
  // onClose: A function to be called when the modal is requested to be closed.
  onClose: () => void;
}

/**
 * ProjectModalForm component
 *
 * @returns {JSX.Element} - ProjectModalForm element.
 */
const ProjectModalForm = ({ title, isOpen, onClose }: IProjectModalForm): JSX.Element => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='bg-gray-50 space-y-4 rounded-xl'>
        <div className='flex rounded-t-xl items-center bg-white justify-between p-4 border-b'>
          <h3 className='text-xl font-semibold text-gray-900'>{title}</h3>
        </div>
        <form className='flex flex-col gap-3 space-y-4 w-[440px] px-4'>
          <InputField
            id='projectName'
            label='project name *'
            name='projectName'
            type='text'
            placeholder='Enter project name'
            required
            customClasses='w-full'
          />
          <InputField
            id='managerName'
            label='project manager (PM)'
            name='managerName'
            type='text'
            placeholder='Enter project manager'
            customClasses='w-full'
          />
          <InputField
            id='resources'
            label='resources'
            name='resources'
            type='text'
            placeholder='Enter resources'
            customClasses='w-full'
          />
          <div className='flex flex-col gap-4'>
            <h4 className='text-sm font-medium text-gray-700'>Project timeline</h4>
            <div className='flex justify-between items-center w-full gap-4'>
              <div className='flex flex-col w-full'>
                <label htmlFor='timeStart' className='mb-2 text-xs font-medium text-gray-700'>
                  From
                </label>
                <InputField id='timeStart' name='timeStart' type='date' customClasses='w-full text-sm' />
              </div>
              <img src={arrowRight} className='w-5 h-5 mt-6' alt='Arrow Right' />
              <div className='flex flex-col w-full'>
                <label htmlFor='timeEnd' className='mb-2 text-xs font-medium text-gray-700'>
                  To
                </label>
                <InputField id='timeEnd' name='timeEnd' type='date' customClasses='w-full text-sm' />
              </div>
            </div>
          </div>
          <InputField
            id='estimation'
            label='estimation'
            name='estimation'
            type='number'
            placeholder='US$ 00.00'
            customClasses='w-full text-sm'
            min='0'
          />
        </form>
        <div className='flex items-center rounded-b-xl bg-white gap-5 py-5 px-4 justify-end border-t border-gray-200'>
          <Button
            onClick={onClose}
            variant={BUTTON_VARIANTS.OUTLINED}
            size={BUTTON_SIZES.SMALL}
            color={BUTTON_COLORS.DANGER}
            customClasses='hover:text-light focus:text-light focus:ring-0 py-0.5'
          >
            Cancel
          </Button>
          <Button variant={BUTTON_VARIANTS.CONTAINED} size={BUTTON_SIZES.SMALL} color={BUTTON_COLORS.PRIMARY}>
            Add project
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectModalForm;
