import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    if (!userName || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const userDetails = {
      userName,
      email,
      password,
    };

    await AsyncStorage.setItem(
      "userDetails",
      JSON.stringify(userDetails)
    );

    Alert.alert("Success", "Account created");
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container}>

      <Image
        source={require("../assets/icons/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#F5F7FB",
  },

  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#6C63FF",
    fontWeight: "600",
  },
});