import NextImage, { ImageProps } from "next/image";
import { asset } from "@/lib/path";

/** Drop-in <Image> wrapper that prefixes /public asset paths with basePath. */
export default function Img({ src, ...rest }: ImageProps) {
  if (typeof src === "string") {
    return <NextImage src={asset(src)} {...rest} />;
  }
  return <NextImage src={src} {...rest} />;
}
