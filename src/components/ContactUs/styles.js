import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efeff4"
  },
  body: {
    width: "100%"
  },
  labelView: {
    width: "100%",
    height: 60,
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  captionView: {
    width: "100%",
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  contentView: {
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: AppStyles.colorSet.hairlineColor,
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor
  },
  itemView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },
  addressView: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10
  },
  itemButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  text: {
    fontSize: 20
  },
  textcaption: {
    fontSize: 14
  },
  placeholderText: {
    fontSize: 20,
    color: AppStyles.colorSet.hairlineColor
  },
  label: {
    fontSize: 14,
    color: AppStyles.colorSet.mainTextColor
  },
  caption: {
    fontSize: 13,
    color: AppStyles.colorSet.mainTextColor
  }
});

export default styles;
