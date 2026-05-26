import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function MenuScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      
      {/* TOP HEADER */}
      <View style={styles.topHeader}>
        <Image
          source={require("../assets/icons/logo.png")}
          style={styles.logo}
        />

        <View style={styles.iconRow}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.icon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TITLE */}
      <View style={styles.titleContainer}>
        <Text style={styles.helloText}>Hello ric!</Text>

        <Text style={styles.mainTitle}>
          Would you like to change any settings?
        </Text>
      </View>

      {/* SETTINGS CARD */}
      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => router.push("/ThemeProvider")}
      >
        <View style={styles.iconBox}>
          <Ionicons
            name="settings-outline"
            size={28}
            color="#1D1D1D"
          />
        </View>

        <Text style={styles.cardText}>Settings</Text>
      </TouchableOpacity>

      {/* FAVOURITES CARD */}
      <TouchableOpacity style={styles.menuCard}>
        <View style={styles.iconBox}>
          <Ionicons
            name="medal-outline"
            size={26}
            color="#1D1D1D"
          />
        </View>

        <Text style={styles.cardText}>My Favourites</Text>
      </TouchableOpacity>

      {/* REMINDER CARD */}
      <TouchableOpacity style={styles.menuCard}>
        <View style={styles.iconBox}>
          <Feather
            name="clock"
            size={25}
            color="#1D1D1D"
          />
        </View>

        <Text style={styles.cardText}>Daily Reminders</Text>
      </TouchableOpacity>

      {/* LOGOUT BUTTON */}
      <TouchableOpacity style={styles.logoutBtn}>
        <View style={styles.logoutIconBox}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#1D1D1D"
          />
        </View>

        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F6",
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

  titleContainer: {
    marginTop: 25,
    paddingHorizontal: 12,
  },

  helloText: {
    fontSize: 16,
    color: "#51476D",
    marginBottom: 4,
  },

  mainTitle: {
    fontSize: 22,
    lineHeight: 32,
    fontWeight: "700",
    color: "#3D315B",
    width: "85%",
  },

  menuCard: {
    backgroundColor: "#F8F8F8",
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
    color: "#43355F",
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