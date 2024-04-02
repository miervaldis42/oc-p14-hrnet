"use client";

// Imports
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Children } from "react";

// Routing
import { navLinkList } from "@router/routes";

// Assets
import CustomIcon from "@components/Icon";
import Logo from "@components/Logo";

/**
 * @name Sidebar
 * @component
 * @description
 *
 * @returns {JSX.Element}
 */
function Sidebar(): JSX.Element {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Website sidebar"
      className="min-h-screen w-44 flex flex-col justify-between items-center  text-white bg-primary shadow-[rgba(0,0,0,0.6)_2px_0px_5px_0px] p-4"
    >
      {/* Logo & Active User */}
      <Logo />

      {/* Navbar */}
      <nav>
        <ul
          aria-label="Website navigation links"
          className="flex flex-col justify-around items-center gap-14"
        >
          {Children.toArray(
            navLinkList.map((navLink) => {
              const navLinkPath =
                typeof navLink.path === "function"
                  ? navLink.path()
                  : navLink.path;

              return (
                <li
                  aria-label={navLink.name}
                  className={`group flex flex-col items-center p-4 ${
                    pathname === navLinkPath
                      ? "font-bold bg-white/20 rounded-md"
                      : "hover:cursor-pointer hover:font-bold hover:-translate-y-1"
                  }`}
                >
                  <Link
                    href={navLinkPath}
                    className="flex flex-col items-center gap-2"
                  >
                    <CustomIcon
                      name={navLink.icon}
                      styling={`text-[160%] ${
                        pathname === navLinkPath
                          ? ""
                          : "group-hover:text-[180%]"
                      }`}
                    />
                    <span>{navLink.name}</span>
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </nav>

      <footer className="text-xs">HRnet - Version 1.0.0</footer>
    </aside>
  );
}

export default Sidebar;
