import NextImage from "next/image";
import type { ImageProps as NextImageProps } from "next/image";
import { cn } from "../../../lib/cn";

export interface ImageProps extends Omit<NextImageProps, "src" | "alt" | "width" | "height"> {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  unstyled?: boolean;
}

export function Image({
  className,
  src,
  alt = "",
  width = 1200,
  height = 800,
  unstyled = false,
  unoptimized,
  ...props
}: ImageProps) {
  const shouldUnoptimize = unoptimized ?? /^https?:\/\//.test(src);

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(unstyled ? undefined : "block", className)}
      unoptimized={shouldUnoptimize}
      {...props}
    />
  );
}
