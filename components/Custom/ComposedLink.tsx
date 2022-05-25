import { SxProps } from "@mui/material";
import Link from "@mui/material/Link";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import * as React from "react";

interface ComposedLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Omit<NextLinkProps, "href" | "as" | "onClick" | "onMouseEnter"> {
  to: NextLinkProps["href"];
  linkAs?: NextLinkProps["as"];
  sx?: SxProps;
}

export const ComposedLink = React.forwardRef<
  HTMLAnchorElement,
  ComposedLinkProps
>(function ComposedLink(props, ref) {
  const {
    to,
    linkAs,
    replace,
    scroll,
    shallow,
    prefetch,
    locale,
    sx,
    ...other
  } = props;

  return (
    <NextLink
      href={to || "#"}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      <Link
        sx={{ textDecoration: "none", color: "#000", ...sx }}
        ref={ref}
        {...other}
      />
    </NextLink>
  );
});
