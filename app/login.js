import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // ✅ LOGIN FUNCTION (FIX)
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please fill all fields");
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem("userDetails");

      if (!storedUser) {
        Alert.alert("Error", "No user found. Please sign up first.");
        return;
      }

      const parsed = JSON.parse(storedUser);

      if (parsed.email === email && parsed.password === password) {
        router.push("/home");
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => <></>,
          headerTitle: "",
        }}
      />

      <View style={{ padding: 20 }}>
        {/* ICON */}
        <View
          style={{
            padding: 20,
            marginHorizontal: "auto",
            backgroundColor: "#f0f0f0",
            borderRadius: 50,
            height: 90,
            ...SHADOWS.medium,
          }}
        >
          <Image source={icons.menu} style={{ width: 50, height: 50 }} />
        </View>

        {/* FORM */}
        <View style={{ marginTop: 20 }}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              marginBottom: 10,
            }}
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              marginBottom: 10,
            }}
          />

          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: COLORS.primary,
              padding: 15,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        {/* SIGNUP LINK */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={{ color: "blue" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;