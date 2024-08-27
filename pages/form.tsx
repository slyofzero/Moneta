import {
  FormStep1,
  FormStep2,
  FormStep3,
  FormStep4,
  MainLayout,
} from "@/components";
import { FormNav } from "@/components/FormNav";
import { WalletConnect } from "@/components/WalletConnect";
import { useRouter } from "next/router";
import { useEffect } from "react";

const steps = {
  1: <FormStep1 />,
  2: <FormStep2 />,
  3: <FormStep3 />,
  4: <FormStep4 />,
};

export default function Home() {
  const router = useRouter();
  const step = Number(router.query.step) as 1 | 2 | 3 | 4;
  useEffect(() => {
    if (!isNaN(step)) {
      router.push({ pathname: router.pathname, query: { step } });
    } else {
      router.push({ pathname: router.pathname, query: { step: 1 } });
    }
  }, [step]);

  return (
    <MainLayout>
      <WalletConnect
        text="Please connect your wallet to fill the form"
        otherComp={
          <>
            <FormNav />
            {steps[step]}
          </>
        }
      />
    </MainLayout>
  );
}
