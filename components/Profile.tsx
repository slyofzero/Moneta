import { useApi } from "@/hooks/useApi";
import { StoredForm } from "@/types";
import { useAccount } from "wagmi";
import { FaSquare } from "react-icons/fa";
import { Link } from "./Common";

export interface ProfileResponse {
  message: string;
  data: StoredForm[];
}

function Launch({ data }: { data: StoredForm }) {
  const { name, symbol, supply, status, raiseType, website, chartUrl } = data;
  const statusStyle =
    status === "PENDING"
      ? "bg-orange-500"
      : status === "FAILED"
        ? "bg-red-500"
        : "bg-green-500";

  return (
    <div className="flex flex-col gap-4 mx-36">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h4 className="text-2xl">Raise Type - {raiseType}</h4>
        </div>
        <span
          className={`${statusStyle} flex items-center justify-center px-2 rounded-md text-xs font-semibold text-black gap-2`}
        >
          <FaSquare /> {status}
        </span>
      </div>

      <div className="flex flex-col text-sm">
        <div className="flex justify-between py-2 border-b-[1.5px] border-gray-900">
          <span>Token name:</span>
          <span>{name}</span>
        </div>

        <div className="flex justify-between py-2 border-b-[1.5px] border-gray-900">
          <span>Token symbol:</span>
          <span>{symbol}</span>
        </div>

        <div className="flex justify-between py-2 border-b-[1.5px] border-gray-900">
          <span>Total Supply:</span>
          <span>{supply.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex gap-8 mt-8 text-center">
        <Link
          href={website}
          className="bg-white text-black p-2 rounded-xl w-36"
        >
          Website
        </Link>

        <Link
          href={chartUrl || "#"}
          className="bg-white text-black p-2 px-4 rounded-xl w-fit"
        >
          {status === "PASSED" ? "Chart" : "Launch is pending"}
        </Link>
      </div>
    </div>
  );
}

export function Profile() {
  const { address } = useAccount();
  const { data } = useApi<ProfileResponse>(`/api/form?user=${address}`);

  return (
    <div className="flex flex-col mt-16 gap-8">
      <h1 className="text-4xl">Launches</h1>

      <div className="flex flex-col gap-4">
        {data?.data.map((data, key) => <Launch data={data} key={key} />)}
      </div>
    </div>
  );
}
