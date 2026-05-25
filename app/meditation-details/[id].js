import { useGlobalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Share,
  Alert,
  StyleSheet,
} from "react-native";

import {
  MeditationTopDisplay,
  About,
  Footer,
  Tabs,
} from "../../components";

import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import { COLORS, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Instructions"];

const MeditationDetails = () => {
  const params = useGlobalSearchParams();
  const id = params.id;

  const { data, isLoading, error, refetch } = useFetch("search", {
    query: id,
  });

  const meditationItem = useFetch().getItemById(parseInt(id, 10));

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  // 🔄 Refresh control
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  // 📤 Share function
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this meditation: ${meditationItem?.title} (${meditationItem?.duration})`,
      });

      if (result.action === Share.dismissedAction) return;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // 📌 Tabs content
  const displayTabContent = () => {
    if (!meditationItem) return null;

    if (activeTab === "About") {
      return (
        <About
          title={meditationItem.title}
          info={meditationItem.description ?? "No data provided"}
        />
      );
    }

    if (activeTab === "Instructions") {
      return (
        <View style={styles.section}>
          <Text style={styles.title}>Instructions:</Text>

          <View>
            {(meditationItem.instructions ?? ["N/A"]).map((item, index) => (
              <View key={index} style={styles.row}>
                <View style={styles.dot} />
                <Text style={styles.text}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeaderBtn detailPage={true} handleShare={onShare} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : !meditationItem ? (
          <Text>No data available</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            {/* TOP SECTION */}
            <MeditationTopDisplay
              meditationImage={meditationItem.image}
              meditationTitle={meditationItem.title}
              duration={meditationItem.duration}
              target={meditationItem.target}
            />

            {/* TABS */}
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* TAB CONTENT */}
            {displayTabContent()}
          </View>
        )}
      </ScrollView>

      <Footer data={meditationItem} />
    </SafeAreaView>
  );
};

export default MeditationDetails;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  section: {
    padding: SIZES.medium,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: SIZES.small,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: 8,
  },
  text: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
});