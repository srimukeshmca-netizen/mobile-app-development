import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const data = [
    {
      id: "1",
      title: "Mindful Breathing",
      type: "Calmness",
      duration: "10 min",
      desc: "Relax your mind with deep breathing",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773"
    },
    {
      id: "2",
      title: "Focus Flow",
      type: "Focus",
      duration: "12 min",
      desc: "Improve concentration",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88"
    },
    {
      id: "3",
      title: "Deep Sleep",
      type: "Relax",
      duration: "15 min",
      desc: "Sleep peacefully",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
    },
    {
      id: "4",
      title: "Energy Boost",
      type: "Energy",
      duration: "8 min",
      desc: "Boost your energy",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
    },
    {
      id: "5",
      title: "Stress Relief",
      type: "Relax",
      duration: "20 min",
      desc: "Reduce stress",
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
    }
  ];

  const logout = async () => {
    await AsyncStorage.removeItem("userDetails");
    router.replace("/login");
  };

  const renderItem = ({ item, index }) => {
    const scaleAnim = new Animated.Value(0.9);

    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 400 + index * 100,
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          onPress={() =>
            router.push({ pathname: "/details", params: item })
          }
        >
          <Image source={{ uri: item.image }} style={styles.image} />

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.sub}>{item.type}</Text>
          <Text style={styles.time}>{item.duration}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hi}>Hello Sri Mukesh B 👋</Text>
          <Text style={styles.subtitle}>Find your perfect meditation</Text>
        </View>

        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <Text style={styles.section}>Popular Meditations</Text>

      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <Text style={styles.section}>Daily Meditations</Text>

      <FlatList
        data={data.slice(2)}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id + "d"}
      />

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FB",
    padding: 15
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },

  hi: {
    fontSize: 22,
    fontWeight: "bold"
  },

  subtitle: {
    color: "gray",
    marginTop: 3
  },

  logout: {
    color: "red",
    fontWeight: "bold"
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20
  },

  card: {
    backgroundColor: "white",
    width: 180,
    borderRadius: 18,
    marginRight: 12,
    padding: 10,
    elevation: 5
  },

  image: {
    width: "100%",
    height: 110,
    borderRadius: 12
  },

  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5
  },

  sub: {
    color: "gray"
  },

  time: {
    color: "#4F46E5",
    marginTop: 5,
    fontWeight: "600"
  }
});