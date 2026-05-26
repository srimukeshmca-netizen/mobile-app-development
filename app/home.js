import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const POPULAR_DATA = [
  {
    id: "1",
    title: "Mindful Breathing",
    target: "calmness",
    duration: "10 minutes",
    shortDescription:
      "Focus on your breath and maintain a steady rhythm to clear your mind and reduce stress.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000",
  },
  {
    id: "2",
    title: "Body Scan Meditation",
    target: "relaxation",
    duration: "15 minutes",
    shortDescription:
      "Scan through each part of your body, relaxing your muscles and relieving tension.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000",
  },
  {
    id: "3",
    title: "Loving-Kindness Meditation",
    target: "compassion",
    duration: "20 minutes",
    shortDescription:
      "Send thoughts of love and kindness to yourself and others to foster positive emotions.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
  },
  {
    id: "4",
    title: "Guided Visualization",
    target: "mental clarity",
    duration: "12 minutes",
    shortDescription:
      "Visualize a peaceful scene to calm your mind and enhance focus.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000",
  },
  {
    id: "5",
    title: "Mantra Meditation",
    target: "inner peace",
    duration: "10 minutes",
    shortDescription:
      "Repeat a calming word or phrase to quiet the mind and center yourself.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1000",
  },
  {
    id: "6",
    title: "Chakra Meditation",
    target: "energy balance",
    duration: "25 minutes",
    shortDescription:
      "Focus on aligning your energy centers to achieve balance and peace.",
    image:
      "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=1000",
  },
  {
    id: "7",
    title: "Walking Meditation",
    target: "mind-body connection",
    duration: "15 minutes",
    shortDescription:
      "Combine walking with mindfulness to bring awareness to movement.",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1000",
  },
  {
    id: "8",
    title: "Zen Meditation",
    target: "concentration",
    duration: "30 minutes",
    shortDescription:
      "Practice sitting meditation to develop concentration and insight.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1000",
  },
];

const DAILY_DATA = [
  {
    id: "11",
    title: "Loving-Kindness Meditation",
    target: "calmness",
    duration: "10 minutes",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
  },
  {
    id: "12",
    title: "Body Scan Meditation",
    target: "relaxation",
    duration: "15 minutes",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
  },
];

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("userDetails").then((u) => {
      if (u) {
        setUser(JSON.parse(u));
      }
    });
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("userDetails");
    router.replace("/login");
  };

  const renderPopularCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.popularCard}
      onPress={() =>
        router.push({
          pathname: "/details",
          params: item,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.popularImage} />

      <View style={styles.tag}>
        <Text style={styles.tagText}>{item.target}</Text>
      </View>

      <Text numberOfLines={1} style={styles.cardTitle}>
        {item.title}
      </Text>

      <Text numberOfLines={3} style={styles.description}>
        {item.shortDescription}
      </Text>

      <Text style={styles.duration}>{item.duration}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require("../assets/icons/logo.png")}
            style={styles.logo}
          />

          <View>
            <Text style={styles.hello}>
              Hello {user?.userName || "Mukesh"}!
            </Text>

            <Text style={styles.subtitle}>
              Find your perfect meditation
            </Text>
          </View>
        </View>

        <View style={styles.iconRow}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => alert("Settings")}
          >
            <Text style={styles.icon}>⚙️</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} onPress={logout}>
            <Text style={styles.icon}>🚪</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* POPULAR */}
      <Text style={styles.sectionTitle}>Popular Meditations</Text>

      <FlatList
        horizontal
        data={POPULAR_DATA}
        renderItem={renderPopularCard}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ paddingLeft: 10, paddingRight: 20 }}
      />

      {/* DAILY */}
      <Text style={styles.dailyTitle}>Daily Meditation</Text>

      {DAILY_DATA.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.dailyCard}
          activeOpacity={0.9}
          onPress={() =>
            router.push({
              pathname: "/details",
              params: item,
            })
          }
        >
          <Image
            source={{ uri: item.image }}
            style={styles.dailyImage}
          />

          <View style={styles.dailyContent}>
            <Text style={styles.dailyCardTitle}>{item.title}</Text>

            <Text style={styles.dailyText}>{item.target}</Text>

            <Text style={styles.dailyText}>{item.duration}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F6",
    paddingTop: 45,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    alignItems: "center",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },

  hello: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1B1B1B",
  },

  subtitle: {
    color: "#777",
    marginTop: 2,
    fontSize: 13,
  },

  iconRow: {
    flexDirection: "row",
    gap: 10,
  },

  iconBtn: {
    backgroundColor: "#fff",
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },

  icon: {
    fontSize: 18,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginLeft: 12,
    marginBottom: 10,
    color: "#222",
  },

  popularCard: {
    width: width * 0.42,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 10,
    marginRight: 14,
    marginBottom: 8,
  },

  popularImage: {
    width: "100%",
    height: 100,
    borderRadius: 16,
  },

  tag: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 30,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    marginTop: 10,
  },

  tagText: {
    fontSize: 10,
    color: "#777",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
    color: "#222",
  },

  description: {
    color: "#666",
    fontSize: 11,
    marginTop: 6,
    lineHeight: 16,
  },

  duration: {
    color: "#A5A5A5",
    marginTop: 10,
    fontSize: 11,
  },

  dailyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 25,
    marginLeft: 12,
    marginBottom: 15,
  },

  dailyCard: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 18,
  },

  dailyImage: {
    width: "100%",
    height: 120,
  },

  dailyContent: {
    padding: 12,
  },

  dailyCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  dailyText: {
    color: "#777",
    marginTop: 4,
    fontSize: 13,
  },
});

