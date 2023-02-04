import { Roboto, Roboto_Mono } from "@next/font/google"

export const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
})

export const robotoMono = Roboto_Mono({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
})
