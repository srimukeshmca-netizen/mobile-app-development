import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { COLORS, SIZES } from "../constants/theme";
import icons from "../constants/icons";

export default function ScreenHeaderBtn({ detailPage, handleShare }) {
  const router = useRouter();

  return (
    <View style={styles.btn}>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => router.push("/")}
      >
        <Image source={icons.menu} style={styles.image} />
      </TouchableOpacity>

      {detailPage ? (
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={handleShare}
        >
          <Image source={icons.share} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => router.push("/settings")}
        >
          <Image source={icons.settings} style={styles.image} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },

  image: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },

  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
  },
});