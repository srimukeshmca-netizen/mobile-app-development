import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.medium,
    justifyContent: "center",
  },

  headText: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginBottom: SIZES.small,
    textAlign: "center",
  },

  contentBox: {
    paddingHorizontal: SIZES.medium,
  },

  contextText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    textAlign: "justify",
    fontFamily: FONT.regular,
  },
});

export default styles;