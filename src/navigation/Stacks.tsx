import * as React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import Insurance from "../screens/Insurance";
import Inventory from "../screens/Inventory";
import Profile from "../screens/Profile";
import Protection from "../screens/Protection";

import {
  InsuranceParamList,
  InventoryParamList,
  ProfileParamList,
  ProtectionParamList,
} from "./types";

const ProtectionStack = createNativeStackNavigator<ProtectionParamList>();
const InsuranceStack = createNativeStackNavigator<InsuranceParamList>();
const InventoryStack = createNativeStackNavigator<InventoryParamList>();
const ProfileStack = createNativeStackNavigator<ProfileParamList>();

export const ProtectionNavigator = () => {
  return (
    <ProtectionStack.Navigator>
      <ProtectionStack.Screen
        name="ProtectionScreen"
        component={Protection}
        options={{ headerTitle: "Inventory Title", headerLargeTitle: true }}
      />
    </ProtectionStack.Navigator>
  );
};

export const InsuranceNavigator = () => {
  return (
    <InsuranceStack.Navigator>
      <InsuranceStack.Screen
        name="InsuranceScreen"
        component={Insurance}
        options={{ headerTitle: "Insurance Title", headerLargeTitle: true }}
      />
    </InsuranceStack.Navigator>
  );
};

export const InventoryNavigator = () => {
  return (
    <InventoryStack.Navigator>
      <InventoryStack.Screen
        name="InventoryScreen"
        component={Inventory}
        options={{ headerTitle: "Inventory Title", headerLargeTitle: true }}
      />
    </InventoryStack.Navigator>
  );
};

export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{ headerTitle: "Profile Title", headerLargeTitle: true }}
      />
    </ProfileStack.Navigator>
  );
};
