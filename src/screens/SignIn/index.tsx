import React from "react";
import { Input } from "../../components/Input";

import { Container } from "./styles";

export function SignIn() {
  return (
    <Container>
      <Input
        type={"secondary"}
        placeholder="E-mail"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <Input type={"secondary"} placeholder="Senha" secureTextEntry />
    </Container>
  );
}
