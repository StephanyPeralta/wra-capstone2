import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DateForm from "./DateForm";

const handleDateMock = jest.fn();

describe("DateForm Component", () => {
  it("renders DateForm elements", () => {
    render(<DateForm handleDate={handleDateMock} />);

    const DateFormTitle = screen.getByText("Try another date!");
    const inputDate = screen.getByTestId("date-input");
    const showPicButton = screen.getByRole("button", {
      name: "Show Picture",
    });

    expect(DateFormTitle).toBeInTheDocument();
    expect(inputDate).toBeInTheDocument();
    expect(showPicButton).toBeInTheDocument();
  });

  it("handles submit function with provided data", () => {
    render(<DateForm handleDate={handleDateMock} />);

    const inputDate = screen.getByTestId("date-input");
    const showPicButton = screen.getByRole("button", {
      name: "Show Picture",
    });

    userEvent.type(inputDate, "2022-01-24");
    userEvent.click(showPicButton);

    expect(handleDateMock).toHaveBeenCalledWith("2022-01-24");
  });
});
