import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function HabitTrackerScreen({ navigation }) {
  const [selectedHabits, setSelectedHabits] = useState({
    Workout: 'FF5733',
    Meditate: '33A1FF',
    Reading: '33FF57',
  });

  const [completedHabits, setCompletedHabits] = useState({});

  const markDone = (habit) => {
    const color = selectedHabits[habit];
    const updated = { ...selectedHabits };
    delete updated[habit];
    setSelectedHabits(updated);
    setCompletedHabits({ ...completedHabits, [habit]: color });
  };

  const markUndone = (habit) => {
    const color = completedHabits[habit];
    const updated = { ...completedHabits };
    delete updated[habit];
    setCompletedHabits(updated);
    setSelectedHabits({ ...selectedHabits, [habit]: color });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>To Do 📝</Text>

      <FlatList
        data={Object.keys(selectedHabits)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#' + selectedHabits[item] }]}
            onPress={() => markDone(item)}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.title}>Done 🎉</Text>

      <FlatList
        data={Object.keys(completedHabits)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#' + completedHabits[item] }]}
            onPress={() => markUndone(item)}
          >
            <Text style={styles.text}>{item} ✔</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddHabit')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  card: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  text: { color: 'white', fontWeight: 'bold' },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: { color: 'white', fontSize: 30 },
});