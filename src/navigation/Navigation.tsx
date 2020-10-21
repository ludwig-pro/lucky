import * as React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import fonts from "../theme/fonts";
import { assets as InventoryAssets } from "../services/fixtures";

import LoadAssets from "./LoadAssets";
import BottomTabNavigator from "./BottomTabNavigator";
import { RootStackParamList } from "./types";

const assets = [...InventoryAssets];

const Navigation = () => {
  return (
    <LoadAssets {...{ fonts, assets }}>
      <RootNavigator />
    </LoadAssets>
  );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default Navigation;
