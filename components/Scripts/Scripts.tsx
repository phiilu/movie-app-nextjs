import React from "react";

const Scripts = () => {
  if (process.env.NODE_ENV === "development") {
    return null;
  }
  return (
    <>
      <script
        async
        defer
        data-domain="nextjs.phiflix.com"
        src="https://p.phiilu.com/js/plausible.js"
      ></script>
    </>
  );
};

export default Scripts;
