// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import MenuDropdown from './index';

const meta: Meta<typeof MenuDropdown> = {
  title: 'Components/MenuDropdown',
  component: MenuDropdown,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof MenuDropdown>;

export const MenuDropdownDefault: Story = {
  render: () => <MenuDropdown projectId={''} />
};
