// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import ProjectItem from './index';

// Enum
import { STATUS } from '@/enums';

// Addon for React Router v6
import { withRouter } from 'storybook-addon-react-router-v6';

const meta: Meta<typeof ProjectItem> = {
  title: 'Components/ProjectItem',
  component: ProjectItem,
  decorators: [withRouter],
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: 'Unique identifier for the project item.',
      control: { type: 'text' }
    },
    projectName: {
      description: 'The name of the project.',
      control: { type: 'text' }
    },
    status: {
      description: 'Current status of the project. Uses the STATUS enum.',
      control: { type: 'select', options: Object.values(STATUS) }
    },
    managerName: {
      description: 'The name of the project manager.',
      control: { type: 'text' },
      defaultValue: ''
    },
    managerImage: {
      description: "URL for the project manager's image.",
      control: { type: 'text' },
      defaultValue: ''
    },
    lastUpdate: {
      description: 'The last update date of the project, in DD MMM YYYY format.',
      control: { type: 'text' }
    },
    resources: {
      description: 'Number of resources assigned to the project.',
      control: { type: 'text' }
    },
    timeline: {
      description: 'Timeline of the project, including start and end times.',
      control: { type: 'object' }
    },
    timeStart: {
      description: 'Start time of the project timeline, displayed as a string.',
      control: { type: 'text' },
      defaultValue: '-'
    },
    timeEnd: {
      description: 'End time of the project timeline, displayed as a string.',
      control: { type: 'text' },
      defaultValue: '-'
    },
    budget: {
      description: 'Budget allocated for the project, represented in dollars.',
      control: { type: 'number' }
    },
    onDeleteProject: {
      description: 'Callback function triggered when the project is deleted, receiving the project ID as a parameter.',
      action: 'onDeleteProject',
      defaultValue: () => {}
    }
  }
};

export default meta;

type Story = StoryObj<typeof ProjectItem>;

export const ProjectItemDefault: Story = {
  args: {
    id: '1',
    projectName: 'Allosaurus Web App',
    status: STATUS.ON_TRACK,
    managerName: 'Jane Doe',
    managerImage: '',
    lastUpdate: '15 Mar 2021',
    resources: '3',
    timeline: {
      timeStart: '15 Mar 2021',
      timeEnd: '20 Mar 2021'
    },
    timeStart: '15 Mar 2021',
    timeEnd: '20 Mar 2021',
    budget: 10.5,
    onDeleteProject: () => {}
  },
  parameters: {
    reactRouter: {
      routePath: '/project/:projectId',
      routeParams: { projectId: '1' },
      location: { pathname: '/project/1' }
    },
    docs: {
      description: {
        story:
          'Displays a project item with details like name, status, manager, last update, resources, timeline, and budget. It also includes an onDeleteProject callback for handling project deletions.'
      }
    }
  }
};
