// Components
import Logo from "@components/Logo";

/**
 * @component
 * @description Loader to display when an element takes too long to appear.
 *
 * @returns {JSX.Element}
 */
function Loading(): JSX.Element {
  return (
    <div className="w-full h-full flex justify-center items-center animate-pulse">
      <Logo />
    </div>
  );
}

export default Loading;
