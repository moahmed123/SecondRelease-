import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

// tintColor: AppStyles.colorSet.mainThemeForegroundColor,

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  button: {
    backgroundColor: "#859a9b",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },
  headerButtonImage: {
    tintColor: AppStyles.colorSet.mainThemeForegroundColor,
    width: 25,
    height: 25,
    margin: 6
  }
});

export default styles;
