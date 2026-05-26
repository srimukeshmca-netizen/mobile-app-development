import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const user = await AsyncStorage.getItem("user");
    if (!user) return alert("No account found");

    const parsed = JSON.parse(user);

    if (parsed.email === email && parsed.password === password) {
      router.replace("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🧘 CalmSpace</Text>
      <Text style={styles.subtitle}>Find peace in every breath</Text>

      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.link}>Create new account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#F6F7FB" },
  logo: { fontSize: 32, fontWeight: "bold", textAlign: "center" },
  subtitle: { textAlign: "center", marginBottom: 30, color: "gray" },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12
  },

  button: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 12,
    marginTop: 10
  },

  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },

  link: { marginTop: 20, textAlign: "center", color: "#6C63FF" }
});