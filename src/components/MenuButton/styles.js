import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  headerButtonContainer: {
    padding: 10
  },
  headerButtonImage: {
    tintColor: AppStyles.colorSet.mainThemeForegroundColor,
    justifyContent: "center",
    width: 25,
    height: 25,
    margin: 6
  }
});

export default styles;
