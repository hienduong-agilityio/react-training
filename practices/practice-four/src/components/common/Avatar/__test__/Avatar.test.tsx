// Libraries
import { render, screen, RenderResult } from '@testing-library/react';

// Components
import { Avatar } from '@/components';

// Helper
import { getNamePlaceholder } from '@/helpers';

/**
 Avatar Component
  √ render with an image if src is provided
  √ render a placeholder text when no src is provided
  √ apply default and custom class names
  √ render correctly with a name and without an image
  √ handle an empty name prop and render N/A as the placeholder
*/
describe('Avatar Component', () => {
  const defaultClasses =
    'inline-flex border-2 border-gray-100 items-center justify-center overflow-hidden bg-primary-0 rounded-lg';

  let renderResult: RenderResult;
  const name = 'John Doe';

  beforeEach(() => {
    renderResult = render(<Avatar name={name} />);
  });

  it('should render with an image if src is provided', () => {
    const src = 'https://example.com/avatar.jpg';
    renderResult.rerender(<Avatar name={name} src={src} />);

    const imgElement = screen.getByAltText(`${name} avatar`);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', src);

    // Snapshot for Avatar with image
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should render a placeholder text when no src is provided', () => {
    const placeholderText = getNamePlaceholder(name);
    const placeholderElement = screen.getByText(placeholderText);

    expect(placeholderElement).toBeInTheDocument();
    expect(placeholderElement).toHaveClass('font-bold text-xs text-primary-500');

    // Snapshot for Avatar with placeholder text
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should apply default and custom class names', () => {
    const customClass = 'custom-class';
    renderResult.rerender(<Avatar name={name} customClass={customClass} />);

    const avatarElement = screen.getByText(getNamePlaceholder(name)).parentElement;
    expect(avatarElement).toHaveClass(defaultClasses);
    expect(avatarElement).toHaveClass(customClass);

    // Snapshot for Avatar with custom class
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should render correctly with a name and without an image', () => {
    const newName = 'Jane Smith';
    renderResult.rerender(<Avatar name={newName} />);

    const placeholderText = getNamePlaceholder(newName);
    expect(screen.getByText(placeholderText)).toBeInTheDocument();

    // Snapshot for Avatar with name but without an image
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should handle an empty name prop and render N/A as the placeholder', () => {
    renderResult.rerender(<Avatar name='' />);

    const placeholderText = 'N/A';
    expect(screen.getByText(placeholderText)).toBeInTheDocument();

    expect(renderResult.container).toMatchSnapshot();
  });
});
