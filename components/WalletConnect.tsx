import { useAccount } from "wagmi";
import { ConnectButton } from "./blockchain";

interface Props {
  text: string;
  otherComp: React.ReactNode;
}

export function WalletConnect({ text, otherComp }: Props) {
  const { isConnected } = useAccount();

  return !isConnected ? (
    <div className="flex flex-col h-full flex-grow items-center justify-center gap-8">
      <h1 className="font-bold text-3xl">{text}</h1>
      <ConnectButton />
    </div>
  ) : (
    otherComp
  );
}
