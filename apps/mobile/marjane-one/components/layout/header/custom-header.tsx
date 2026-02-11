import { View, Text } from "react-native";

import { Link, usePathname, useRouter } from "expo-router";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { BadgeWrapper } from "@/components/ui/badge-wrapper";
import { useCart } from "@/context/cartContext";
export const CustomHeader = ({ title = "Marjane One" }: { title?: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isRoot = pathname === "/" || pathname === "/index";
  const showBack = !isRoot && router.canGoBack();
  const { cartItemCount } = useCart();
  return (
    <View className="h-[65px] border-b border-gray-200 shadow-md  justify-center px-4 bg-blue-50">
      <View className="flex flex-row items-center justify-between gap-4">
        {showBack ? (
          <AntDesign
            name="arrow-left"
            size={24}
            color="black"
            onPress={() => router.back()}
          />
        ) : (
          <View className="w-6" />
        )}
        <Text className="text-lg font-semibold text-center ">{title}</Text>
        <Link href="/cart">
          <BadgeWrapper itemCount={cartItemCount}>
            <AntDesign name="shopping-cart" size={24} color="black" />
          </BadgeWrapper>
        </Link>
      </View>
    </View>
  );
};
