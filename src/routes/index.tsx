import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../hooks/auth";
import { AuthStackRoutes } from "./auth.stack.routes";
import { UserStackRoutes } from "./user.stack.routes";

export function Routes() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user ? <UserStackRoutes /> : <AuthStackRoutes />}
    </NavigationContainer>
  );
}
