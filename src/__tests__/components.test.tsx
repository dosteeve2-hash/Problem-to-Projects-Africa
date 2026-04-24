import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, Input, Card, Alert, Badge } from "@/components/ui/design-system";

describe("Design System Components", () => {
  describe("Button Component", () => {
    it("renders button with text", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("renders different variants", () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>);
      expect(screen.getByText("Primary")).toHaveClass("bg-primary-800");

      rerender(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByText("Secondary")).toHaveClass("border-2");

      rerender(<Button variant="danger">Danger</Button>);
      expect(screen.getByText("Danger")).toHaveClass("bg-error-500");
    });

    it("renders different sizes", () => {
      const { rerender } = render(<Button size="sm">Small</Button>);
      expect(screen.getByText("Small")).toHaveClass("px-3");

      rerender(<Button size="lg">Large</Button>);
      expect(screen.getByText("Large")).toHaveClass("px-6");
    });

    it("handles disabled state", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByText("Disabled")).toBeDisabled();
    });

    it("handles click events", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click</Button>);

      await userEvent.click(screen.getByText("Click"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Input Component", () => {
    it("renders input with label", () => {
      render(<Input label="Email" type="email" />);
      expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("displays error message", () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("displays helper text", () => {
      render(<Input helperText="Enter a valid email" />);
      expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
    });

    it("handles input changes", async () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input");

      if (input) {
        await userEvent.type(input, "test@example.com");
        expect(input).toHaveValue("test@example.com");
      }
    });
  });

  describe("Card Component", () => {
    it("renders card with children", () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("renders different variants", () => {
      const { rerender, container } = render(<Card variant="default">Default</Card>);
      expect(container.querySelector(".bg-white")).toBeInTheDocument();

      rerender(<Card variant="success">Success</Card>);
      expect(container.querySelector(".bg-success-50")).toBeInTheDocument();
    });

    it("renders with highlighted state", () => {
      const { container } = render(<Card highlighted>Highlighted</Card>);
      expect(container.querySelector(".ring-2")).toBeInTheDocument();
    });
  });

  describe("Alert Component", () => {
    it("renders alert with title and content", () => {
      render(
        <Alert variant="success" title="Success">
          Operation completed
        </Alert>
      );
      expect(screen.getByText("Success")).toBeInTheDocument();
      expect(screen.getByText("Operation completed")).toBeInTheDocument();
    });

    it("renders different variants", () => {
      const { rerender, container } = render(<Alert variant="success">Success</Alert>);
      expect(container.querySelector(".bg-success-50")).toBeInTheDocument();

      rerender(<Alert variant="error">Error</Alert>);
      expect(container.querySelector(".bg-error-50")).toBeInTheDocument();
    });
  });

  describe("Badge Component", () => {
    it("renders badge with text", () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("renders different variants", () => {
      const { rerender, container } = render(<Badge variant="primary">Primary</Badge>);
      expect(container.querySelector(".bg-primary-100")).toBeInTheDocument();

      rerender(<Badge variant="success">Success</Badge>);
      expect(container.querySelector(".bg-success-100")).toBeInTheDocument();
    });

    it("renders different sizes", () => {
      const { rerender, container } = render(<Badge size="sm">Small</Badge>);
      expect(container.querySelector(".px-2")).toBeInTheDocument();

      rerender(<Badge size="md">Medium</Badge>);
      expect(container.querySelector(".px-3")).toBeInTheDocument();
    });
  });
});
