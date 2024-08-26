import { poppins } from "@/pages/_app";
import { Input } from "../Common/Input";
import { isValidName, isValidNumber } from "@/utils";
import { FormEvent } from "react";
import { Step1Data, useFormData } from "@/state";
import { useRouter } from "next/router";

export function FormStep2() {
  const { setStep1Data, step1Data } = useFormData();
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
          name="raiseType"
          label="Raise Type"
          placeholder="Type Input Here"
          match={[isValidName]}
          required
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
        />
        <Input
          name="liquidityLocked"
          label="Liquidity Locked [Days]"
          placeholder="Liquidity Locked Days after Launch Success is determined"
          match={[isValidNumber]}
          required
        />
        <Input
          name="loanAmountLP"
          label="Loan Amount [LP - ETH]"
          placeholder="Type Input Here"
          match={[isValidNumber]}
          required
        />
        <Input
          name="collateralAsset"
          label="Preferred asset for collateral [ERC20]"
          placeholder="For LFP without collateral select ‘non collateral backed type’"
          match={[isValidNumber]}
          required
        />
        <Input
          name="loanAmountMarketing"
          label="Loan Amount [Marketing - ETH]"
          placeholder="For LFP without collateral select ‘non collateral backed type’"
          match={[isValidNumber]}
          required
        />
        <Input
          name="collateralAmount"
          label="Amount for collateral [Token Value & $ Value]"
          placeholder="$ Value is auto calculated using Dextools API"
          match={[isValidNumber]}
          required
        />
        <Input
          name="launchDate"
          label="Launch Date and Time [UTC Timezone]"
          placeholder="2024-08-26 18:00"
          match={[isValidNumber]}
          required
        />
        <Input
          name="repaymentDate"
          label="Final Repayment Date and Time [UTC Timezone]"
          placeholder="2024-08-26 18:00"
          match={[isValidNumber]}
          required
        />
        <Input
          name="loanDisbursementDate"
          label="Loan Disbursement Date and Time [UTC Timezone]"
          placeholder="2024-08-26 18:00"
          match={[isValidNumber]}
          required
        />
        <Input
          name="launchType"
          label="Select Launch Type"
          placeholder="Private Sale + Fair Launch"
          match={[isValidNumber]}
          required
        />
        <Input
          name="preferredLPProvider"
          label="Preferred LP Provider [if any]"
          placeholder="Type Input Here"
          match={[isValidNumber]}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-x-4">
        <Input
          name="wallet1"
          label="???? Wallet"
          placeholder=""
          match={[isValidNumber]}
          required
        />
        <Input
          name="wallet2"
          label="???? Wallet"
          placeholder=""
          match={[isValidNumber]}
          required
        />
      </div>

      <div className="flex flex-col gap-8">
        <h6>Select Tier:</h6>

        <div className="grid grid-cols-2 gap-x-4">
          <div className="flex flex-col gap-2 items-center justify-center p-4 py-8 border-2 rounded-3xl bg-zinc-700">
            <h3 className="font-bold text-xl">COMMON LFP</h3>
            <h6>Common Launch without any special Perks</h6>
            <h6>Initials Secured + 0.2E + 2% Supply</h6>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center p-4 py-8 rounded-3xl bg-zinc-900">
            <h3 className="font-bold text-xl">GOLD LFP</h3>
            <h6>Must hold 0.50% $MNTA Supply to be eligible</h6>
            <h6>Initials Secured + 1% Supply </h6>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end mb-32">
        <span>Estimated mcap $</span>

        <div className="flex gap-4 justify-end">
          <button className="border-[1.5px] px-16 py-2 rounded-xl">Back</button>
          <button className="bg-white text-black border-[1.5px] px-16 py-2 rounded-xl font-semibold">
            Next
          </button>
        </div>
      </div>
    </form>
  );
}
