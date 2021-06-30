import React from "react";

function Layout({ hero, title, subtitle, children }) {
  return (
    <div className="flex flex-col font-sans min-h-screen text-gray-900">
      <main>{children}</main>
    </div>
  );
}

export default Layout;
