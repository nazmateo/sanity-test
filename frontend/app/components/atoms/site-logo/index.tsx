import NextImage from "next/image";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "../../../lib/cn";

export interface SiteLogoProps {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  unoptimized?: boolean;
  href?: string;
  anchorProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
  unstyled?: boolean;
}

export function SiteLogo({
  className,
  src,
  href,
  anchorProps,
  alt = "Site logo",
  width = 160,
  height = 48,
  unstyled = false,
  unoptimized,
}: SiteLogoProps) {
  const shouldUnoptimize = unoptimized ?? /^https?:\/\//.test(src);

  const logo = (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(unstyled ? undefined : "block", className)}
      unoptimized={shouldUnoptimize}
    />
  );

  if (!href) {
    return logo;
  }

  return (
    <a href={href} {...anchorProps}>
      {logo}
    </a>
  );
}
