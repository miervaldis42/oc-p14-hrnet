// Imports
import { IconNameTypes } from "@assets/iconLibrary";

// Types
interface RouteType {
  name: string;
  path: string | (() => string);
}
interface NavLinkType {
  name: string;
  icon: IconNameTypes;
  path: string | (() => string);
}
type NavLinksType = Array<NavLinkType>;

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
    name: "New Employee",
    path: function () {
      const routePath = routes.employeeList.path;

      return typeof routePath === "function"
        ? `${routePath()}/new`
        : `${routePath}/new`;
    },
  },
};

const navLinkList: NavLinksType = [
  {
    name: "Employee List",
    icon: "peopleList",
    path: function () {
      return `${routes.authenticated.path}/employees`;
    },
  },
  {
    name: "New Employee",
    icon: "newPerson",
    path: function () {
      const routePath = routes.employeeList.path;

      return typeof routePath === "function"
        ? `${routePath()}/new`
        : `${routePath}/new`;
    },
  },
];

export type { RouteType };
export { routes, navLinkList };
