import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { Product } from "../screens/Product";
import { Order } from "../screens/Order";
import { Orders } from "../screens/Orders";

const { Navigator, Screen } = createNativeStackNavigator();

export function UserStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="orders" component={Orders} />
      <Screen name="order" component={Order} />
      <Screen name="home" component={Home} />
      <Screen name="product" component={Product} />
    </Navigator>
  );
}
