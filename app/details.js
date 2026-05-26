import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Details() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Meditation Session</Text>

      <TouchableOpacity
        onPress={() => router.push("/session")}
        style={{
          marginTop: 20,
          backgroundColor: "#6C63FF",
          padding: 15,
          borderRadius: 12
        }}
      >
        <Text style={{ color: "white" }}>Start Session</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ marginTop: 20 }}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}