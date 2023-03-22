import "@testing-library/react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExpenseForm from "../ExpenseForm";

describe("ExpenseForm", () => {
  const submitHandler = jest.fn();
  
  test("onSubmit is called when all fields pass validation", () => {
    submitHandler.mockClear();
    render(<ExpenseForm />);

    userEvent.type(getInnerForm())
    userEvent.type(getAmount(), 50_000);
    userEvent.type(getDate(), "3-21-2023");

    const submitButtonElement = screen.getByTestId("submit-button");
    userEvent.click(submitButtonElement);
  });
});

const getInnerForm = () => {
    return screen.getByRole("form", {name: /submit-form/i});
}

const getAmount = () => {
    return screen.getByRole("spinbutton", {name: /amountField/i})
}

const getDate = () => {
    return screen.getByTestId('date-field');
}
