import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Session() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>🧘 Relax & Breathe</Text>

      <Text style={{ marginTop: 10, color: "gray" }}>
        Your session is running...
      </Text>

      <TouchableOpacity
        onPress={() => router.replace("/home")}
        style={{
          marginTop: 30,
          backgroundColor: "red",
          padding: 15,
          borderRadius: 12
        }}
      >
        <Text style={{ color: "white" }}>End Session</Text>
      </TouchableOpacity>
    </View>
  );
}