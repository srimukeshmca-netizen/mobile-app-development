import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

// Theme
const COLORS = {
  primary: "#34245e",
  lightWhite: "#ffffff",
  darkBackground: "#121212",
  darkText: "#333333",
};

const SIZES = {
  small: 10,
  medium: 16,
  large: 22,
};

export default function DailyReminders() {
  const isDarkMode = false;

  const [reminders, setReminders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [manualTime, setManualTime] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Load reminders
  const loadReminders = async () => {
    const stored = await AsyncStorage.getItem("reminders");
    setReminders(stored ? JSON.parse(stored) : []);
  };

  useEffect(() => {
    loadReminders();
  }, []);

  // Add reminder
  const handleAddReminder = async () => {
    if (!selectedDate) return alert("Select a date");

    let triggerDate = new Date(selectedDate);

    const [h, m] = manualTime.split(":").map(Number);

    if (!isNaN(h) && !isNaN(m)) {
      triggerDate.setHours(h, m, 0, 0);
    } else {
      triggerDate.setHours(
        selectedTime.getHours(),
        selectedTime.getMinutes(),
        0,
        0
      );
    }

    if (triggerDate <= new Date()) {
      return alert("Pick a future time");
    }

    const newReminder = {
      id: Date.now(),
      date: selectedDate,
      time:
        manualTime ||
        selectedTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      description: "Reminder: Time for your task!",
      triggerDate: triggerDate.toISOString(),
    };

    const updated = [...reminders, newReminder];

    await AsyncStorage.setItem("reminders", JSON.stringify(updated));
    setReminders(updated);

    await scheduleNotification(newReminder);

    setManualTime("");

    alert("Reminder added successfully!");
  };

  // 🔥 FIXED NOTIFICATION (WEB + MOBILE)
  const scheduleNotification = async (reminder) => {
    const triggerDate = new Date(reminder.triggerDate);

    // MOBILE (Android/iOS)
    if (Platform.OS !== "web") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder",
          body: reminder.description,
        },
        trigger: { date: triggerDate },
      });
      return;
    }

    // WEB FIX
    try {
      if (typeof Notification === "undefined") return;

      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        alert("Enable notifications in browser settings");
        return;
      }

      const delay = triggerDate.getTime() - Date.now();

      if (delay <= 0) return;

      setTimeout(() => {
        new Notification("Reminder", {
          body: reminder.description,
        });
      }, delay);
    } catch (err) {
      console.log("Web notification error:", err);
    }
  };

  // Reminder component
  const Reminder = ({ item }) => (
    <View style={styles.reminderContainer}>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.date}>
        {item.date} - {item.time}
      </Text>

      <TouchableOpacity
        onPress={async () => {
          const updated = reminders.filter((r) => r.id !== item.id);
          await AsyncStorage.setItem(
            "reminders",
            JSON.stringify(updated)
          );
          setReminders(updated);
        }}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? COLORS.darkBackground
          : COLORS.lightWhite,
      }}
    >
      <Stack.Screen options={{ headerTitle: "Daily Reminders" }} />

      {/* TOP HEADER */}
      <View style={styles.topHeader}>
        <Image
          source={require("../assets/icons/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity>
          <Text style={{ fontSize: 28 }}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: SIZES.medium }}>
        {/* Calendar */}
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: COLORS.primary,
            },
          }}
        />

        {/* Time Picker */}
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            onChange={(event, selected) => {
              setSelectedTime(selected || selectedTime);
              setShowTimePicker(false);
            }}
          />
        )}

        {/* Manual time */}
        <TextInput
          placeholder="Enter Time (HH:mm)"
          value={manualTime}
          onChangeText={setManualTime}
          keyboardType="numeric"
          maxLength={5}
          style={styles.input}
        />

        {/* Selected info */}
        <Text style={styles.selected}>
          Date: {selectedDate || "None"}
        </Text>

        <Text style={styles.selected}>
          Time:{" "}
          {manualTime ||
            selectedTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </Text>

        {/* Button */}
        <TouchableOpacity
          onPress={handleAddReminder}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Add Reminder
          </Text>
        </TouchableOpacity>

        {/* List */}
        <Text style={styles.reminderHeader}>
          All Reminders:
        </Text>

        {reminders.length > 0 ? (
          reminders.map((rem) => (
            <Reminder key={rem.id} item={rem} />
          ))
        ) : (
          <Text>No reminders yet.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// STYLES
const styles = StyleSheet.create({
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  logo: {
    width: 42,
    height: 42,
  },

  reminderContainer: {
    backgroundColor: "#34245e",
    borderRadius: SIZES.small,
    padding: SIZES.small,
    marginVertical: SIZES.small,
  },

  description: {
    color: COLORS.lightWhite,
    fontWeight: "bold",
  },

  date: {
    color: COLORS.darkText,
    fontSize: SIZES.small,
  },

  input: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    padding: SIZES.small,
    marginVertical: SIZES.small,
  },

  selected: {
    fontSize: SIZES.medium,
    marginVertical: SIZES.small,
    color: COLORS.primary,
  },

  button: {
    backgroundColor: COLORS.primary,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.lightWhite,
    fontWeight: "bold",
  },

  deleteButton: {
    marginTop: SIZES.small,
    alignSelf: "flex-end",
  },

  deleteText: {
    color: "#FE7654",
    fontWeight: "bold",
  },

  reminderHeader: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.primary,
    marginVertical: SIZES.medium,
  },
});