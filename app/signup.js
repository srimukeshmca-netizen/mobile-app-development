import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!userName || !email || !password) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    const userDetails = { userName, email, password };

    await AsyncStorage.setItem(
      "userDetails",
      JSON.stringify(userDetails)
    );

    Alert.alert("Success", "Account created!");
    router.push("/login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={{ padding: 20 }}>
        <Image source={icons.menu} style={{ width: 60, height: 60 }} />

        <TextInput
          placeholder="Username"
          value={userName}
          onChangeText={setUserName}
          style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
        />

        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
        />

        <TouchableOpacity
          onPress={handleRegister}
          style={{
            backgroundColor: COLORS.primary,
            padding: 15,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Sign Up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={{ marginTop: 10, color: "blue", textAlign: "center" }}>
            Go to Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Signup;