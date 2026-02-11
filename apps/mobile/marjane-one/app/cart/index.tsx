import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { CustomHeader } from "@/components/layout/header/custom-header";
import { useCart } from "@/context/cartContext";

const CartScreen = () => {
  const { cart, updateQuantity } = useCart();
  return (
    <>
      <CustomHeader title="Shopping Cart" />

      <View className="flex-1 bg-white">
        {cart.length > 0 ? (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="flex flex-row justify-between p-4 border-b border-gray-200">
                <View>
                  <Text className="text-lg font-semibold">{item.name}</Text>
                  <Text className="text-gray-700">{item.price} MAD</Text>
                  <Text className="text-gray-700">
                    Quantity: {item.quantity}
                  </Text>
                </View>
                <View className="flex-row items-center gap-4 mt-2">
                  <Text
                    className="font- text-blue-500 mt-2 w-6 h-6 rounded border border-blue-500 text-center"
                    onPress={() => {
                      updateQuantity(item.id, item.quantity + 1);
                    }}
                  >
                    +
                  </Text>
                  <Text
                    className="font-bold text-red-500 mt-2 w-6 h-6 rounded border border-red-500 text-center"
                    onPress={() => {
                      updateQuantity(item.id, item.quantity - 1);
                    }}
                  >
                    -
                  </Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text className="p-4 text-gray-700">Your cart is empty.</Text>
        )}
      </View>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
