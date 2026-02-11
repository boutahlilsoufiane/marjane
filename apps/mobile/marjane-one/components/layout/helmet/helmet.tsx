import React from "react";
import { ScrollView, StyleProp, ViewStyle } from "react-native";

export const Helmet = ({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
}) => {
  return <ScrollView contentContainerStyle={styles}>{children}</ScrollView>;
};
