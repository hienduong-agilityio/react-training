import { Meta } from '@storybook/react';
import Popup from './Popup';

const meta = {
  title: 'Components/common/Popup',
  component: Popup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popup>;

export default meta;

export const Default = () => (
  <Popup closeButton={true} isOpen={true} onClosePopup={() => {}}>
    <div>
      <h2>Popup Content</h2>
      <p>This is a sample content for the Popup component.</p>
    </div>
  </Popup>
);

export const Closed = () => (
  <Popup isOpen={false} onClosePopup={() => {}}>
    <div>
      <h2>Popup Content</h2>
      <p>This Popup is closed.</p>
    </div>
  </Popup>
);
