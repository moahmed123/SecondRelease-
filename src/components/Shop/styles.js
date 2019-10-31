import { StyleSheet, Dimensions } from "react-native";
// import AppStyles from "../../AppStyles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  categoryImageContainerStyle: {
    width: width * 0.93,
    height: height * 0.12
  }
});

export default styles;
