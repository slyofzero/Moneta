import { poppins, saira } from "@/pages/_app";
import { Input } from "../Common/Input";
import { Image, Link } from "../Common";
import {
  classNames,
  isValidEthAddress,
  isValidName,
  isValidNumber,
} from "@/utils";
import { FormEvent } from "react";
import { Step1Data, useFormData } from "@/state";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export function FormStep1() {
  const { setStep1Data, step1Data } = useFormData();
  const router = useRouter();

  const { address } = useAccount();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = Object.fromEntries(
      new FormData(form).entries()
    ) as unknown as Step1Data;

    setStep1Data(formData);
    router.push({ pathname: router.pathname, query: { step: 2 } });
  };

  return (
    <div
      className={`flex flex-col text-xl mt-32 px-40 gap-12 ${poppins.className}`}
    >
      <h1 className="ml-4">Application for Liquidity Financing</h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-12">
        <div className="relative mt-8 mb-4">
          <Input
            name="deployer"
            label="CA Deployer (the token ownership along with locked LP will be sent to this address)"
            type={"lg"}
            defaultValue={address || step1Data.deployer}
            required
            match={[isValidEthAddress]}
          />

          <Link
            href={"https://app.launchr.finance/"}
            target="_blank"
            className={classNames(
              saira.className,
              "bg-white text-black text-xs h-12 w-32 flex items-center justify-center absolute top-8 right-1 rounded-xl"
            )}
          >
            Create Token
          </Link>
        </div>

        <div className="flex flex-col gap-8">
          <Input
            name="name"
            label="Token Name"
            placeholder="Type Input Here"
            match={[isValidName]}
            required
            defaultValue={step1Data.name}
          />

          <Input
            name="symbol"
            label="Symbol"
            placeholder="Type Input Here"
            match={[isValidName]}
            required
            defaultValue={step1Data.symbol}
          />

          <Input
            name="supply"
            label="Total Supply"
            placeholder="Type Input Here"
            required
            match={[isValidNumber]}
            defaultValue={step1Data.supply}
          />
        </div>

        <button
          type="submit"
          className={`bg-white text-black ${saira.className} text-sm w-28 h-10 rounded-lg`}
        >
          Approve
        </button>
      </form>

      <Image
        src={"/ad.png"}
        alt="ad"
        className="border-[1px] border-white rounded-3xl mt-8 mb-32"
      ></Image>
    </div>
  );
}
