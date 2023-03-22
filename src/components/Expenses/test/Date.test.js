import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Date from "../Date";

//formatted month needs to be a string w 3 characters corresponding to the month
//testing month because we use another class to determine the short names

test("properly stores shortened month as a 3-character string", () => {
  //arrange - set up the test data, test conditions, and test environment
  render(<Date month="Mar" />);

  //Assert - compare execution results with expected results
  const monthElement = screen.getByText(
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/
  );

  expect(monthElement).toBeInTheDocument();
});

//browser makes user unable to enter invalid values for day, month and year
