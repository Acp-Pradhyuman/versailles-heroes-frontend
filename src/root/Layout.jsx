import React from "react";
import { CustomRouter } from "./CustomRouter";
import { Header, Footer } from "../containers";
import { Modal } from "../containers";
export function Layout() {
  return (
    <>
      <Header />
      <Modal />
      <div>
        <CustomRouter />
      </div>
      <Footer />
    </>
  );
}
