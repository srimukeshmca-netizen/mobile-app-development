import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },

  logoBox: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: SIZES.large,
    shadowColor: COLORS.gray,
  },

  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.large,
  },

  meditationTitleBox: {
    marginTop: SIZES.small,
  },

  meditationTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
    textAlign: "center",
  },

  meditationInfoBox: {
    marginTop: SIZES.small / 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  meditationName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.primary,
    fontFamily: FONT.medium,
  },

  durationBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  durationImage: {
    width: 14,
    height: 14,
  },

  durationName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONT.regular,
    marginLeft: 2,
  },
});

export default styles;