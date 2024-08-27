import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaPlus } from "react-icons/fa6";
import { Link } from "./Common";

export function CreateButton() {
  const itemClassName =
    "border-b-[1.5px] py-2 border-gray-800 hover:cursor-pointer hover:bg-slate-800 px-4 transition-all";

  return (
    <div className="flex flex-col gap-2 outline-none">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="bg-white text-black px-8 py-1 rounded-full text-xs lg:text-sm flex items-center gap-1">
          <FaPlus className="mt-[0.05rem]" />
          Create
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-black text-white w-full border-white border-[1.5px] rounded-xl py-4">
            <DropdownMenu.Item className={itemClassName}>
              <Link href={"https://app.launchr.finance/"}>Token Minter</Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className={itemClassName}>
              <Link href={"/form"}>LFP Creator</Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className={itemClassName}>
              <Link href={"#"}>Mortgaging Dapp (Coming soon)</Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className={itemClassName}>
              <Link href={"#"}>DAAS (Coming soon)</Link>
            </DropdownMenu.Item>

            <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />

            <div className="flex flex-col gap-2">
              <div className="flex px-4 gap-2">
                <Link href={"https://x.com/moneta_fi"}>Twitter</Link> |{" "}
                <Link href={"https://monetafi.io/"}>Website</Link> |{" "}
                <Link href={"https://t.me/moneta_portal"}>Telegram</Link> |{" "}
                <Link href={"https://linktr.ee/Moneta_fi"}>LinkTree</Link>
              </div>
              <span className="text-gray-400 text-center">
                Copyright Moneta Finance 2024
              </span>
            </div>

            <DropdownMenu.Arrow />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
