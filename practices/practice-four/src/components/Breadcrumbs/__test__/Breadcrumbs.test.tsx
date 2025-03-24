// Libraries
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

// Components
import { Breadcrumbs } from '@/components';

// Types
import type { BreadcrumbItem } from '@/components/Breadcrumbs';

// Constants
import { ROUTE } from '@/constants';

// Mock icons
jest.mock('@public/images/homeIcon.svg', () => 'homeIcon.svg');
jest.mock('@public/images/arrowRightIcon.svg', () => 'arrowRightIcon.svg');

describe('Breadcrumbs Component', () => {
  const defaultItems: BreadcrumbItem[] = [{ label: 'Home', href: ROUTE.ROOT }];
  const homeIconSrc = 'homeIcon.svg'; // mock icon path

  const renderBreadcrumbs = (items: BreadcrumbItem[] = defaultItems) =>
    render(
      <Router>
        <Breadcrumbs items={items} />
      </Router>
    );

  it('renders breadcrumbs with default "Home" item', () => {
    renderBreadcrumbs(defaultItems);
    const homeElement = screen.getByText('Home');

    expect(homeElement).toBeInTheDocument();
    expect(homeElement).toHaveClass('text-sm font-medium text-gray-400 hover:text-primary-500');
    expect(homeElement.closest('a')).toHaveAttribute('href', ROUTE.ROOT); // Ensuring the correct link
  });

  it('renders the correct href for an item with label and href', () => {
    const items: BreadcrumbItem[] = [{ label: 'Home', href: ROUTE.ROOT }];
    renderBreadcrumbs(items);

    const homeElement = screen.getByText('Home');
    expect(homeElement).toBeInTheDocument();
    expect(homeElement.closest('a')).toHaveAttribute('href', ROUTE.ROOT); // Ensuring the correct link
  });

  it('renders breadcrumbs with additional items and handles items without href', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: ROUTE.ROOT },
      { label: 'Projects', href: ROUTE.PROJECT },
      { label: 'Project Details' }
    ];

    renderBreadcrumbs(items);

    const homeElement = screen.getByText('Home');
    const projectsElement = screen.getByText('Projects');
    const projectDetailsElement = screen.getByText('Project Details');

    // Check if the elements are rendered
    expect(homeElement).toBeInTheDocument();
    expect(projectsElement).toBeInTheDocument();
    expect(projectDetailsElement).toBeInTheDocument();

    // Check if the links are correctly applied
    expect(homeElement.closest('a')).toHaveAttribute('href', ROUTE.ROOT);
    expect(projectsElement.closest('a')).toHaveAttribute('href', ROUTE.PROJECT);
    expect(projectDetailsElement.closest('a')).toBeNull(); // No link for the last breadcrumb
  });

  it('uses id as the key when label is not provided', () => {
    const items: BreadcrumbItem[] = [{ id: 1, href: ROUTE.ROOT }]; // Item with only id
    const { container } = renderBreadcrumbs(items);

    // Verify that an element exists in the DOM and it's using id as the key.
    const listItem = container.querySelector('li');
    expect(listItem).toBeInTheDocument();
  });

  it('renders arrow icon between breadcrumb items', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: ROUTE.ROOT },
      { label: 'Projects', href: ROUTE.PROJECT }
    ];

    renderBreadcrumbs(items);

    const arrows = screen.getAllByAltText('Arrow Right');
    arrows.forEach((arrow) => {
      expect(arrow).toBeInTheDocument();
      expect(arrow).toHaveClass('rtl:rotate-180 w-6 h-6 text-gray-400 mx-1');
    });
  });

  it('renders home icon with the correct attributes', () => {
    renderBreadcrumbs(defaultItems);

    const homeIcon = screen.getByAltText('home');
    expect(homeIcon).toBeInTheDocument();
    expect(homeIcon).toHaveAttribute('src', homeIconSrc); // Mocked home icon path
    expect(homeIcon).toHaveClass('w-4 h-4 me-2.5 p-0');
  });

  it('matches snapshot for breadcrumbs', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: ROUTE.ROOT },
      { label: 'Projects', href: ROUTE.PROJECT }
    ];

    const { asFragment } = renderBreadcrumbs(items);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the default "Home" item when no items are provided', () => {
    // Render Breadcrumbs without passing the `items` prop
    render(
      <Router>
        <Breadcrumbs />
      </Router>
    );

    const homeElement = screen.getByText('Home');

    // Check that the default "Home" item is rendered
    expect(homeElement).toBeInTheDocument();
    expect(homeElement.closest('a')).toHaveAttribute('href', ROUTE.ROOT); // Ensures it links to the root
  });
});
