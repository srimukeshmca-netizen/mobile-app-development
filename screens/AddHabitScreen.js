import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function AddHabitScreen() {
  const [habit, setHabit] = useState('');
  const [habits, setHabits] = useState([]);

  const colors = ['FF5733', '33A1FF', '33FF57', 'A133FF', 'FFC300'];
  const [selectedColor, setSelectedColor] = useState('FF5733');

  const addHabit = () => {
    if (!habit) return;
    setHabits([...habits, { name: habit, color: selectedColor }]);
    setHabit('');
  };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Enter Habit"
        value={habit}
        onChangeText={setHabit}
        style={styles.input}
      />

      <Text style={styles.label}>Choose Color</Text>

      <View style={styles.colorRow}>
        {colors.map((c) => (
          <TouchableOpacity
            key={c}
            style={[
              styles.colorBox,
              { backgroundColor: '#' + c },
              selectedColor === c && { borderWidth: 3 }
            ]}
            onPress={() => setSelectedColor(c)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={addHabit}>
        <Text style={{ color: 'white' }}>Add Habit</Text>
      </TouchableOpacity>

      <FlatList
        data={habits}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: '#' + item.color }]}>
            <Text style={{ color: 'white' }}>{item.name}</Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: { fontWeight: 'bold', marginVertical: 10 },
  colorRow: { flexDirection: 'row', marginBottom: 10 },
  colorBox: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  card: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
});