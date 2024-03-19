// Types
interface Route {
  name: string;
  path: string | (() => string);
}

/**
 * @name routes
 * @description A list of all existing routes in the project
 */
const routes: Record<string, Route> = {
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
      return `${routes.employeeList.path}/new`;
    },
  },
};

export default routes;
