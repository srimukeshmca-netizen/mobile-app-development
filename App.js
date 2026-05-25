import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HabitTrackerScreen from './screens/HabitTrackerScreen';
import AddHabitScreen from './screens/AddHabitScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HabitTrackerScreen}
          options={{ title: 'Habit Tracker' }}
        />
        <Stack.Screen
          name="AddHabit"
          component={AddHabitScreen}
          options={{ title: 'Add Habit' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}