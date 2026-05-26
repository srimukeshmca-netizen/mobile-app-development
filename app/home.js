import React, {
    useEffect,
    useState,
  } from "react";
  
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
  
  import { useTheme } from "../context/ThemeContext";
  
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
  ];
  
  export default function Home() {
    const router = useRouter();
  
    const [user, setUser] = useState(null);
  
    const { theme, toggleTheme } = useTheme();
  
    const darkMode = theme === "dark";
  
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
        style={[
          styles.popularCard,
          {
            backgroundColor: darkMode
              ? "#1E1E1E"
              : "#FFFFFF",
          },
        ]}
        onPress={() =>
          router.push({
            pathname: "/details",
            params: item,
          })
        }
      >
        <Image
          source={{ uri: item.image }}
          style={styles.popularImage}
        />
  
        <View style={styles.tag}>
          <Text style={styles.tagText}>
            {item.target}
          </Text>
        </View>
  
        <Text
          numberOfLines={1}
          style={[
            styles.cardTitle,
            {
              color: darkMode
                ? "#FFFFFF"
                : "#222",
            },
          ]}
        >
          {item.title}
        </Text>
  
        <Text
          numberOfLines={3}
          style={[
            styles.description,
            {
              color: darkMode
                ? "#BBBBBB"
                : "#666",
            },
          ]}
        >
          {item.shortDescription}
        </Text>
  
        <Text style={styles.duration}>
          {item.duration}
        </Text>
      </TouchableOpacity>
    );
  
    return (
      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor: darkMode
              ? "#111111"
              : "#F4F4F6",
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <TouchableOpacity onPress={toggleTheme}>
              <Image
                source={require("../assets/icons/logo.png")}
                style={styles.logo}
              />
            </TouchableOpacity>
  
            <View>
              <Text
                style={[
                  styles.hello,
                  {
                    color: darkMode
                      ? "#FFFFFF"
                      : "#1B1B1B",
                  },
                ]}
              >
                Hello {user?.userName || "Mukesh"}!
              </Text>
  
              <Text
                style={[
                  styles.subtitle,
                  {
                    color: darkMode
                      ? "#BBBBBB"
                      : "#777",
                  },
                ]}
              >
                Find your perfect meditation
              </Text>
            </View>
          </View>
  
          <View style={styles.iconRow}>
            <TouchableOpacity
              style={[
                styles.iconBtn,
                {
                  backgroundColor: darkMode
                    ? "#1E1E1E"
                    : "#fff",
                },
              ]}
              onPress={() => router.push("/menu")}
            >
              <Text style={styles.icon}>⚙️</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[
                styles.iconBtn,
                {
                  backgroundColor: darkMode
                    ? "#1E1E1E"
                    : "#fff",
                },
              ]}
              onPress={logout}
            >
              <Text style={styles.icon}>🚪</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        {/* QUOTE */}
        <View
          style={[
            styles.quoteBox,
            {
              borderColor: darkMode
                ? "#333333"
                : "#D7D7D7",
            },
          ]}
        >
          <Text
            style={[
              styles.quoteText,
              {
                color: darkMode
                  ? "#FFFFFF"
                  : "#1E1E1E",
              },
            ]}
          >
            "Knowledge is of two kinds: that which
            is absorbed and that which is heard.
            And that which is heard does not
            profit if it is not absorbed."
          </Text>
        </View>
  
        {/* POPULAR */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: darkMode
                ? "#FFFFFF"
                : "#222",
            },
          ]}
        >
          Popular Meditations
        </Text>
  
        <FlatList
          horizontal
          data={POPULAR_DATA}
          renderItem={renderPopularCard}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 10,
            paddingRight: 20,
          }}
        />
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    },
  
    subtitle: {
      marginTop: 2,
      fontSize: 13,
    },
  
    quoteBox: {
      marginTop: 18,
      marginHorizontal: 12,
      borderWidth: 1,
      paddingVertical: 18,
      paddingHorizontal: 16,
      borderRadius: 2,
    },
  
    quoteText: {
      textAlign: "center",
      fontSize: 15,
      lineHeight: 32,
      fontStyle: "italic",
      fontWeight: "500",
    },
  
    iconRow: {
      flexDirection: "row",
      gap: 10,
    },
  
    iconBtn: {
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
    },
  
    popularCard: {
      width: width * 0.42,
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
    },
  
    description: {
      fontSize: 11,
      marginTop: 6,
      lineHeight: 16,
    },
  
    duration: {
      color: "#A5A5A5",
      marginTop: 10,
      fontSize: 11,
    },
  });