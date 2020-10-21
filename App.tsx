import * as React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@shopify/restyle";
import { enableScreens } from "react-native-screens";

import { Navigation } from "./src/navigation";
import { theme } from "./src/theme";
import store from "./src/models/stores";

enableScreens();

// Issue with SplashScreen :
// [Unhandled promise rejection: Error: Native splash screen is already hidden.
// Call this method before rendering any view.]
// https://github.com/expo/expo/issues/9286

export default function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
