import React from "react";

const Footer = () => {
  return (
    <footer className="border border-t border-gray-800">
      <div className="container flex justify-between px-4 py-6 mx-auto text-sm">
        <span>
          Powered by{" "}
          <a
            href="https://www.themoviedb.org/documentation/api"
            className="underline hover:text-gray-300"
          >
            TMDb API
          </a>
        </span>
        <div>
          <span>
            Built with{" "}
            <a
              className="underline hover:text-gray-300"
              href="https://nextjs.org/"
            >
              next.js
            </a>
          </span>
          <span className="block">
            Styled with{" "}
            <a
              className="underline hover:text-gray-300"
              href="http://tailwindcss.com"
            >
              Tailwind
            </a>{" "}
            inspired by{" "}
            <a
              className="underline hover:text-gray-300"
              href="https://movies.andredemos.ca/"
            >
              Andre Madarang
            </a>{" "}
            by{" "}
            <a
              className="text-orange-500 hover:text-orange-300 hover:underline"
              href="https://twitter.com/phiilu"
            >
              @phiilu
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
