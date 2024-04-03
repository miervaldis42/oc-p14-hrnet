// Components
import DynamicHeading from "@components/DynamicHeading/index";
import Form from "@components/Form";
import Event from "@components/Event";

/**
 * 'New Employee' Page
 * @description Contains a form to create a new employee
 *
 * @returns {JSX.Element} Page
 */
function Page(): JSX.Element {
  return (
    <>
      <DynamicHeading type="h2">New Employee</DynamicHeading>

      <Form />

      <Event />
    </>
  );
}

export default Page;
