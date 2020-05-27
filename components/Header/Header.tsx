import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = ({ site }) => {
  const router = useRouter();
  return (
    <header className="absolute top-0 left-0 right-0 z-20 ">
      <nav className="shadow-lg">
        <div className="container flex flex-col items-center justify-between px-4 py-6 mx-auto md:flex-row">
          <Link href="/">
            <a className={`flex items-center space-x-2`}>
              <svg className="w-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z"></path>
              </svg>
              <span className="text-2xl font-bold tracking-wide uppercase">
                Phiflix
              </span>
            </a>
          </Link>
          <ul className="flex items-center flex-1 space-x-4 text-sm">
            <li className="mt-3 md:ml-16 md:mt-0">
              <Link href="/">
                <a
                  className={`tracking-wide uppercase hover:text-gray-300  ${
                    (router.pathname === "/" ||
                      router.pathname.includes("/movie")) &&
                    "font-bold text-orange-500"
                  }`}
                >
                  Movies
                </a>
              </Link>
            </li>
            <li className="mt-3 md:ml-6 md:mt-0">
              <Link href="/tv">
                <a
                  className={`tracking-wide uppercase hover:text-gray-300  ${
                    router.pathname.includes("/tv") &&
                    "font-bold text-orange-500"
                  }`}
                >
                  TV Shows
                </a>
              </Link>
            </li>
            <li className="mt-3 md:ml-6 md:mt-0">
              <Link href="/actor">
                <a
                  className={`tracking-wide uppercase hover:text-gray-300  ${
                    router.pathname.includes("/actor") &&
                    "font-bold text-orange-500"
                  }`}
                >
                  Actors
                </a>
              </Link>
            </li>
          </ul>
          <div className="relative z-50 mt-3 md:mt-0">
            <div className="absolute top-0">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="search"
              className={`w-64 px-4 py-1 pl-8 text-sm ${
                site === "show"
                  ? "bg-gray-800 md:bg-transparent"
                  : "bg-gray-800"
              } rounded-full focus:outline-none focus:shadow-outline`}
              placeholder="Search"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
