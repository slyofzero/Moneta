import { MainLayout, Profile } from "@/components";
import { WalletConnect } from "@/components/WalletConnect";

export default function ProfilePage() {
  return (
    <MainLayout>
      <WalletConnect
        text="Please connect your wallet to view your profile"
        otherComp={<Profile />}
      />
    </MainLayout>
  );
}
