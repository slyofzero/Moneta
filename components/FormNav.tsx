import { classNames } from "@/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface FormStepProps {
  step: number;
  caption: string;
}

function FormStep({ step, caption }: FormStepProps) {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const { step: queryStep } = router.query;

  useEffect(() => {
    if (Number(queryStep) === step) setActive(true);
  }, [queryStep, step]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-28">
      <div
        className={classNames(
          "bg-white h-8 rounded-full aspect-square text-black flex items-center justify-center text-lg",
          !active ? "opacity-20" : ""
        )}
      >
        {step}
      </div>

      <h6
        className={classNames(
          "text-sm text-center",
          active ? "font-semibold" : "font-extralight"
        )}
      >
        {caption}
      </h6>
    </div>
  );
}

export function FormNav() {
  return (
    <div className="flex gap-24 justify-center items-start mt-24">
      <FormStep step={1} caption="Set your Token" />
      <FormStep step={2} caption="Enter the LFP information" />
      <FormStep step={3} caption="Project Information" />
      <FormStep step={4} caption="Submit" />
    </div>
  );
}
