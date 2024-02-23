import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

// Components
import Popup from './index';
import Button from '../Button';

// Meta information for Storybook
export default {
  title: 'Components/Popup',
  component: Popup,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} as Meta;

// Define args interface
interface ModalProps {
  closeButtonContent?: string;
}

// Define Template
const Template: Story<ModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Show Popup</Button>
      <Popup
        isOpen={isOpen}
        onClosePopup={() => setIsOpen(false)}
        closeButtonContent={args.closeButtonContent}
        closeButton
      >
        <div className="text-center w-56">
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-500">Are you sure you want to delete this item?</p>
          </div>
          <div className="flex gap-4">
            <Button customClasses="bg-danger" onClick={() => setIsOpen(false)}>
              confirm
            </Button>
            <Button customClasses="bg-primary">Cancel</Button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  closeButtonContent: 'Close'
};
