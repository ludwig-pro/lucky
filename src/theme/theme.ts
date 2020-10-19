import { createText, createBox, useTheme } from "@shopify/restyle";

import { NamedStyles } from "./types";

const palette = {
  black: "#020202",
  blueyGrey: "#9399ac",
  blue: "#0042da",
  paleGrey: "#f6f7fc",
};

export const theme = {
  colors: {
    primary: palette.blue,
    text: palette.black,
    tabIconDefault: palette.blueyGrey,
    tabIconSelected: palette.blue,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 48,
  },
  breakpoints: {
    phone: 0, // ?
    tablet: 768, // ?
    largeTablet: 1024, // ?
  },
  borderRadii: {
    none: 0,
    xs: 2,
    s: 4,
    m: 10,
    ml: 14,
    l: 28,
    xl: 56,
  },
  textVariants: {
    hero: {
      fontSize: 70,
      lineHeight: 80,
      fontFamily: "SFProDisplay-Bold",
      color: "white",
      textAlign: "center",
    },
    title1: {
      fontSize: 28,
      fontFamily: "SFProDisplay-Bold",
      color: "secondary",
    },
    title2: {
      fontSize: 24,
      lineHeight: 30,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
    body: {
      fontSize: 16,
      fontFamily: "SFProDisplay-Regular",
      color: "text",
      lineHeight: 24,
    },
    button: {
      fontSize: 15,
      fontFamily: "SFProDisplay-Medium",
    },
    header: {
      fontSize: 12,
      fontFamily: "SFProDisplay-Semibold",
      lineHeight: 24,
      color: "secondary",
    },
  },
};

export const makeStyles = <T extends NamedStyles<T>>(
  styles: (theme: Theme) => T
) => () => {
  const reTheme = useReTheme();
  return styles(reTheme);
};

export const Text = createText<Theme>();

export const Box = createBox<Theme>();

export const useReTheme = () => useTheme<Theme>();

export type Theme = typeof theme;
