import { Step1Data, Step2Data, Step3Data } from "@/state";

export interface StoredForm extends Step1Data, Step2Data, Step3Data {
  status: "PASSED" | "FAILED" | "PENDING";
  user: string;
  collateralUsdValue: number;
}
