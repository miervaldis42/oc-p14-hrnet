// React Icons Project List
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaStarOfLife } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { FaIdBadge } from "react-icons/fa6";

// Types
import { IconType } from "react-icons/lib";
type IconNameTypes = "magnifier" | "star" | "newPerson" | "peopleList";

/**
 * @name iconLibrary
 * @description Simplify the different icon libray names by assigning them easier names to use.
 * {@link https://react-icons.github.io/react-icons/ react-icons}
 * @returns {object} List of asigned names / Icon library pre-made components
 */

const iconLibrary: { [key: string]: IconType } = {
  magnifier: FaMagnifyingGlass,
  star: FaStarOfLife,
  newPerson: FaUserPlus,
  peopleList: FaIdBadge,
};

export type { IconNameTypes };
export default iconLibrary;
