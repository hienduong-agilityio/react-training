// Import the required libraries
import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import Button from "../Button";

// Test the props of the Button component
describe("Button props", () => {
  test("renders button with text", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText(/click me/i);
    expect(button).toBeInTheDocument();
  });

  test("renders button with outline variant", () => {
    render(<Button variant="outline">Click me</Button>);
    const button = screen.getByText(/click me/i);
    expect(button).toHaveClass("outline");
  });

  test("renders button with large size", () => {
    render(<Button size="large">Click me</Button>);
    const button = screen.getByText(/click me/i);
    expect(button).toHaveClass("large");
  });

  test("renders button with primary color", () => {
    render(<Button color="primary">Click me</Button>);
    const button = screen.getByText(/click me/i);
    expect(button).toHaveClass("primary");
  });

  test("renders button with start icon", () => {
    render(
      <Button startIcon={<i className="fa fa-check"></i>}>Click me</Button>
    );
    const button = screen.getByText(/click me/i);
    const icon = screen.getByRole("img");
    expect(button).toContainElement(icon);
    expect(icon).toHaveClass("fa-check");
  });

  test("renders button with end icon", () => {
    render(<Button endIcon={<i className="fa fa-times"></i>}>Click me</Button>);
    const button = screen.getByText(/click me/i);
    const icon = screen.getByRole("img");
    expect(button).toContainElement(icon);
    expect(icon).toHaveClass("fa-times");
  });

  test("renders button with custom classes", () => {
    render(<Button customClasses="custom-class">Click me</Button>);
    const button = screen.getByText(/click me/i);
    expect(button).toHaveClass("custom-class");
  });
});

// Test the click event of the Button component
describe("Button click", () => {
  test("calls onClick prop when clicked", () => {
    // Create a mock function
    const handleClick = jest.fn();
    // Render the button with the mock function
    render(<Button onClick={handleClick}>Click me</Button>);
    // Get the button element
    const button = screen.getByText(/click me/i);
    // Click the button
    fireEvent.click(button);
    // Expect the mock function to be called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// Test the snapshot of the Button component
describe("Button snapshot", () => {
  test("matches snapshot", () => {
    // Render the button as a JSON object
    const tree = renderer.create(<Button>Click me</Button>).toJSON();
    // Expect the JSON object to match the snapshot
    expect(tree).toMatchSnapshot();
  });
});
