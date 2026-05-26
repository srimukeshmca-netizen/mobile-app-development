import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Details() {
  const router = useRouter();
  const [isFav, setIsFav] = useState(false);

  const meditationItem = {
    id: "1",
    title: "Mindful Breathing",
    target: "calmness",
    duration: "10 minutes",
  };

  const addToFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      let favorites = stored ? JSON.parse(stored) : [];

      const exists = favorites.some((item) => item.id === meditationItem.id);

      if (exists) {
        Alert.alert("Already added to favorites");
        return;
      }

      favorites.push(meditationItem);

      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));

      setIsFav(true);

      Alert.alert("Added to favorites ❤️");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F7FB" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Image */}
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
          }}
          style={{
            width: "95%",
            height: 270,
            borderRadius: 30,
            alignSelf: "center",
            marginTop: 20,
          }}
        />

        {/* Title */}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 34, fontWeight: "600", color: "#2D1E4A" }}>
            Mindful Breathing
          </Text>

          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <Text style={{ fontSize: 18, color: "#7B748C" }}>
              calmness
            </Text>

            <Ionicons
              name="time-outline"
              size={18}
              color="#7B748C"
              style={{ marginLeft: 10 }}
            />

            <Text style={{ fontSize: 18, color: "#7B748C", marginLeft: 4 }}>
              10 minutes
            </Text>
          </View>
        </View>

        {/* About */}
        <View style={{ marginTop: 40, paddingHorizontal: 22 }}>
          <Text style={{ fontSize: 32, fontWeight: "500" }}>
            About Mindful Breathing:
          </Text>

          <Text style={{ fontSize: 19, lineHeight: 32, color: "#7B748C" }}>
            Focus on your breath and maintain a steady rhythm to clear your mind.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingBottom: 25,
          alignItems: "center",
        }}
      >
        {/* Heart Button */}
        <TouchableOpacity
          onPress={addToFavorites}
          style={{
            width: 65,
            height: 65,
            borderWidth: 1.5,
            borderColor: "#FF7A59",
            borderRadius: 18,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 15,
            backgroundColor: isFav ? "#FF7A59" : "#fff",
          }}
        >
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={28}
            color={isFav ? "#fff" : "#FF7A59"}
          />
        </TouchableOpacity>

        {/* Favorites Page Button */}
        <TouchableOpacity
          onPress={() => router.push("/favorites")}
          style={{
            flex: 1,
            backgroundColor: "#FF7A59",
            height: 65,
            borderRadius: 18,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
            Go to Favorites
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}