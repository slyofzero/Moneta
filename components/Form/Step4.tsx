import { poppins, saira } from "@/pages/_app";
import { useFormData } from "@/state";
import { PairData, PairsData, StoredForm } from "@/types";
import { apiFetcher } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Link } from "../Common";

interface RowProps {
  item: string;
  value: any;
}
function Row({ item, value }: RowProps) {
  return (
    <div className="flex justify-between border-b-[1.5px] border-gray-800 pb-1">
      <span className="text-gray-400">{item}</span>
      <span className={saira.className}>{value || "—"}</span>
    </div>
  );
}

export function FormStep4() {
  const { step1Data, step2Data, step3Data } = useFormData();
  const router = useRouter();
  const { address } = useAccount();

  const [pairData, setPairData] = useState<PairData | null>(null);

  useEffect(() => {
    async function getCollateralValue() {
      const tokenData = await apiFetcher<PairsData>(
        `https://api.dexscreener.com/latest/dex/tokens/${step2Data.collateralAsset}`
      );

      const firstPair = tokenData?.data.pairs.at(0);
      setPairData(firstPair || null);
    }

    getCollateralValue();
  }, [step2Data]);

  const collateralUsdValue = Number(
    (step2Data.collateralAmount * Number(pairData?.priceUsd)).toFixed(2)
  );

  const tokenData = {
    "CA Deployer": step1Data.deployer,
    "Total Supply": step1Data.supply,
    "Token Liquidity %": step2Data.liquidity,
    "Loan Amount LP + Marketing":
      step2Data.loanAmountLP + step2Data.loanAmountMarketing,
    "Loan Disbursement Time": step2Data.loanDisbursementDate,
    "Liquidity Unlock Time [if finalised]": `${step2Data.liquidityLocked} days`,
    "Collateral Token": `${step2Data.collateralAsset} (${pairData?.baseToken.symbol})`,
    "Collateral Token Amount": `${step2Data.collateralAmount} ${pairData?.baseToken.symbol}`,
    "Collateral Token $ Value": `$${collateralUsdValue}`,
    "Token Launch Time": step2Data.launchDate,
    "Preferred LP Provider": step2Data.preferredLPProvider,
    "Launch Type": step2Data.launchType,
  };

  const loanType = {
    Tier: step2Data.tier,
    "LFP Type": step2Data.raiseType,
  };

  const websiteData = {
    Website: step3Data.website,
    Twitter: step3Data.twitter,
    Github: step3Data.github,
    Youtube: step3Data.youtube,
    Content: step3Data.content,
    Telegram: step3Data.telegram,
    Discord: step3Data.discord,
    Reddit: step3Data.reddit,
  };

  async function completeForm() {
    if (!address) return;

    const toSendData: StoredForm = {
      ...step1Data,
      ...step2Data,
      ...step3Data,
      status: "PENDING",
      user: address,
      collateralUsdValue,
    };
    const response = await fetch("/api/form", {
      method: "POST",
      body: JSON.stringify({ data: toSendData }),
    });
    if (response.ok) {
      router.push("/profile");
    }
  }

  return (
    <div className="flex flex-col gap-16">
      <div className={`flex flex-col gap-4 mt-32 ${poppins.className}`}>
        {Object.entries(tokenData).map(([item, value]) => Row({ item, value }))}
      </div>

      <div className={`flex flex-col gap-4 ${poppins.className}`}>
        {Object.entries(loanType).map(([item, value]) => Row({ item, value }))}
      </div>

      <div className={`flex flex-col gap-4 ${poppins.className}`}>
        {Object.entries(websiteData).map(([item, value]) =>
          Row({ item, value })
        )}
      </div>

      <Row item="Description" value={step3Data.description} />

      <div className="flex gap-4 justify-end mb-32">
        <Link
          href={"/form?step=3"}
          className="border-[1.5px] px-16 py-2 rounded-xl"
        >
          Back
        </Link>
        <button
          onClick={completeForm}
          className="bg-white text-black border-[1.5px] px-16 py-2 rounded-xl font-semibold"
        >
          Complete
        </button>
      </div>
    </div>
  );
}
