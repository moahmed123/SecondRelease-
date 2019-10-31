import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

const optionBoxSize = 23;
const optionBoxMargin = 7;

const styles = StyleSheet.create({
  sizeOptionBox: {
    height: optionBoxSize,
    width: optionBoxSize,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "white",
    margin: optionBoxMargin
  },
  selectedSizeOptionBox: {
    backgroundColor: AppStyles.colorSet.mainThemeForegroundColor
  },
  size: {
    textAlign: "center",
    color: AppStyles.colorSet.mainTextColor,
    fontFamily: AppStyles.fontFamily.boldFont
  },
  selectedSize: {
    color: "white"
  }
});

export default styles;
