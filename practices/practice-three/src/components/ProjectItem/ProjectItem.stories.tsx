// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import ProjectItem from './index';

// Enum
import { STATUS } from '@/enums/status';

const meta: Meta<typeof ProjectItem> = {
  title: 'Components/common/ProjectItem',
  component: ProjectItem,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ProjectItem>;

export const ProjectItemDefault: Story = {
  args: {
    id: '1',
    projectName: 'Allosaurus Web App',
    status: STATUS.ON_TRACK,
    managerName: 'Jane Doe',
    lastUpdate: '15 Mar 2021',
    resources: '3',
    timeline: {
      timeStart: '15 Mar 2021',
      timeEnd: '20 Mar 2021'
    },
    estimation: '10.5'
  }
};

export const ProjectItemMissingProps: Story = {
  args: {
    id: '1',
    projectName: 'Allosaurus Web App',
    status: STATUS.ON_HOLD,
    managerName: 'Jane Doe Hien',
    managerImage: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/222.jpg',
    lastUpdate: '15 Mar 2021',
    resources: '',
    estimation: ''
  }
};
