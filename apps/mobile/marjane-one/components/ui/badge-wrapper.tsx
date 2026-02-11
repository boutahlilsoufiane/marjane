import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface BadgeWrapperProps {
  children: React.ReactNode;
  itemCount: number;
}

export const BadgeWrapper: React.FC<BadgeWrapperProps> = ({
  children,
  itemCount,
}) => {
  if (itemCount <= 0) {
    return <>{children}</>;
  }

  const displayCount = itemCount > 99 ? "99+" : itemCount.toString();

  return (
    <View style={styles.container}>
      {children}

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{displayCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -6,
    right: -6,

    minWidth: 18,
    height: 18,
    borderRadius: 9,

    backgroundColor: "#ff3b30",
    borderWidth: 1.5,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },

  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
    paddingHorizontal: 4,
    textAlign: "center",
    includeFontPadding: false,
  },
});
