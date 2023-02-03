import { useState, useEffect } from "react";
import { Alert, Platform } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useRoute, useNavigation } from "@react-navigation/native";

import { useAuth } from "../../hooks/auth";

import { Button } from "../../components/Button";
import { ButtonBack } from "../../components/ButtonBack";
import { Input } from "../../components/Input";
import { RadioButton } from "../../components/RadioButton";
import { OrderNavigationProps } from "../../@types/navigation";

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
import { ProductsProps } from "../../components/ProductCard";

type PizzaResponse = ProductsProps & {
  prices_sizes: {
    [key: string]: number;
  };
};

export function Order() {
  const [size, setSize] = useState("");
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [quantity, setQuantity] = useState(0);
  const [tableNumber, setTableNumber] = useState("");
  const [sendingOrder, setSendingOrder] = useState(false);

  const navigation = useNavigation();
  const { user } = useAuth();
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  const value = size ? Number(pizza?.prices_sizes[size]) : 0;
  const amount = size && quantity != 0 ? value * quantity : "0,00";

  async function handleOrder() {
    if (!size) {
      return Alert.alert("Pedido", "Selecione o tamanho da pizza.");
    }

    if (!quantity) {
      return Alert.alert("Pedido", "Informe o número da messa.");
    }

    if (!tableNumber) {
      return Alert.alert("Pedido", "Informe o quantidade das pizzas.");
    }

    setSendingOrder(true);

    firestore()
      .collection("orders")
      .add({
        quantity,
        amount,
        pizza: pizza.name,
        size,
        table_number: tableNumber,
        status: "Preparando",
        waiter_id: user?.id,
        image: pizza.photo_url,
      })
      .then(() => navigation.navigate("home"))
      .catch(() => {
        Alert.alert("Pedido", "Mão foi possível realizar o pedido."),
          setSendingOrder(false);
      });
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((response) => {
          setPizza(response.data() as PizzaResponse);
        })
        .catch(() =>
          Alert.alert("Pedido", "Não foi possível carregar o produto")
        );
    }
  }, [id]);
  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ContentScroll>
        <Header>
          <ButtonBack style={{ marginBottom: 108 }} />
        </Header>

        <Photo
          source={{
            uri: pizza.photo_url,
          }}
        />

        <Form>
          <Title>{pizza.name}</Title>

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
              <Input
                keyboardType="numeric"
                onChangeText={setTableNumber}
                value={tableNumber}
              />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(value) => setQuantity(Number(value))}
              />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ {amount}</Price>

          <Button
            title="Confirma pedido"
            onPress={handleOrder}
            isLoading={sendingOrder}
          />
        </Form>
      </ContentScroll>
    </Container>
  );
}
