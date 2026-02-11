import { Animated, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";

interface ToastProps {
  message: string;
  visible?: boolean;
  variant: "success" | "error" | "info";
  onHide?: () => void;
  timeout?: number;
}
export const Toast = ({
  message,
  visible = false,
  variant,
  onHide,
  timeout = 3000,
}: ToastProps) => {
  const translateY = useRef(new Animated.Value(-60)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = useState(visible);
  useEffect(() => {
    if (visible) {
      setShouldRender(true);

      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          damping: 18,
          stiffness: 140,
          overshootClamping: true,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        animateOut();
      }, timeout);

      return () => clearTimeout(timer);
    } else {
      animateOut();
    }
  }, [visible, timeout]);

  const animateOut = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -60,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShouldRender(false);
      onHide?.();
    });
  };
  if (!visible) return null;

  if (!shouldRender) return null;

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        opacity,
      }}
      className={`absolute top-2 px-4 w-[90%] left-[5%] h-[40px] rounded flex flex-row justify-between items-center ${variant === "success" ? "bg-green-300" : variant === "error" ? "bg-red-300" : "bg-yellow-300"}`}
    >
      <Text>{message}</Text>
      <View>
        {variant === "success" ? (
          <Feather name="check-circle" size={16} color="green" />
        ) : variant === "error" ? (
          <Feather name="x-circle" size={16} color="red" />
        ) : (
          <Feather name="alert-circle" size={16} color="yellow" />
        )}
      </View>
    </Animated.View>
  );
};
