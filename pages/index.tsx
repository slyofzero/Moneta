import { Link, MainLayout } from "@/components";
import { useApi } from "@/hooks/useApi";
import { PairsData } from "@/types";
import { classNames } from "@/utils";

interface CardProps {
  title: string;
  btn1: string;
  btn2: string;
  btn1Link: string;
  btn2Link: string;
  reverse?: boolean;
}

const cardData: CardProps[] = [
  {
    title: "Moneta Finance LFP Dapp",
    btn1: "Documentation",
    btn1Link: "#",
    btn2: "Apply Now",
    btn2Link: "/form",
  },
  {
    title: "Moneta Mortgaging Dapp",
    btn1: "Documentation",
    btn1Link: "#",
    btn2: "Coming Soon",
    btn2Link: "#",
  },
  {
    title: "Moneta Dashboard As A Service",
    btn1: "Documentation",
    btn1Link: "#",
    btn2: "Coming Soon",
    btn2Link: "#",
  },
  {
    title: "Revenue Sharing",
    btn1: "Rev tracker (coming soon)",
    btn1Link: "#",
    btn2: "Coming Soon",
    btn2Link: "#",
  },
];

function Card({ title, btn1, btn1Link, btn2, btn2Link, reverse }: CardProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-8 bg-zinc-900 p-4 h-[300px] w-full rounded-md">
      <h3 className="text-3xl text-center">{title}</h3>

      <div
        className={classNames(
          "flex gap-4 text-center",
          reverse ? "flex-col-reverse" : "flex-col"
        )}
      >
        <Link
          href={btn1Link}
          className="bg-black text-white border-[1.5px] border-white p-2 rounded-md w-32"
        >
          {btn1}
        </Link>

        <Link
          href={btn2Link}
          className="bg-white text-black p-2 rounded-md w-32"
        >
          {btn2}
        </Link>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { data } = useApi<PairsData>(
    "https://api.dexscreener.com/latest/dex/tokens/0x5b342F03D126314d925Fa57A45654f92905e6451"
  );

  const price = data?.pairs.at(0)?.priceUsd;

  return (
    <MainLayout className="lg:px-32 [&>header]:lg:px-32">
      <div className="flex-grow flex flex-col items-center justify-center gap-16">
        <div className="flex flex-col gap-2 relative">
          <h6 className="text-xl text-center font-bold">
            Welcome to Moneta Finance Dapps
          </h6>
          <h6 className="text-sm">
            Navigate via below dapp options, for any queries, make sure to read
            our documentation or reach out to us on our socials
          </h6>

          <h6 className="fixed top-32 font-bold right-16 text-yellow-500">
            1 MNTA = ${price}
          </h6>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {cardData.map((data, key) => (
            <Card key={key} {...data} reverse={key % 2 === 0} />
          ))}
        </div>

        <div className="flex gap-1 text-center mb-32 lg:mb-0 text-xs font-semibold">
          <Link href={"#"} className="bg-white text-black p-2 rounded-md w-32">
            Documentation
          </Link>

          <Link
            href={"/profile"}
            className="bg-white text-black p-2 rounded-md w-32"
          >
            Profile
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
