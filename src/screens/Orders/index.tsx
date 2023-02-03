import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { useAuth } from "../../hooks/auth";

import { ItemSeparator } from "../../components/ItemSeparator";
import { OrderCard, OrderProps } from "../../components/OrderCard";
import { Container, Header, Title } from "./styles";

export function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderProps[]>([]);
  useEffect(() => {
    const subscribe = firestore()
      .collection("orders")
      .where("waiter_id", "==", user?.id)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as OrderProps[];

        setOrders(data);
      });

    return () => subscribe();
  }, []);

  console.log(orders);
  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 125,
        }}
        renderItem={({ item, index }) => (
          <OrderCard index={index} data={item} />
        )}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  );
}
