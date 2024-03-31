// Imports
import iconLib, { IconNameTypes } from "@assets/iconLibrary";

// Types
interface IconProps {
  name: IconNameTypes;
  styling?: string;
}

/**
 * @component
 * @name CustomIcon
 * @description 'Constructor'-like component to build custom icons based on 3rd-party Icon libraries.
 *
 * @param {IconProps} props Options to create an icon
 * * See the project imported icons in {@link iconLib}
 * @returns {JSX.Element}
 */
function CustomIcon({ name, styling }: IconProps): JSX.Element {
  const Icon = iconLib[name];
  const iconComponent = <Icon className={styling} />;

  return iconComponent;
}

export default CustomIcon;
