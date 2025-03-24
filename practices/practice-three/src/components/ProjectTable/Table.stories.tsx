// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import ProjectTable, { IProjectTableProps } from './index'; // Ensure this path is correct

// Enum
import { STATUS } from '@/enums/status'; // Ensure this path is correct

const meta: Meta<typeof ProjectTable> = {
  title: 'Components/Table',
  component: ProjectTable,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<IProjectTableProps>;

export const Default: Story = {
  args: {
    dataTable: [
      {
        id: '1',
        projectName: 'Allosaurus Web App',
        status: STATUS.ON_TRACK,
        managerName: 'Jane Doe',
        managerImage: 'https://via.placeholder.com/150',
        lastUpdate: '15 Mar 2021',
        resources: '3',
        timeline: {
          timeStart: '15 Mar 2021',
          timeEnd: '20 Mar 2021'
        },
        estimation: '10.5'
      },
      {
        id: '2',
        projectName: 'Stegosaurus Mobile App',
        status: STATUS.POTENTIAL_RISK,
        managerName: 'John Smith',
        managerImage: 'https://via.placeholder.com/150',
        lastUpdate: '10 Apr 2021',
        resources: '5',
        timeline: {
          timeStart: '10 Apr 2021',
          timeEnd: '20 Apr 2021'
        },
        estimation: '12.0'
      },
      {
        id: '3',
        projectName: 'Triceratops Dashboard',
        status: STATUS.AT_RISK,
        managerName: 'Alice Brown',
        managerImage: 'https://via.placeholder.com/150',
        lastUpdate: '01 May 2021',
        resources: '2',
        timeline: {
          timeStart: '01 May 2021',
          timeEnd: '10 May 2021'
        },
        estimation: '15.5'
      }
    ]
  }
};

export const MissingData: Story = {
  args: {
    dataTable: [
      {
        id: '4',
        projectName: 'Pterodactyl Analytics Tool',
        status: STATUS.ON_HOLD,
        managerName: 'Carol Williams',
        managerImage: '',
        lastUpdate: '20 Jun 2021',
        resources: '',
        timeline: {
          timeStart: '',
          timeEnd: ''
        },
        estimation: ''
      }
    ]
  }
};
