import { Step2Data, useFormData } from "@/state";
import { classNames } from "@/utils";
import { goldEligibleThreshold } from "@/utils/constants";
import { isWalletEligibleForGold } from "@/utils/web3";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface TierProps {
  name: Step2Data["tier"];
  description: string;
  feature: string;
  allow?: boolean;
}

function Tier({ name, description, feature, allow }: TierProps) {
  const { setStep2Data, step2Data } = useFormData();

  function setTier(tier: Step2Data["tier"]) {
    if (!allow) return;
    setStep2Data((prev) => ({ ...prev, tier }));
  }

  const optionClass = classNames(
    "flex flex-col gap-2 items-center justify-center p-4 py-8 rounded-3xl",
    step2Data.tier === name ? "bg-zinc-700 border-2" : "bg-zinc-900",
    allow ? "hover:cursor-pointer" : "hover:cursor-not-allowed"
  );

  return (
    <div onClick={() => setTier(name)} className={optionClass}>
      <h3 className="font-bold text-xl capitalize">{name}</h3>
      <h6>{description}</h6>
      <h6 className="font-semibold">{feature}</h6>
    </div>
  );
}

export function TierSelector() {
  const { address } = useAccount();
  const [isGoldEligible, setIsGoldEligible] = useState(false);
  const { setStep2Data } = useFormData();

  useEffect(() => {
    isWalletEligibleForGold(String(address)).then((val) =>
      setIsGoldEligible(val)
    );
  }, [address]);

  useEffect(() => {
    if (isGoldEligible) {
      setStep2Data((prev) => ({ ...prev, tier: "Gold LFP" }));
    } else {
      setStep2Data((prev) => ({ ...prev, tier: "Common LFP" }));
    }
  }, [isGoldEligible, setStep2Data]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-6">
      <Tier
        name="Common LFP"
        description="Common Launch without any special Perks"
        feature="Initials Secured + 0.2E + 2% Supply"
        allow
      />
      <Tier
        name="Gold LFP"
        feature={`Must hold ${goldEligibleThreshold}% $MNTA Supply to be eligible`}
        description="Initials Secured + 1% Supply"
        allow={isGoldEligible}
      />
    </div>
  );
}
