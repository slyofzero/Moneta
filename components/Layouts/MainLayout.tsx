import React from "react";
import { ConnectButton } from "../blockchain/ConnectButton";
import { Image, Link } from "../Common";
import { FaPlus } from "react-icons/fa6";
import { classNames } from "@/utils";
import { saira } from "@/pages/_app";
import { FormNav } from "../FormNav";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: Props) {
  return (
    <main
      className={classNames(
        "min-h-screen w-screen px-64",
        saira.className,
        className || ""
      )}
    >
      <Image
        src={"/left.png"}
        className="h-auto w-52 absolute left-0 top-0"
        alt="left"
      />
      <Image
        src={"/right.png"}
        className="h-auto w-52 absolute right-0 top-0"
        alt="right"
      />

      <header className="flex justify-between pt-8">
        <Image src={"/banner.png"} alt="banner" className="w-48" />

        <div className="flex items-center gap-4">
          <Link
            className="bg-white text-black px-8 py-1 rounded-full text-sm flex items-center gap-1"
            href={"https://app.launchr.finance/"}
            target="_blank"
          >
            <FaPlus className="mt-[0.05rem]" />
            Create
          </Link>
          <ConnectButton />
        </div>
      </header>

      <FormNav />

      {children}
    </main>
  );
}
