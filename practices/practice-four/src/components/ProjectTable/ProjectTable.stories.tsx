// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import { ProjectTable } from '@/components';
import { IProjectItemProps } from '@/interfaces';
import { MemoryRouter } from 'react-router-dom';

// Mock data for the table
const mockDataTable: IProjectItemProps[] = [
  {
    id: '1',
    projectName: 'Project Alpha',
    lastUpdate: '2024-10-01',
    status: 'Ongoing',
    budget: 100000
  },
  {
    id: '2',
    projectName: 'Project Beta',
    lastUpdate: '2024-06-01',
    status: 'Completed',
    budget: 200000
  },
  {
    id: '3',
    projectName: 'Project Gamma',
    lastUpdate: '2024-09-15',
    status: 'Ongoing',
    budget: 150000
  }
];

const meta: Meta<typeof ProjectTable> = {
  title: 'Components/ProjectTable',
  component: ProjectTable,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {
    dataTable: {
      control: { type: 'object' },
      description: 'The project item data list for the table.',
      defaultValue: mockDataTable
    },
    onDeleteProject: {
      action: 'onDeleteProject',
      description: 'Function called when the delete action is triggered for a project.'
    }
  }
};

export default meta;

type Story = StoryObj<typeof ProjectTable>;

export const Default: Story = {
  render: (args) => (
    <MemoryRouter>
      <ProjectTable {...args} />
    </MemoryRouter>
  ),
  args: {
    dataTable: mockDataTable
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays a project table with a list of projects, including options to delete each project.'
      }
    }
  }
};

export const EmptyTable: Story = {
  args: {
    dataTable: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays an empty project table when no data is provided.'
      }
    }
  }
};
