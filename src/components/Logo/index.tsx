"use client";

// Imports
import Link from "next/link";
import { usePathname } from "next/navigation";

// Assets
import Image from "next/image";
import logo from "@assets/logo.png";

/**
 * @name Logo
 * @component
 * @description Contains area with logo element and its redirection logic.
 *
 * @returns {JSX.Element}
 */
function Logo(): JSX.Element {
  const pathname = usePathname();
  const goBackToHomePage = pathname === "/" ? "#" : "/";

  return (
    <Link href={goBackToHomePage}>
      <Image
        src={logo}
        width={100}
        height={100}
        className="rounded-lg shadow-md shadow-black"
        alt="HRnet Logo"
      />
    </Link>
  );
}

export default Logo;
