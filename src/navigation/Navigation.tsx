import * as React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import fonts from "../theme/fonts";

import LoadAssets from "./LoadAssets";
import BottomTabNavigator from "./BottomTabNavigator";
import { RootStackParamList } from "./types";

const Navigation = () => {
  return (
    <LoadAssets {...{ fonts }}>
      <RootNavigator />
    </LoadAssets>
  );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      {/* <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      /> */}
    </Stack.Navigator>
  );
};

export default Navigation;
