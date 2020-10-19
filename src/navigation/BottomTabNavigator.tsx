import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useReTheme } from "../theme/theme";

import { BottomTabParamList } from "./types";
import {
  InsuranceNavigator,
  InventoryNavigator,
  ProfileNavigator,
  ProtectionNavigator,
} from "./Stacks";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const theme = useReTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Protection"
      tabBarOptions={{ activeTintColor: theme.colors.tabIconSelected }}
    >
      <BottomTab.Screen
        name="Protection"
        component={ProtectionNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Insurance"
        component={InsuranceNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-umbrella" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Inventory"
        component={InventoryNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-albums" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-person" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
