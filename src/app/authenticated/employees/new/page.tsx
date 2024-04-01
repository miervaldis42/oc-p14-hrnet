// Components
import DynamicHeading from "@components/DynamicHeading/index";
import Form from "@components/Form";

/**
 * 'New Employee' Page
 * @description Contains a form to create a new employee
 *
 * @returns {JSX.Element} Page
 */
function Page(): JSX.Element {
  return (
    <section className="my-4 mx-8">
      <DynamicHeading type="h2">New Employee</DynamicHeading>

      <Form />
    </section>
  );
}

export default Page;
