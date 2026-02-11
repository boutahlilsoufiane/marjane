import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { CustomHeader } from "@/components/layout/header/custom-header";
import { Helmet } from "@/components/layout/helmet/helmet";
import { products } from "@/MOCK/products";
import { useCart } from "@/context/cartContext";
import { useToast } from "@/context/toastContext";
import { Toast } from "@/components/ui/toast";

const ProductItem = ({
  item,
  handleAddToCart,
}: {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    qty: number;
  };
  handleAddToCart: (product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    qty: number;
  }) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const onAddTocart = () => {
    setLoading(true);
    setTimeout(() => {
      handleAddToCart(item);
      setLoading(false);
    }, 500);
  };
  return (
    <View className="w-[165px] h-[300px] bg-gray-200 rounded-lg mr-4 border-shadow-md border border-gray-300 ">
      <Image
        resizeMode="cover"
        source={{ uri: item.imageUrl }}
        className="w-full h-[140px] rounded-t-lg"
      />
      <View className="flex-1  gap-2">
        <Text className="p-1" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="p-1" numberOfLines={2}>
          {item.description}
        </Text>

        <View className="flex-wrap flex-row items-center justify-between">
          <Text className="text-blue-500 font-bold">
            {item.price +
              "MAD" +
              " " +
              (item.qty > 0 ? item.qty + " in stock" : "Out of stock")}
          </Text>
        </View>
        <View className="flex flex-grow justify-end mb-2">
          {item.qty > 0 && (
            <Pressable
              onPress={onAddTocart}
              className=" bg-green-500 py-1 rounded mx-2 justify-center items-center"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white px-3 py-1 rounded">
                  Add to Cart
                </Text>
              )}
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};
const Screen = () => {
  const { addToCart } = useCart();
  const { toast, showToast } = useToast();
  const handleAddToCart = (product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    qty: number;
  }) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    showToast("Product added to cart!", "success");
  };

  return (
    <>
      <CustomHeader />

      <Helmet styles={{ flex: 1 }}>
        <View className="flex-1 bg-white">
          <View className="p-4">
            <Text className="text-lg font-semibold mb-2">
              Welcome to Marjane One!
            </Text>
            <Text className="text-gray-700">
              This is the home screen of the Marjane One app. Explore our
              products and enjoy your shopping experience.
            </Text>
          </View>
          <View>
            <FlatList
              data={products}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{
                paddingHorizontal: 16,
              }}
              renderItem={({ item }) => (
                <ProductItem item={item} handleAddToCart={handleAddToCart} />
              )}
            />
          </View>
          <Toast
            variant={toast.variant}
            message={toast.message}
            visible={toast.isVisible}
          />
        </View>
      </Helmet>
    </>
  );
};

export default Screen;

const styles = StyleSheet.create({});
