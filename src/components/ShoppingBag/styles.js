import { StyleSheet, Dimensions } from "react-native";
import AppStyles from "../../AppStyles";

const { width, height } = Dimensions.get("window");
const paddingLeft = 13;

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.98,
    height: height * 0.27,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#f2f2f3",
    backgroundColor: "white",
    marginVertical: 5
  },
  imageContainer: {
    flex: 2.4
  },
  cardImage: {
    // width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: 'contain'
  },
  contentContainer: {
    flex: 3.2
    // alignItems: "center"
    // justifyContent: "center"
  },
  titleContainer: {
    flex: 2,
    justifyContent: "center"
  },
  optionContainer: {
    flex: 4
  },
  colorOptionContainer: {
    flexDirection: "row"
  },
  colorOptionTitleContainer: {
    flex: 1.3,
    justifyContent: "center",
    alignItems: "center"
  },
  checkBoxContainer: {
    flexDirection: "row",
    flex: 3,
    alignItems: "center",
    flexWrap: "wrap"
  },
  sizeOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 3
  },
  title: {
    color: AppStyles.colorSet.mainTextColor,
    fontFamily: AppStyles.fontFamily.semiBoldFont,
    paddingLeft: paddingLeft - 2
  },
  color: {
    color: AppStyles.colorSet.mainTextColor,
    fontFamily: AppStyles.fontFamily.regularFont,
    fontSize: 13,
    paddingRight: 3,
    paddingLeft: paddingLeft
  },
  size: {
    color: AppStyles.colorSet.mainTextColor,
    fontFamily: AppStyles.fontFamily.regularFont,
    fontSize: 13,
    paddingLeft: paddingLeft - 7
  },
  priceContainer: {
    flex: 0.8,
    justifyContent: "flex-end"
  },
  price: {
    color: AppStyles.colorSet.mainThemeForegroundColor,
    fontFamily: AppStyles.fontFamily.boldFont,
    fontSize: 16,
    paddingRight: 3,
    paddingLeft: paddingLeft,
    paddingBottom: 33
  },
  quantityControlContainer: {
    flex: 0.5,
    height: "85%",
    alignSelf: "center"
  },
  quantityControlIconContainer: {
    height: 25,
    width: 25,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#f2f2f3",
    alignItems: "center",
    justifyContent: "center"
  },
  increaseIconContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  countContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  decreaseIconContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  quantityCount: {
    color: AppStyles.colorSet.mainThemeForegroundColor,
    fontFamily: AppStyles.fontFamily.boldFont,
    fontSize: 16
  },
  quantityControlIcon: {
    height: 10,
    width: 10,
    tintColor: "#bdbdc2"
  },
  checkBox: {
    margin: 4,
    height: 21,
    width: 21
  },
  // checkBoxContainer: {
  //   flexDirection: "row",
  //   flexWrap: "wrap"
  // },
  footerContainer: {
    width: width,
    height: height * 0.27,
    // height: height * 0.3,
    backgroundColor: "white",
    alignSelf: "flex-end",
    borderTopColor: "#f2f2f3",
    borderTopWidth: 1.5
  },
  totalContainer: {
    flexDirection: "row",
    height: height * 0.05,
    justifyContent: "center"
  },
  totalTitleContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  totalTitle: {
    color: AppStyles.colorSet.mainThemeForegroundColor,
    fontFamily: AppStyles.fontFamily.regularFont,
    fontSize: 16
  },
  titleCostSpace: {
    flex: 4
  },
  totalCostContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  totalCost: {
    color: AppStyles.colorSet.mainThemeForegroundColor,
    fontFamily: AppStyles.fontFamily.boldFont,
    fontSize: 16
  },
  footerButtonContainer: {
    backgroundColor: AppStyles.colorSet.mainThemeForegroundColor
  },
  footerTitle: {
    color: "white"
  }
});

export default styles;
