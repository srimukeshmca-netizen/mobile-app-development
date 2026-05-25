import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, Share, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MeditationDetail() {
  const { id } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // simulate API refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out this meditation session: ${id}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
        Meditation Detail Screen
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Session ID: {id}
      </Text>

      <Pressable
        onPress={onShare}
        style={{
          backgroundColor: '#4A90E2',
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Share Session
        </Text>
      </Pressable>
    </ScrollView>
  );
}