export function shortenAddress(address: string, chars = 4) {
  if (address.length <= 2 * chars + 2) {
    return address; // Return the address as is if it's already short enough
  }
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
