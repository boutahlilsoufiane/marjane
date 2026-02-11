import { CartProvider } from "@/context/cartContext";
import { ToastProvider } from "@/context/toastContext";
import "@/global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <StatusBar translucent={true} />

      <SafeAreaView className="flex-1 bg-blue-50">
        <ToastProvider>
          <CartProvider>
            <Stack screenOptions={{ header: () => undefined }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="cart" />
            </Stack>
          </CartProvider>
        </ToastProvider>
      </SafeAreaView>
    </>
  );
}
