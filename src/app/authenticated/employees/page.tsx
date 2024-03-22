// Components
import DynamicHeading from "@components/DynamicHeading/index";
import Table from "@components/Table";

/**
 * 'Employee List'
 * @description Uses as the Home page of the application
 *
 * @returns {JSX.Element} Page
 */
function Page(): JSX.Element {
  return (
    <section>
      <DynamicHeading type="h2">Current Employees List</DynamicHeading>

      <Table />
    </section>
  );
}

export default Page;
