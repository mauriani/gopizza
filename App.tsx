import React from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { useFonts, DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider } from "./src/hooks/auth";

import { SignIn } from "./src/screens/SignIn";

import theme from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SignIn />
        </GestureHandlerRootView>
      </AuthProvider>
    </ThemeProvider>
  );
}
