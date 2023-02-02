import { useEffect, useState } from "react";
import { Alert, TouchableOpacity, FlatList } from "react-native";
import { useTheme } from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";

import happyEmoji from "../../assets/happy.png";

import {
  Container,
  Header,
  Greeting,
  GreetinEmoji,
  GreetinText,
  MenuHeader,
  Title,
  MenuItemsNumber,
} from "./styles";
import { Search } from "../../components/Search";

import { ProductCard, ProductsProps } from "../../components/ProductCard";

export function Home() {
  const { COLORS } = useTheme();

  const [pizzas, setPizzas] = useState<ProductsProps[]>([]);
  const [search, setSearch] = useState("");

  async function fetchPizzas(value: string) {
    const formattedValue = value.toLowerCase().trim();

    firestore()
      .collection("pizzas")
      .orderBy("name_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductsProps[];

        setPizzas(data);
      })
      .catch(() =>
        Alert.alert("Consulta", "Não foi possível realizar a consulta")
      );
  }

  async function handleSearch() {
    fetchPizzas(search);
  }

  async function handleSearchClear() {
    setSearch("");
    fetchPizzas("");
  }

  useEffect(() => {
    fetchPizzas("");
  }, []);
  return (
    <Container>
      <Header>
        <Greeting>
          <GreetinEmoji source={happyEmoji} />
          <GreetinText>Olá, Admin</GreetinText>
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>

      <Search
        onChangeText={setSearch}
        value={search}
        onClear={handleSearchClear}
        onSearch={handleSearch}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
        renderItem={({ item }) => <ProductCard data={item} />}
      />
    </Container>
  );
}
