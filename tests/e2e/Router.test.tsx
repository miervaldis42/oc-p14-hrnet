// Imports
import { test, expect } from "@playwright/test";

/**
 * E2E Testing - Router
 * @description Test the different URL related to the app
 */

test("When I go to the website, it renders the Home page", async ({ page }) => {
  await page.goto("/");

  // The Home page is currently the 'Employee List' page
  const heading = page.getByRole("heading");

  await expect(heading).toBeVisible();
  await expect(heading).toHaveText(/List/i);
});
