import React from "react";
import Header from "../header/header";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
}

export default Layout;
