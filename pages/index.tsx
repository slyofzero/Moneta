import {
  FormStep1,
  FormStep2,
  FormStep3,
  FormStep4,
  MainLayout,
} from "@/components";
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
    }
  }, [step]);

  return <MainLayout>{steps[step]}</MainLayout>;
}
