import { poppins } from "@/pages/_app";
import { Input } from "../Common/Input";
import {
  isValidErc20Token,
  isValidEthAddress,
  isValidName,
  isValidNumber,
} from "@/utils";
import { Dispatch, FormEvent, useEffect } from "react";
import { Step2Data, useFormData } from "@/state";
import { useRouter } from "next/router";
import { DatePicker, DropDown, Link } from "../Common";
import { SetStateAction } from "jotai";
import { TierSelector } from "../Common/TierSelector";

const raiseTypes = [
  "LP only",
  "LP + Marketing Funds (Collateral Backed)",
  "LP + Marketing Funds (Unsecured - Contact Team)",
];

const launchTypes = [
  "Stealth Launch (Fair Launch)",
  "Private sale + Fair Launch",
  "Presale + Fair Launch",
];

export function FormStep2() {
  const { setStep2Data, step1Data, step2Data } = useFormData();
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = Object.fromEntries(
      new FormData(form).entries()
    ) as unknown as Step2Data;

    setStep2Data((prev) => ({ ...prev, ...formData }));
    router.push({ pathname: router.pathname, query: { step: 3 } });
  };

  const isLpOnly = step2Data.raiseType === "LP only";

  useEffect(
    () => {
      if (
        step2Data.raiseType ===
        "LP + Marketing Funds (Unsecured - Contact Team)"
      ) {
        window.open("https://forms.gle/reF8ZAQ1c32z2e7j8", "_blank");
        setStep2Data((prev) => ({
          ...prev,
          raiseType: "LP + Marketing Funds (Collateral Backed)",
        }));
      }
    },
    // eslint-disable-next-line
    [step2Data.raiseType]
  );

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-16 ${poppins.className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 text-xl mt-16 lg:mt-32 gap-x-4 gap-6">
        <DropDown
          name="raiseType"
          label="Raise Type"
          options={raiseTypes}
          defaultValue={raiseTypes[1]}
          setValue={setStep2Data as Dispatch<SetStateAction<Step2Data>>}
          value={step2Data.raiseType}
        />
        <Input
          name="supply"
          label="Total Supply"
          placeholder="Type Input Here"
          match={[isValidNumber]}
          value={step1Data.supply.toLocaleString()}
          required
        />
        <Input
          name="liquidity"
          label="Total Liquidity [%]"
          placeholder="Type Input Here"
          match={[isValidNumber]}
          required
          defaultValue={step2Data.liquidity}
        />
        <Input
          name="liquidityLocked"
          label="Liquidity Locked [Days]"
          placeholder="Liquidity Locked Days after Launch Success is determined"
          match={[isValidNumber]}
          defaultValue={step2Data.liquidityLocked}
        />
        <Input
          name="loanAmountLP"
          label="Loan Amount [LP - ETH]"
          placeholder="Type Input Here"
          match={[isValidNumber]}
          required
          defaultValue={step2Data.loanAmountLP}
        />
        {!isLpOnly && (
          <>
            <Input
              name="collateralAsset"
              label="Preferred asset for collateral [ERC20]"
              placeholder="For LFP without collateral select ‘non collateral backed type’"
              match={[isValidErc20Token]}
              required
              defaultValue={step2Data.collateralAsset}
            />
            <Input
              name="loanAmountMarketing"
              label="Loan Amount [Marketing - ETH]"
              placeholder="For LFP without collateral select ‘non collateral backed type’"
              match={[isValidNumber]}
              required
              defaultValue={step2Data.loanAmountMarketing}
            />
            <Input
              name="collateralAmount"
              label="Amount for collateral [Token Value]"
              placeholder="$ Value is auto calculated using Dextools API"
              match={[isValidNumber]}
              required
              defaultValue={step2Data.collateralAmount}
            />
          </>
        )}

        <DatePicker
          name="launchDate"
          label="Launch Date [UTC Timezone]"
          setValue={setStep2Data as Dispatch<SetStateAction<Step2Data>>}
          defaultValue={step2Data.launchDate}
        />
        {!isLpOnly && (
          <DatePicker
            name="repaymentDate"
            label="Final Repayment Date [UTC Timezone]"
            setValue={setStep2Data as Dispatch<SetStateAction<Step2Data>>}
            defaultValue={step2Data.repaymentDate}
          />
        )}
        <DatePicker
          name="loanDisbursementDate"
          label="Loan Disbursement Date [UTC Timezone]"
          setValue={setStep2Data as Dispatch<SetStateAction<Step2Data>>}
          defaultValue={step2Data.loanDisbursementDate}
        />
        <DropDown
          name="launchType"
          label="Launch Type"
          options={launchTypes}
          defaultValue={launchTypes[1]}
          setValue={setStep2Data as Dispatch<SetStateAction<Step2Data>>}
          value={step2Data.launchType}
        />
        <Input
          name="preferredLPProvider"
          label="Preferred LP Provider [if any]"
          placeholder="Type Input Here"
          match={[isValidName]}
          defaultValue={step2Data.preferredLPProvider}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-6">
        <Input
          name="taxWallet1"
          label="Tax Wallet 1"
          placeholder=""
          match={[isValidEthAddress]}
          defaultValue={step2Data.taxWallet1}
        />
        <Input
          name="taxWallet2"
          label="Tax Wallet 2"
          placeholder=""
          match={[isValidEthAddress]}
          defaultValue={step2Data.taxWallet2}
        />
      </div>

      <div className="flex flex-col gap-8">
        <h6>Select Tier:</h6>
        <TierSelector />
      </div>

      <div className="flex flex-col gap-2 items-end mb-32">
        <span>Estimated mcap $</span>

        <div className="flex flex-col lg:flex-row gap-4 justify-center w-full lg:justify-end text-center">
          <Link
            href={"/form?step=1"}
            className="border-[1.5px] px-16 py-2 rounded-xl"
          >
            Back
          </Link>
          <button
            type="submit"
            className="bg-white text-black border-[1.5px] px-16 py-2 rounded-xl font-semibold"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
}
