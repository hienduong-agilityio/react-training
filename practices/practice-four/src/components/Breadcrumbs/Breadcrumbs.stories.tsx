// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import { Breadcrumbs } from '@/components';

// Types
import type { BreadcrumbItem } from '@/components/Breadcrumbs';

// Addon for React Router v6
import { withRouter } from 'storybook-addon-react-router-v6';

// Constants
import { ROUTE } from '@/constants';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/common/Breadcrumbs',
  component: Breadcrumbs,
  decorators: [withRouter],
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

const breadcrumbItems: BreadcrumbItem[] = [
  { id: 1, label: 'Projects', href: ROUTE.PROJECT },
  { id: 2, label: 'Project Details', href: `${ROUTE.PROJECT}/1` }
];

export const BreadcrumbsDefault: Story = {
  args: {
    items: breadcrumbItems
  },
  parameters: {
    reactRouter: {
      routePath: '/project/:projectId',
      routeParams: { projectId: '1' },
      location: { pathname: '/project/1' }
    }
  }
};

export const BreadcrumbsSingle: Story = {
  args: {
    items: [{ id: 1, label: 'Projects', href: ROUTE.PROJECT }]
  },
  parameters: {
    reactRouter: {
      routePath: '/project',
      location: { pathname: '/project' }
    }
  }
};
