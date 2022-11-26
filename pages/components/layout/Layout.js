import React from "react";
import Header from "../header/header";

function Layout({ children }) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{children}</main>
    </>
  );
}

export default Layout;
