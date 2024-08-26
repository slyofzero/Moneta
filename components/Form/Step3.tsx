import { poppins } from "@/pages/_app";
import { Input } from "../Common/Input";
import { isValidName, isValidNumber } from "@/utils";
import { FormEvent } from "react";
import { Step1Data, useFormData } from "@/state";
import { useRouter } from "next/router";

export function FormStep3() {
  const { setStep1Data } = useFormData();
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = Object.fromEntries(
      new FormData(form).entries()
    ) as unknown as Step1Data;

    setStep1Data(formData);
    router.push({ pathname: router.pathname, query: { step: 3 } });
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-16 ${poppins.className}`}
    >
      <div className="grid grid-cols-2 text-xl mt-32 gap-x-4 gap-6">
        <Input
          name="logo"
          label="Logo"
          placeholder="ex. https://www.website.com"
          match={[isValidName]}
          required
        />
        <Input
          name="logo"
          label="Logo"
          placeholder="ex. https://www.website.com"
          match={[isValidName]}
          required
        />
        <Input
          name="website"
          label="Website"
          placeholder="ex. https://www.website.com"
          match={[isValidNumber]}
          required
        />
        <Input
          name="telegram"
          label="Telegram"
          placeholder="ex. https://tel.me"
          match={[isValidNumber]}
          required
        />
        <Input
          name="github"
          label="Github"
          placeholder="ex. https://github.com"
          match={[isValidNumber]}
          required
        />
        <Input
          name="twitter"
          label="Twitter"
          placeholder="ex. https://twitter.com"
          match={[isValidNumber]}
          required
        />
        <Input
          name="discord"
          label="Discord"
          placeholder="ex. https://discord.com"
          match={[isValidNumber]}
          required
        />
        <Input
          name="youtube"
          label="Youtube"
          placeholder="ex. https://youtube.com"
          match={[isValidNumber]}
          required
        />
        <Input
          name="content"
          label="content"
          placeholder="ex. https://website.com"
          match={[isValidNumber]}
          required
        />
        <Input
          name="reddit"
          label="Reddit"
          placeholder="ex. https://reddit.com"
          match={[isValidNumber]}
          required
        />
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="description ml-4">Description</label>
        <textarea
          name="description"
          id="description"
          className="h-36 border-[1.5px] border-white bg-black rounded-3xl placeholder:text-white/75 flex p-4"
          placeholder="Description Text Here"
        />
      </div>

      <div className="flex gap-4 justify-end mt-12 mb-32">
        <button className="border-[1.5px] px-16 py-2 rounded-xl">Back</button>
        <button className="bg-white text-black border-[1.5px] px-16 py-2 rounded-xl font-semibold">
          Next
        </button>
      </div>
    </form>
  );
}
