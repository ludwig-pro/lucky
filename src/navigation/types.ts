import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { FormatedValuableObject } from "../models/Inventory";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Protection: undefined;
  Insurance: undefined;
  Inventory: undefined;
  Profile: undefined;
};

export type ProtectionParamList = {
  ProtectionScreen: undefined;
};

export type InsuranceParamList = {
  InsuranceScreen: undefined;
};

export type InventoryParamList = {
  Inventory: undefined;
  ValuableDetails: undefined;
  Document: undefined;
  AddValuableObject: undefined;
};

export type ProfileParamList = {
  ProfileScreen: undefined;
};

export type ValuableDetailsParamList = {
  valuableId: number;
};

export interface InventoryNavigationProps<
  RouteName extends keyof InventoryParamList
> {
  navigation: StackNavigationProps<InventoryRoutes, RouteName>;
  route: RouteProp<InventoryParamList, RouteName>;
}

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: NativeStackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export type InventoryRoutes = {
  Inventory: undefined;
  ValuableDetails: { valuableObject: FormatedValuableObject };
  Document: { source: string };
  AddValuableObject: undefined;
};
