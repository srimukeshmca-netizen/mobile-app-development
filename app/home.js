import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const DATA = [
  {
    id: "1",
    title: "Mindful Breathing",
    type: "Calm",
    duration: "10 min",
    desc: "A deep breathing session that helps reduce anxiety, calm your mind, improve focus, and bring emotional balance.",
    image: "https://source.unsplash.com/600x600/?meditation",
  },
  {
    id: "2",
    title: "Deep Sleep",
    type: "Sleep",
    duration: "15 min",
    desc: "A guided sleep meditation designed to relax your body, slow your thoughts, and help you fall into deep sleep naturally.",
    image: "https://source.unsplash.com/600x600/?sleep",
  },
  {
    id: "3",
    title: "Focus Flow",
    type: "Focus",
    duration: "12 min",
    desc: "Boost your concentration and productivity with techniques that remove distractions and improve clarity.",
    image: "https://source.unsplash.com/600x600/?focus",
  },
  {
    id: "4",
    title: "Stress Relief",
    type: "Relax",
    duration: "20 min",
    desc: "Release stress and tension with calming techniques and guided relaxation exercises for inner peace.",
    image: "https://source.unsplash.com/600x600/?nature",
  },
  {
    id: "5",
    title: "Morning Energy",
    type: "Energy",
    duration: "8 min",
    desc: "Start your day with positive energy, mindful awareness, and a refreshing mental reset.",
    image: "https://source.unsplash.com/600x600/?sunrise",
  },
  {
    id: "6",
    title: "Body Scan",
    type: "Awareness",
    duration: "14 min",
    desc: "A full-body awareness meditation that helps you relax every muscle and release tension.",
    image: "https://source.unsplash.com/600x600/?yoga",
  },
  {
    id: "7",
    title: "Anxiety Release",
    type: "Calm",
    duration: "18 min",
    desc: "Powerful guided meditation to reduce anxiety and bring emotional balance.",
    image: "https://source.unsplash.com/600x600/?calm",
  },
  {
    id: "8",
    title: "Positive Mind",
    type: "Mindset",
    duration: "10 min",
    desc: "Train your mind to think positively and build strong mental habits.",
    image: "https://source.unsplash.com/600x600/?positivity",
  },
  {
    id: "9",
    title: "Inner Peace",
    type: "Spiritual",
    duration: "20 min",
    desc: "Deep meditation for spiritual calmness and emotional healing.",
    image: "https://source.unsplash.com/600x600/?peace",
  },
  {
    id: "10",
    title: "Sleep Journey",
    type: "Sleep",
    duration: "25 min",
    desc: "Long deep sleep journey meditation for full relaxation and recovery.",
    image: "https://source.unsplash.com/600x600/?night",
  },
];

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("userDetails").then((u) => {
      if (u) setUser(JSON.parse(u));
    });
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("userDetails");
    router.replace("/login");
  };

  const Card = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push({ pathname: "/details", params: item })}
      style={styles.card}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>
          {item.type} • {item.duration}
        </Text>

        <Text style={styles.desc} numberOfLines={5}>
          {item.desc}
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Session</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hi}>Hello 👋 {user?.userName || "Mukesh"}</Text>
          <Text style={styles.subtitle}>
            Find your perfect meditation
          </Text>
        </View>

        <View style={styles.icons}>
          <TouchableOpacity onPress={() => router.push("/settings")}>
            <Text style={styles.icon}>⚙️</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={logout}>
            <Text style={styles.icon}>🚪</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SECTION */}
      <Text style={styles.section}>Recommended Meditations</Text>

      {/* HORIZONTAL LIST */}
      <FlatList
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        renderItem={Card}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
  },

  hi: {
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    color: "gray",
    marginTop: 4,
  },

  icons: {
    flexDirection: "row",
    gap: 15,
  },

  icon: {
    fontSize: 24,
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 15,
  },

  card: {
    width: width * 0.75,
    backgroundColor: "white",
    borderRadius: 22,
    marginRight: 15,
    marginTop: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 160, },

  cardContent: {
    padding: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  meta: {
    color: "#6C63FF",
    marginTop: 4,
    fontWeight: "600",
  },

  desc: {
    color: "gray",
    marginTop: 8,
    lineHeight: 18,
  },

  button: {
    marginTop: 10,
    backgroundColor: "#6C63FF",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});