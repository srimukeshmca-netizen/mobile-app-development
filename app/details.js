import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Details() {
  const item = useLocalSearchParams();
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>

      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.card}>

        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.row}>
          <Text style={styles.tag}>{item.type}</Text>
          <Text style={styles.time}>{item.duration}</Text>
        </View>

        <Text style={styles.section}>About This Meditation</Text>
        <Text style={styles.desc}>
          {item.desc ||
            "This guided meditation helps reduce stress, improve focus, and bring mental clarity. Practice daily to improve emotional balance and mindfulness."}
        </Text>

        <Text style={styles.section}>Benefits</Text>
        <Text style={styles.desc}>
          • Reduces stress{"\n"}
          • Improves focus{"\n"}
          • Better sleep quality{"\n"}
          • Increases calmness
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Start Session
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FB" },

  image: {
    width: "100%",
    height: 280
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20
  },

  title: { fontSize: 22, fontWeight: "bold" },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },

  tag: {
    backgroundColor: "#E6E6FF",
    padding: 6,
    borderRadius: 8,
    color: "#4F46E5"
  },

  time: { fontWeight: "bold", color: "#4F46E5" },

  section: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold"
  },

  desc: {
    marginTop: 5,
    color: "gray",
    lineHeight: 20
  },

  button: {
    marginTop: 20,
    backgroundColor: "#4F46E5",
    padding: 15,
    borderRadius: 12,
    alignItems: "center"
  }
});