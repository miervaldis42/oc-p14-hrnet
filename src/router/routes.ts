// Types
interface RouteType {
  name: string;
  path: string | (() => string);
}

/**
 * @name routes
 * @description A list of all existing routes in the project
 */
const routes: Record<string, RouteType> = {
  home: {
    name: "Home",
    path: "/",
  },
  authenticated: {
    name: "Protected Route",
    path: "/authenticated",
  },
  employeeList: {
    name: "Employee List",
    path: function () {
      return `${routes.authenticated.path}/employees`;
    },
  },
  newEmployee: {
    name: "Add Employee",
    path: function () {
      const routePath = routes.employeeList.path;

      return typeof routePath === "function"
        ? `${routePath()}/new`
        : `${routePath}/new`;
    },
  },
};

export type { RouteType };
export default routes;
