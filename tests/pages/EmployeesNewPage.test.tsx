// Imports
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// Page
import Page from "../../src/app/authenticated/employees/new/page";

describe("Given I am on 'New Employee' page", () => {
  test("should render the page with its corresponding title", () => {
    render(<Page />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeTruthy();
    expect(heading).toHaveTextContent(/New/i);
  });
});
