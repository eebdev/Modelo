import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { clientCredentials } from "@config/firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const links = [
  {
    text: "Home",
    href: "/dashboard",
  },
  {
    text: "Search",
    href: "/search",
  },
];

export default function Navbar() {
  const app = initializeApp(clientCredentials);
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const router = useRouter();
  const path = router.pathname;

  const prepend = "";

  function logout() {
    signOut(auth).then(() => {
      router.push("/");
    });
  }

  return (
    <nav
      id="header"
      className="bg-gray-900 w-full z-[10000] top-0 shadow px-2 md:px-8"
    >
      <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">
        <div className="w-1/2 pl-2 md:pl-0">
          <Link
            className="text-gray-100 text-base xl:text-xl no-underline hover:no-underline font-bold"
            href="/dashboard"
          >
            Modello Cerveza
          </Link>
        </div>
        <div className="w-1/2 pr-0">
          <div className="flex relative float-right">
            <div className="relative text-sm text-gray-100">
              <button
                onClick={() => setOpenUserMenu(!openUserMenu)}
                className="flex items-center focus:outline-none mr-3"
              >
                <img
                  className="w-8 h-8 rounded-full mr-4"
                  src="http://i.pravatar.cc/300"
                  alt="Avatar of User"
                />{" "}
                <span className="hidden md:inline-block text-gray-100">
                  Hi, {user?.email}
                </span>
                <svg
                  className="pl-2 h-2 fill-current text-gray-100"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 129 129"
                  enableBackground="new 0 0 129 129"
                >
                  <g>
                    <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" />
                  </g>
                </svg>
              </button>
              {openUserMenu && (
                <div
                  id="userMenu"
                  className="bg-gray-900 rounded shadow-md mt-2 absolute top-8 right-0 min-w-full overflow-auto z-30"
                >
                  <ul className="list-reset">
                    <li>
                      <a
                        href="#"
                        className="px-4 py-2 block text-gray-100 hover:bg-gray-800 no-underline hover:no-underline"
                      >
                        My account
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="px-4 py-2 block text-gray-100 hover:bg-gray-800 no-underline hover:no-underline"
                      >
                        Notifications
                      </a>
                    </li>
                    <li>
                      <hr className="border-t mx-2 border-gray-400" />
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="px-4 py-2 flex text-gray-100 hover:bg-gray-800 no-underline hover:no-underline w-full"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="block lg:hidden pr-4">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                id="nav-toggle"
                className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-100 appearance-none focus:outline-none"
              >
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
            {openMenu && (
              <div className="lg:hidden absolute top-8 right-0 z-50">
                <div className="flex flex-col bg-gray-900 w-full px-8 py-4 gap-4">
                  {links.map((link) => (
                    <Link
                      className="bg-gray-900 text-gray-100"
                      href={prepend + link.href}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-gray-900 z-20"
          id="nav-content"
        >
          <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
            {links.map((link) => (
              <li className="mr-6 my-2 md:my-0">
                <Link
                  className={`block py-1 md:py-3 pl-1 align-middle no-underline border-b-2 hover:border-modelo-yellow hover:text-modelo-yellow duration-200 ${
                    path === prepend + link.href ||
                    path === prepend + link.href.replace("/", "")
                      ? "border-modelo-yellow text-modelo-yellow"
                      : "text-gray-100 border-transparent"
                  }`}
                  href={prepend + link.href}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative pull-right pl-4 pr-4 md:pr-0">
            <input
              type="search"
              placeholder="Search"
              className="w-full bg-gray-900 text-sm text-gray-400 transition border border-gray-800 focus:outline-none focus:border-gray-600 rounded py-1 px-2 pl-10 appearance-none leading-normal"
            />
            <div
              className="absolute search-icon"
              style={{ top: "0.375rem", left: "1.75rem" }}
            >
              <svg
                className="fill-current pointer-events-none text-gray-500 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
