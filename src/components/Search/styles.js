import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Button:{
    width: AppStyles.sizeSet.buttonWidth,
    backgroundColor: AppStyles.colorSet.mainThemeForegroundColor,
    borderRadius: AppStyles.sizeSet.radius,
    padding: 15,
    marginTop: 30

  }

});

export default styles;
