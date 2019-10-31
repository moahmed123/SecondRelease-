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
  lineView: {
    left: 15,
    width: "95%",
    height: 1,
    backgroundColor: AppStyles.colorSet.hairlineColor
  },
  labelText: {
    fontSize: 20,
    paddingRight: 35
  },
  text: {
    fontSize: 14
  },
  label: {
    fontSize: 14,
    color: AppStyles.colorSet.mainTextColor
  }
});

export default styles;
