import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Switch,
} from "react-native";

import {
  Ionicons,
  Feather,
} from "@expo/vector-icons";

import { useRouter } from "expo-router";

import { useTheme } from "../context/ThemeContext";

export default function MenuScreen() {
  const router = useRouter();

  const { theme, toggleTheme } = useTheme();

  const isDarkMode = theme === "dark";

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? "#111111"
            : "#F4F4F6",
        },
      ]}
    >
      {/* TOP HEADER */}
      <View style={styles.topHeader}>
        <Image
          source={require("../assets/icons/logo.png")}
          style={styles.logo}
        />

        <View style={styles.iconRow}>
          <TouchableOpacity
            style={[
              styles.iconBtn,
              {
                backgroundColor: isDarkMode
                  ? "#1E1E1E"
                  : "#FFFFFF",
              },
            ]}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.icon}>🏠</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TITLE */}
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.helloText,
            {
              color: isDarkMode
                ? "#BBBBBB"
                : "#51476D",
            },
          ]}
        >
          Hello ric!
        </Text>

        <Text
          style={[
            styles.mainTitle,
            {
              color: isDarkMode
                ? "#FFFFFF"
                : "#3D315B",
            },
          ]}
        >
          Would you like to change any settings?
        </Text>
      </View>

      {/* DARK MODE CARD */}
      <View
        style={[
          styles.menuCard,
          {
            backgroundColor: isDarkMode
              ? "#1E1E1E"
              : "#F8F8F8",
          },
        ]}
      >
        <View style={styles.iconBox}>
          <Ionicons
            name="moon-outline"
            size={28}
            color="#1D1D1D"
          />
        </View>

        <Text
          style={[
            styles.cardText,
            {
              color: isDarkMode
                ? "#FFFFFF"
                : "#43355F",
            },
          ]}
        >
          Dark Mode
        </Text>

        <View style={{ flex: 1 }} />

        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
        />
      </View>

      {/* FAVOURITES CARD */}
      <TouchableOpacity
        style={[
          styles.menuCard,
          {
            backgroundColor: isDarkMode
              ? "#1E1E1E"
              : "#F8F8F8",
          },
        ]}
        onPress={() => router.push("/favourites")}
      >
        <View style={styles.iconBox}>
          <Ionicons
            name="medal-outline"
            size={26}
            color="#1D1D1D"
          />
        </View>

        <Text
          style={[
            styles.cardText,
            {
              color: isDarkMode
                ? "#FFFFFF"
                : "#43355F",
            },
          ]}
        >
          My Favourites
        </Text>
      </TouchableOpacity>

      {/* REMINDER CARD */}
      <TouchableOpacity
        style={[
          styles.menuCard,
          {
            backgroundColor: isDarkMode
              ? "#1E1E1E"
              : "#F8F8F8",
          },
        ]}
        onPress={() => router.push("/DailyReminders")}
      >
        <View style={styles.iconBox}>
          <Feather
            name="clock"
            size={25}
            color="#1D1D1D"
          />
        </View>

        <Text
          style={[
            styles.cardText,
            {
              color: isDarkMode
                ? "#FFFFFF"
                : "#43355F",
            },
          ]}
        >
          Daily Reminders
        </Text>
      </TouchableOpacity>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn}>
        <View style={styles.logoutIconBox}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#1D1D1D"
          />
        </View>

        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },

  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  logo: {
    width: 30,
    height: 30,
    borderRadius: 8,
  },

  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    fontSize: 18,
  },

  titleContainer: {
    marginTop: 25,
    paddingHorizontal: 12,
  },

  helloText: {
    fontSize: 16,
    marginBottom: 4,
  },

  mainTitle: {
    fontSize: 22,
    lineHeight: 32,
    fontWeight: "700",
    width: "85%",
  },

  menuCard: {
    marginTop: 18,
    marginHorizontal: 12,
    borderRadius: 14,
    height: 74,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#ECECEC",
    justifyContent: "center",
    alignItems: "center",
  },

  cardText: {
    marginLeft: 16,
    fontSize: 17,
    fontWeight: "600",
  },

  logoutBtn: {
    marginTop: 24,
    marginHorizontal: 12,
    height: 74,
    borderRadius: 14,
    backgroundColor: "#F5C3CE",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  logoutIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    marginLeft: 16,
    fontSize: 17,
    fontWeight: "600",
    color: "#43355F",
  },
});