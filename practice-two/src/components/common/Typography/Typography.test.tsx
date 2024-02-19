// Library
import { render } from '@testing-library/react';

// Components
import Typography, { TEXT_SIZE } from './index';

// Library
import '@testing-library/jest-dom';

describe('Typography Component', () => {
  it('renders with default props', () => {
    const { getByText } = render(<Typography>Hello World</Typography>);
    const typographyElement = getByText('Hello World');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-black text-base');
  });

  it('renders with custom color', () => {
    const { getByText } = render(<Typography color="white">Hello World</Typography>);
    const typographyElement = getByText('Hello World');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-white text-base');
  });

  it('renders with custom size', () => {
    const { getByText } = render(<Typography size={TEXT_SIZE.LARGE}>Hello World</Typography>);
    const typographyElement = getByText('Hello World');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-black text-5xl');
  });

  it('renders with custom classes', () => {
    const { getByText } = render(<Typography customClasses="extra-class">Hello World</Typography>);
    const typographyElement = getByText('Hello World');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('text-black text-base extra-class');
  });

  it('renders different tags', () => {
    const { getByText } = render(
      <>
        <Typography tag="h1">Heading 1</Typography>
        <Typography tag="h2">Heading 2</Typography>
        <Typography tag="h3">Heading 3</Typography>
        <Typography tag="h4">Heading 4</Typography>
        <Typography tag="h5">Heading 5</Typography>
        <Typography tag="h6">Heading 6</Typography>
        <Typography>Paragraph</Typography>
      </>
    );

    expect(getByText('Heading 1').tagName).toBe('H1');
    expect(getByText('Heading 2').tagName).toBe('H2');
    expect(getByText('Heading 3').tagName).toBe('H3');
    expect(getByText('Heading 4').tagName).toBe('H4');
    expect(getByText('Heading 5').tagName).toBe('H5');
    expect(getByText('Heading 6').tagName).toBe('H6');
    expect(getByText('Paragraph').tagName).toBe('P');
  });

  it('matches snapshot with default props', () => {
    const { asFragment } = render(<Typography>Hello World</Typography>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with custom props', () => {
    const { asFragment } = render(
      <Typography color="white" size={TEXT_SIZE.LARGE} tag="h1" customClasses="custom-class">
        Hello World
      </Typography>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
