import { FlatList } from "react-native";
import { ItemSeparator } from "../../components/ItemSeparator";
import { OrderCard } from "../../components/OrderCard";
import { Container, Header, Title } from "./styles";

export function Orders() {
  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={["1", "2", "3"]}
        keyExtractor={(item) => item}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 125,
        }}
        renderItem={({ item, index }) => <OrderCard index={index} />}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  );
}
