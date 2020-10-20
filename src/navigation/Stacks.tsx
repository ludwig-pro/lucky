import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "react-native-screens/native-stack";
import { useNavigation } from "@react-navigation/native";
import { BorderlessButton } from "react-native-gesture-handler";

import Insurance from "../screens/Insurance";
import {
  ValuableDetails,
  Inventory,
  Protection,
  Profile,
  Document,
  AddValuableObject,
} from "../screens";
import { useReTheme } from "../theme";

import {
  InsuranceParamList,
  InventoryParamList,
  InventoryRoutes,
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

export const HeaderRight = () => {
  const theme = useReTheme();
  const { navigate } = useNavigation<
    NativeStackNavigationProp<InventoryRoutes, "Inventory">
  >();

  return (
    <BorderlessButton onPress={() => navigate("AddValuableObject")}>
      <Ionicons name="ios-add-circle" size={28} color={theme.colors.primary} />
    </BorderlessButton>
  );
};

export const HeaderLeft = () => {
  const theme = useReTheme();
  return (
    <Ionicons
      name="ios-close-circle"
      size={28}
      color={theme.colors.tabIconDefault}
    />
  );
};

export const InventoryNavigator = () => {
  return (
    <InventoryStack.Navigator>
      <InventoryStack.Screen
        name="Inventory"
        component={Inventory}
        options={{
          title: "Inventory Fallback",
          headerTitle: "Inventory",
          headerLargeTitle: true,
          headerRight: () => <HeaderRight />,
          headerHideShadow: true,
        }}
      />
      <InventoryStack.Screen
        name="ValuableDetails"
        component={ValuableDetails}
        options={{
          headerShown: false,
          stackPresentation: "fullScreenModal",
        }}
      />
      <InventoryStack.Screen
        name="Document"
        component={Document}
        options={{
          headerShown: false,
          stackPresentation: "fullScreenModal",
        }}
      />
      <InventoryStack.Screen
        name="AddValuableObject"
        component={AddValuableObject}
        options={{
          stackPresentation: "fullScreenModal",
        }}
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
