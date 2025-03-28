import type { Meta } from '@storybook/react';
import { Sidebar, SidebarItem } from './Sidebar';

const meta = {
  title: 'Components/layouts/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;

export const Defaults = () => (
  <Sidebar title="menu">
    <SidebarItem title="dashboard">
      <span>icon</span>
    </SidebarItem>
  </Sidebar>
);
