import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Favourites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      setIsLoading(true);

      const storedFavorites = await AsyncStorage.getItem("favorites");

      const favoritesArray = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];

      setFavorites(favoritesArray);
    } catch (error) {
      console.log("Error loading favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const removeFavorite = async (id) => {
    const updated = favorites.filter((item) => item.id !== id);

    setFavorites(updated);

    await AsyncStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logo}>m</Text>

          <Ionicons
            name="settings-outline"
            size={22}
            color="#7A7A7A"
          />
        </View>

        {/* PAGE TITLE */}
        <Text style={styles.mainTitle}>
          My Favourite Exercises
        </Text>

        {/* SECTION TITLE */}
        <Text style={styles.sectionTitle}>
          Daily Meditation
        </Text>

        {/* LOADING */}
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#FF6B4A"
            style={{ marginTop: 40 }}
          />
        ) : favorites.length === 0 ? (
          <Text style={styles.emptyText}>
            No favorite meditations found
          </Text>
        ) : (
          favorites.map((item) => (
            <View key={item.id} style={styles.card}>
              
              {/* CARD IMAGE */}
              <Image
                source={{
                  uri:
                    item.image ||
                    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
                }}
                style={styles.image}
              />

              {/* CARD CONTENT */}
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                  {item.title}
                </Text>

                <Text style={styles.cardSub}>
                  {item.target}
                </Text>

                <Text style={styles.cardTime}>
                  {item.duration}
                </Text>
              </View>

              {/* REMOVE BUTTON */}
              <TouchableOpacity
                onPress={() => removeFavorite(item.id)}
                style={styles.removeBtn}
              >
                <Ionicons
                  name="heart"
                  size={18}
                  color="#FF6B4A"
                />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },

  header: {
    marginTop: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    color: "#FF6B4A",
    fontSize: 28,
    fontWeight: "900",
  },

  mainTitle: {
    textAlign: "center",
    color: "#FF6B4A",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 10,
  },

  sectionTitle: {
    marginTop: 28,
    marginLeft: 18,
    fontSize: 18,
    fontWeight: "700",
    color: "#2B1E42",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
    color: "#888",
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 14,
    marginTop: 18,
    borderRadius: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    position: "relative",
  },

  image: {
    width: "100%",
    height: 115,
    borderRadius: 12,
  },

  cardContent: {
    paddingHorizontal: 6,
    paddingTop: 10,
    paddingBottom: 8,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2B1E42",
  },

  cardSub: {
    fontSize: 12,
    color: "#9B9B9B",
    marginTop: 3,
  },

  cardTime: {
    fontSize: 12,
    color: "#9B9B9B",
    marginTop: 2,
  },

  removeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#FFF",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});