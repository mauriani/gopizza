import { useState } from "react";
import { Platform, ScrollView } from "react-native";
import { Button } from "../../components/Button";
import { ButtonBack } from "../../components/ButtonBack";
import { Input } from "../../components/Input";
import { RadioButton } from "../../components/RadioButton";

import { PIZZA_TYPES } from "../../utils/pizzaTypes";

import {
  Container,
  ContentScroll,
  Form,
  FormRow,
  Header,
  InputGroup,
  Label,
  Photo,
  Price,
  Sizes,
  Title,
} from "./styles";

export function Order() {
  const [size, setSize] = useState("");
  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ContentScroll>
        <Header>
          <ButtonBack style={{ marginBottom: 108 }} />
        </Header>

        <Photo
          source={{
            uri: "https://avatars.githubusercontent.com/u/32397288?v=4",
          }}
        />

        <Form>
          <Title>Nome da pizza</Title>

          <Label>Selecione um tamanho</Label>
          <Sizes>
            {PIZZA_TYPES.map((item) => (
              <RadioButton
                key={item.id}
                title={item.name}
                onPress={() => setSize(item.id)}
                selected={size === item.id}
              />
            ))}
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType="numeric" />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input keyboardType="numeric" />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ 00,00</Price>

          <Button title="Confirma pedido" />
        </Form>
      </ContentScroll>
    </Container>
  );
}
