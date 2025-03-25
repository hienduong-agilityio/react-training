import type { Meta } from '@storybook/react';
import Sidebar from './index';

const meta = {
  title: 'Components/layouts/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Sidebar>;

export default meta;

export const Defaults = () => (
  <>
    <Sidebar />
  </>
);
