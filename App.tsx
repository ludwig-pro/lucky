import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@shopify/restyle";
import { enableScreens } from "react-native-screens";

import { Navigation } from "./src/navigation";
import { theme } from "./src/theme";

enableScreens();

export default function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
