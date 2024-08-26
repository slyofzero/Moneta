import { Providers } from "@/components";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";

import { Poppins, Saira } from "next/font/google";

// Instantiate the Saira font with the desired options
export const saira = Saira({
  weight: ["400", "700"], // You can specify the font weights you need
  subsets: ["latin"], // Specify the subsets
  variable: "--font-saira", // Optional: Set a CSS variable if you want to use the font in global styles
});

export const poppins = Poppins({
  weight: ["400", "700"], // You can specify the font weights you need
  subsets: ["latin"], // Specify the subsets
  variable: "--font-poppings", // Optional: Set a CSS variable if you want to use the font in global styles
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
