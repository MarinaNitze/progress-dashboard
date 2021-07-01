import React from "react";

function Layout({ hero, title, subtitle, children }) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
