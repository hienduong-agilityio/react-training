import type { Meta } from '@storybook/react';
import Navbar from './index';

const meta = {
  title: 'Components/layouts/NavBar',
  component: Navbar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Navbar>;

export default meta;

export const Defaults = () => (
  <>
    <Navbar />
  </>
);
