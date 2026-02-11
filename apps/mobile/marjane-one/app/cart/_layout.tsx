import "@/global.css";

import { Stack } from "expo-router";

export { ErrorBoundary } from "expo-router";

export default function CartLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ header: () => undefined }} />
      </Stack>
    </>
  );
}
