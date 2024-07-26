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
const Template: Story<ModalProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (): void => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <div>
      <Button onClick={handleClick}>Show Popup</Button>
      <Popup isOpen={isOpen} onClosePopup={handleClick}>
        <div className="text-center w-56">
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-500">Are you sure you want to delete this item?</p>
          </div>
          <div className="flex gap-4 justify-between">
            <Button onClick={handleClick}>Confirm</Button>
            <Button variant="filled" color="danger">
              Cancel
            </Button>
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
