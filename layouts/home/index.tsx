import Footer from "components/footer";
import Jumbo from "components/jumbo";
import Navbar from "components/navbar";
import React, { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <Jumbo />
      {children}
      <Footer />
    </>
  );
}
