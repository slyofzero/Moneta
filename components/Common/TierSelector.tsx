import { Step2Data, useFormData } from "@/state";
import { classNames } from "@/utils";

interface TierProps {
  name: Step2Data["tier"];
  description: string;
  feature: string;
}

function Tier({ name, description, feature }: TierProps) {
  const { setStep2Data, step2Data } = useFormData();

  function setTier(tier: Step2Data["tier"]) {
    setStep2Data((prev) => ({ ...prev, tier }));
  }

  const optionClass = classNames(
    "flex flex-col gap-2 items-center justify-center p-4 py-8 rounded-3xl hover:cursor-pointer",
    step2Data.tier === name ? "bg-zinc-700 border-2" : "bg-zinc-900"
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-6">
      <Tier
        name="Common LFP"
        description="Common Launch wihtout any special Perks"
        feature="Initials Secured + 0.2E + 2% Supply "
      />
      <Tier
        name="Gold LFP"
        feature="Must hold 0.50% $MNTA Supply to be eligible"
        description="Initials Secured + 1% Supply "
      />
    </div>
  );
}
