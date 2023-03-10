import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { useAuth } from "../../hooks/auth";

import brandImg from "../../assets/brand.png";

import {
  Container,
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordButtonLabel,
} from "./styles";

export function SignIn() {
  const navigation = useNavigation();
  const { signIn, isLoggin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    signIn(email, password);
  }

  function handleForgotPassword() {
    navigation.navigate("forgotPassword");
  }
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Content>
          <Brand source={brandImg} />
          <Title>Login</Title>
          <Input
            type={"secondary"}
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <Input
            type={"secondary"}
            placeholder="Senha"
            secureTextEntry
            onChangeText={setPassword}
          />

          <ForgotPasswordButton onPress={handleForgotPassword}>
            <ForgotPasswordButtonLabel>
              Esqueci minha senha
            </ForgotPasswordButtonLabel>
          </ForgotPasswordButton>

          <Button
            title="Entrar"
            type="secondary"
            isLoading={isLoggin}
            onPress={() => handleSignIn()}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
