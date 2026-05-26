import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Signup() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const user = { userName, email, password };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    router.replace("/");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TextInput placeholder="Name" onChangeText={setUserName} style={{ marginBottom: 10 }} />
      <TextInput placeholder="Email" onChangeText={setEmail} style={{ marginBottom: 10 }} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={{ marginBottom: 10 }} />

      <TouchableOpacity onPress={signup} style={{ backgroundColor: "#6C63FF", padding: 15 }}>
        <Text style={{ color: "white", textAlign: "center" }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}