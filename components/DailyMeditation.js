import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";

import useFetch from "../hook/useFetch";

const DailyMeditation = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch("search", {
    query: "meditation",
    num_pages: "1",
  });

  const handleNavigate = (item) => {
    router.push("/details");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleNavigate(item)}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={styles.desc} numberOfLines={2}>
          {item.target || "Relax your mind and improve focus"}
        </Text>

        <Text style={styles.time}>{item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌿 Daily Meditation</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#6C63FF" />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

export default DailyMeditation;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: 90,
    height: 90,
  },

  content: {
    flex: 1,
    padding: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  desc: {
    color: "gray",
    fontSize: 12,
    marginTop: 4,
  },

  time: {
    marginTop: 6,
    color: "#6C63FF",
    fontWeight: "bold",
  },
});