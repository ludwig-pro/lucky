import { useTheme } from "@shopify/restyle";

import { NamedStyles } from "./types";

const palette = {
  black: "#020202",
  blueyGrey: "#9399ac",
  blue: "#0042da",
  paleGrey: "#f6f7fc",
  white: "#FFFFFF",
  primary: "#0042da",
  lightPeriwinkle: "#dee0e6",
  redLight: "#CB444A",
};

export const theme = {
  colors: {
    primary: palette.blue,
    secondary: palette.blueyGrey,
    text: palette.black,
    label: palette.blueyGrey,
    tabIconDefault: palette.blueyGrey,
    tabIconSelected: palette.blue,
    white: palette.white,
    dark: palette.black,
    placeholder: palette.blueyGrey,
    iosBackground: palette.paleGrey,
    border: palette.blueyGrey,
    separator: palette.lightPeriwinkle,
    dash: palette.lightPeriwinkle,
    error: palette.redLight,
  },
  spacing: {
    xs: 4,
    s: 8,
    sm: 10,
    m: 16,
    ml: 20,
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
    header: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: "SFProDisplay-Semibold",
      color: "dark",
    },
    title1: {
      fontSize: 26,
      lineHeight: 36,
      fontFamily: "SFProDisplay-Semibold",
      color: "text",
    },
    title2: {
      fontSize: 20, // 20
      lineHeight: 28,
      fontFamily: "SFProDisplay-Semibold",
      color: "text",
    },
    title3: {
      fontSize: 16, // 20
      lineHeight: 24,
      fontFamily: "SFProDisplay-Regular",
      color: "text",
    },
    title4: {
      fontSize: 16, // 20
      lineHeight: 24,
      fontFamily: "SFProDisplay-Regular",
      color: "placeholder",
    },
    label1: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: "SFProDisplay-Semibold",
      color: "label",
    },
    label2: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: "SFProDisplay-Semibold",
      color: "label",
    },
    label3: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: "SFProDisplay-Regular",
      color: "label",
    },
    body: {
      fontSize: 16,
      fontFamily: "SFProDisplay-Regular",
      color: "text",
      lineHeight: 24,
    },
    button: {
      fontSize: 16,
      fontFamily: "SFProDisplay-Heavy",
      color: "secondary",
      lineHeight: 24,
    },
  },
};

export const makeStyles = <T extends NamedStyles<T>>(
  styles: (theme: Theme) => T
) => () => {
  const reTheme = useReTheme();
  return styles(reTheme);
};

export const useReTheme = () => useTheme<Theme>();

export type Theme = typeof theme;
