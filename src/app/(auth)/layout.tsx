import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Eventify Authentication",
  description: "this is events management app built using nextjs",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center ">
      {children}
    </main>
  );
};

export default HomeLayout;
