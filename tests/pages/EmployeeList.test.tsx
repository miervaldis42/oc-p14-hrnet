// Imports
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// Page
import Page from "../../src/app/authenticated/employees/page";

/* Tests */
describe("Given I am on the 'Employee List' page", () => {
  it("should render the page with its corresponding title", () => {
    render(<Page />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeTruthy();
    expect(heading).toHaveTextContent(/List/i);
  });
});
