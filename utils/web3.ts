import Web3 from "web3";
import { goldEligibleThreshold, monetaCA } from "./constants";

const web3 = new Web3("https://eth.llamarpc.com");

const tokenABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
];

function toNumber(raw: string) {
  return Number(web3.utils.fromWei(String(raw), "ether"));
}

export async function isWalletEligibleForGold(walletAddress: string) {
  const contract = new web3.eth.Contract(tokenABI, monetaCA);
  const balance = toNumber(
    await contract.methods.balanceOf(walletAddress).call()
  );
  const totalSupply = toNumber(await contract.methods.totalSupply().call());
  const percentageHeld = (balance / totalSupply) * 100;
  return percentageHeld > goldEligibleThreshold;
}

export function shortenAddress(address: string, chars = 4) {
  if (address.length <= 2 * chars + 2) {
    return address; // Return the address as is if it's already short enough
  }
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
