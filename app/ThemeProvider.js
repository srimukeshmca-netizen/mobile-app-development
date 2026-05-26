import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);

  const backgroundColor = darkMode ? "#111111" : "#F4F4F6";
  const cardColor = darkMode ? "#FFFFFF" : "#000000";
  const textColor = darkMode ? "#000000" : "#FFFFFF";

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
    >
      {/* TOP HEADER */}
      <View style={styles.header}>
        <Image
          source={require("../assets/icons/logo.png")}
          style={styles.logo}
        />

        <TouchableOpacity>
          <Ionicons
            name="settings-outline"
            size={34}
            color={darkMode ? "#FFFFFF" : "#5B5567"}
          />
        </TouchableOpacity>
      </View>

      {/* MODE CARD */}
      <View
        style={[
          styles.modeCard,
          {
            backgroundColor: cardColor,
          },
        ]}
      >
        <Text
          style={[
            styles.modeText,
            {
              color: textColor,
            },
          ]}
        >
          {darkMode ? "Dark Mode" : "Light Mode"}
        </Text>

        <Switch
          value={darkMode}
          onValueChange={(value) => setDarkMode(value)}
          trackColor={{
            false: "#FFFFFF",
            true: "#000000",
          }}
          thumbColor="#F4F4F4"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  logo: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },

  modeCard: {
    marginTop: 18,
    marginHorizontal: 8,
    borderRadius: 18,
    height: 82,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 34,
  },

  modeText: {
    fontSize: 20,
    fontWeight: "700",
  },
});
