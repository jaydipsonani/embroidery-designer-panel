import { Outfit } from "next/font/google";
import localFont from "next/font/local";

const outfitRegularOnline = Outfit({
  style: ["normal"],
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit-regular",
});

// const outfitMedium = Outfit({
//   style: ["normal"],
//   weight: ["500"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-outfit-medium",
// });

// const outfitSemiBold = Outfit({
//   style: ["normal"],
//   weight: ["600"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-outfit-semibold",
// });

// const outfitBold = Outfit({
//   style: ["normal"],
//   weight: ["700"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-outfit-bold",
// });
// const outfitDarkBold = Outfit({
//   style: ["normal"],
//   weight: ["900"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-outfit-darkbold",
// });

const outfitRegular = localFont({
  src: "./Outfit-Regular.ttf",
  display: "swap",
  variable: "--font-outfit-regular",
});
const outfitMedium = localFont({
  src: "./Outfit-Medium.ttf",
  display: "swap",
  variable: "--font-outfit-medium",
});
const outfitSemiBold = localFont({
  src: "./Outfit-SemiBold.ttf",
  display: "swap",
  variable: "--font-outfit-semibold",
});
const outfitBold = localFont({
  src: "./Outfit-Bold.ttf",
  display: "swap",
  variable: "--font-outfit-bold",
});
const outfitDarkBold = localFont({
  src: "./Outfit-Black.ttf",
  display: "swap",
  variable: "--font-outfit-darkbold",
});
const poppinsRegular = localFont({
  src: "./Poppins-Regular.ttf",
  display: "swap",
  variable: "--font-poppins-regular",
});
const poppinsBold = localFont({
  src: "./Poppins-SemiBold.ttf",
  display: "swap",
  variable: "--font-poppins-bold",
});
// const OutfitRegular = localFont({
//   src: "./Outfit-VariableFont_wght.ttf",
//   display: "swap",
//   variable: "--font-Outfit-regular",
// });

export {
  outfitRegularOnline,
  outfitRegular,
  outfitMedium,
  outfitSemiBold,
  outfitBold,
  poppinsBold,
  poppinsRegular,
  // OutfitRegular,
  outfitDarkBold,
 
};
