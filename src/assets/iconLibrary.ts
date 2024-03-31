// React Icons Project List
import { FaMagnifyingGlass } from "react-icons/fa6";

// Types
import { IconType } from "react-icons/lib";
type IconNameTypes = "magnifier";

/**
 * @name iconLibrary
 * @description Simplify the different icon libray names by assigning them easier names to use.
 * {@link https://react-icons.github.io/react-icons/ react-icons}
 * @returns {object} List of asigned names / Icon library pre-made components
 */

const iconLibrary: { [key: string]: IconType } = {
  magnifier: FaMagnifyingGlass,
};

export type { IconNameTypes };
export default iconLibrary;
