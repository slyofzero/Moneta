import React from "react";
import { ConnectButton } from "../blockchain/ConnectButton";
import { Image, Link } from "../Common";
import { classNames } from "@/utils";
import { saira } from "@/pages/_app";
import { CreateButton } from "../CreateButton";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: Props) {
  return (
    <main
      className={classNames(
        "min-h-screen w-screen px-4 lg:px-64 flex flex-col",
        saira.className,
        className || ""
      )}
    >
      <Image
        src={"/left.png"}
        className="h-full w-52 absolute left-0 top-0 -z-10"
        alt="left"
      />
      <Image
        src={"/right.png"}
        className="h-full w-52 absolute right-0 top-0 -z-10"
        alt="right"
      />

      <header className="flex justify-between pt-8">
        <Link href={"/"}>
          <Image src={"/banner.png"} alt="banner" className="w-32 lg:w-48" />
        </Link>

        <div className="flex flex-col lg:flex-row items-center gap-4">
          <CreateButton />
          <ConnectButton />
        </div>
      </header>

      {children}
    </main>
  );
}
