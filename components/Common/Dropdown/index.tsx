import { Step2Data } from "@/state";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  options: string[];
  label: string;
  defaultValue: string;
  setValue: Dispatch<SetStateAction<Step2Data>>;
  value: string;
  name: string;
}

export function DropDown({
  defaultValue,
  label,
  options,
  setValue,
  value,
  name,
}: Props) {
  const onSelected = (option: string) =>
    setValue((prev) => ({ ...prev, [name]: option }));

  useEffect(() => {
    setValue((prev) => ({ ...prev, [name]: value || defaultValue }));
  }, [defaultValue, setValue, value, name]);

  return (
    <div className="flex flex-col gap-2 outline-none">
      <label className="text-sm  ml-4">{label}</label>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          className="flex items-center px-4 border-[1.5px] border-white h-10 rounded-2xl text-sm"
          asChild
        >
          <button>{value}</button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-black text-white w-full border-white border-[1.5px] rounded-xl py-4">
            {options.map((option, key) => (
              <DropdownMenu.Item
                className="border-b-[1.5px] py-2 border-gray-800 hover:cursor-pointer hover:bg-slate-800 px-4 transition-all"
                key={key}
                onSelect={() => onSelected(option)}
              >
                {option}
              </DropdownMenu.Item>
            ))}

            <DropdownMenu.Arrow />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
