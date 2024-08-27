import { useAtom, atom } from "jotai";

// ------------------------------ Step 1 ------------------------------
export interface Step1Data {
  deployer: string;
  name: string;
  symbol: string;
  supply: number;
}

const defaultStep1Data: Step1Data = {
  deployer: "",
  name: "",
  symbol: "",
  supply: 0,
};
const step1Atom = atom<Step1Data>(defaultStep1Data);

// ------------------------------ Step 2 ------------------------------
export interface Step2Data {
  raiseType: string;
  liquidity: number;
  liquidityLocked: number;
  loanAmountLP: number;
  collateralAsset: string;
  loanAmountMarketing: number;
  collateralAmount: number;
  launchDate: string;
  repaymentDate: string;
  loanDisbursementDate: string;
  launchType: string;
  preferredLPProvider: string;
  taxWallet1: string;
  taxWallet2: string;
  tier: "Common LFP" | "Gold LFP";
}

const defaultStep2Data: Step2Data = {
  raiseType: "",
  liquidity: 0,
  liquidityLocked: 0,
  loanAmountLP: 0,
  collateralAsset: "",
  loanAmountMarketing: 0,
  collateralAmount: 0,
  launchDate: "",
  repaymentDate: "",
  launchType: "",
  preferredLPProvider: "",
  taxWallet1: "",
  taxWallet2: "",
  tier: "Common LFP",
  loanDisbursementDate: "",
};
const step2Atom = atom<Step2Data>(defaultStep2Data);

// ------------------------------ Step 3 ------------------------------
export interface Step3Data {
  logo: string;
  website: string;
  telegram: string;
  twitter: string;
  discord: string;
  youtube: string;
  content: string;
  reddit: string;
  github: string;
  description: string;
}

const defaultStep3Data: Step3Data = {
  logo: "",
  website: "",
  telegram: "",
  twitter: "",
  discord: "",
  youtube: "",
  content: "",
  reddit: "",
  github: "",
  description: "",
};
const step3Atom = atom<Step3Data>(defaultStep3Data);

export function useFormData() {
  const [step1Data, setStep1Data] = useAtom(step1Atom);
  const [step2Data, setStep2Data] = useAtom(step2Atom);
  const [step3Data, setStep3Data] = useAtom(step3Atom);

  return {
    step1Data,
    setStep1Data,
    step2Data,
    setStep2Data,
    step3Data,
    setStep3Data,
  };
}
