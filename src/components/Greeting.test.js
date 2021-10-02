import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Greeting component", () => {
  test("reneder 'Hello World' as a text", () => {
    //arrange
    render(<Greeting/>);
    //act
    //assert
    const txtElement = screen.getByText("Hello World", { exact: false });
    expect(txtElement).toBeInTheDocument();
  });

  test("render 'good to see you' if button was not clicked", () => {
      render(<Greeting/>);
      const unchangeElement = screen.getByText("It's good to see you!");
      expect(unchangeElement).toBeInTheDocument();
  });

  test("render 'changed' if button was clicked", () => {
      render(<Greeting/>);

      //act
      const buttonElement = screen.getByRole('button');
      userEvent.click(buttonElement);

      //assert
      const changedElement = screen.getByText("changed", {exact:false});
      expect(changedElement).toBeInTheDocument();
  });

  test("not render 'good to see' if button was clicked", () => {
    render(<Greeting/>);

    //act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    //assert
    const changedElement = screen.queryByText("good to see", {exact:false});
    expect(changedElement).toBeNull();
  });
});
