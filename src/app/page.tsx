// Imports
import { redirect } from "next/navigation";

// Router
import routes from "@router/routes";

/**
 * Home Page
 * For the time being, this page redirects directly to the home page of the protected routes.
 *
 * @returns Page
 */
function Page() {
  const pathToNewHomePage = routes.employeeList.path;
  const actualHomePage =
    typeof pathToNewHomePage === "function"
      ? pathToNewHomePage()
      : pathToNewHomePage;

  redirect(actualHomePage);
}

export default Page;
