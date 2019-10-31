import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 18
  },
  carouselTitleText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: AppStyles.fontFamily.semiBoldFont,
    color: AppStyles.colorSet.mainTextColor,
    marginTop: 10,
    marginBottom: -8
  },
  unitContainer: {
    marginTop: 20,
    marginLeft: 7
  },
  unitTitle: {
    textAlign: "left",
    fontSize: 20,
    fontFamily: AppStyles.fontFamily.semiBoldFont,
    color: AppStyles.colorSet.mainTextColor,
    marginLeft: 7,
    marginBottom: 7
  }
});

export default styles;
