// Imports
import { redirect } from "next/navigation";

// Router
import routes from "@router/routes";

/**
 * Home Page
 * For the time being, this page redirects directly to the home page of the protected routes.
 *
 * @returns {JSX.Element} Page
 */
function Page(): JSX.Element {
  // Check if `path` object property value is a string or a function, in this case
  const actualHomePage =
    typeof routes.employeeList.path === "string"
      ? routes.employeeList.path
      : routes.employeeList.path();
  redirect(actualHomePage);
}

export default Page;
