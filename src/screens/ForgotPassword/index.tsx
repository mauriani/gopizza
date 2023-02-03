import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { useAuth } from "../../hooks/auth";

import brandImg from "../../assets/brand.png";

import { Container, Content, Title, Brand } from "./styles";
import { ButtonBack } from "../../components/ButtonBack";

export function ForgotPassword() {
  const { isLoggin, forgotPassword } = useAuth();

  const [email, setEmail] = useState("");

  function handleForgotPassword() {
    forgotPassword(email);
  }
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Content>
          <ButtonBack onPress={() => {}} />
          <Brand source={brandImg} />
          <Title>Esqueceu sua senha ?</Title>
          <Input
            type={"secondary"}
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <Button
            title="Enviar"
            type="secondary"
            isLoading={isLoggin}
            onPress={() => handleForgotPassword()}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
