import { StyleSheet } from "react-native";
import AppStyles from "../../../AppStyles";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 30,
    tintColor: "#ffffff"
  },
  title: {
    fontSize: 25,
    fontFamily: AppStyles.fontFamily.boldFont,
    textAlign: "center",
    paddingBottom: 20
  },
  description: {
    textAlign: "center",
    fontFamily: AppStyles.fontFamily.regularFont,
    fontSize: 16
  },
  centerItems: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default styles;
