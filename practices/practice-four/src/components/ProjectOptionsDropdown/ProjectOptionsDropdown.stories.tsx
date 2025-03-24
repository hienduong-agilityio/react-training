// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import { ProjectOptionsDropdown } from '@/components';

// Addon for React Router v6
import { withRouter } from 'storybook-addon-react-router-v6';

// Mock data for the story
const mockProjectId = '123';

const meta: Meta<typeof ProjectOptionsDropdown> = {
  title: 'Components/ProjectOptionsDropdown',
  component: ProjectOptionsDropdown,
  decorators: [withRouter],
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    projectId: {
      control: { type: 'text' },
      description: 'The ID of the project to be managed.',
      defaultValue: mockProjectId
    },
    onDeleteProject: {
      action: 'onDeleteProject',
      description: 'The function to open the delete modal when "Delete" is clicked.'
    }
  }
};

export default meta;

type Story = StoryObj<typeof ProjectOptionsDropdown>;

export const Default: Story = {
  args: {
    projectId: mockProjectId
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays the ProjectOptionsDropdown with options like Edit, Send mail, Details, Archive, and Delete. It uses a button to toggle the dropdown menu.'
      }
    },
    reactRouter: {
      routePath: '/project/:projectId',
      routeParams: { projectId: mockProjectId },
      location: { pathname: `/project/${mockProjectId}` }
    }
  }
};

export const OpenByDefault: Story = {
  args: {
    projectId: mockProjectId
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays the ProjectOptionsDropdown with the dropdown menu open by default, simulating a state where the dropdown is already expanded.'
      }
    },
    reactRouter: {
      routePath: '/project/:projectId',
      routeParams: { projectId: mockProjectId },
      location: { pathname: `/project/${mockProjectId}` }
    }
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');

    if (button) {
      button.click();
    }
  }
};
