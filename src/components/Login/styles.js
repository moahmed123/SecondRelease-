import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: AppStyles.fontSet.xlarge,
    color: AppStyles.colorSet.mainThemeForegroundColor,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20,
    fontFamily: AppStyles.fontFamily.semiBoldFont
  },
  loginContainer: {
    width: AppStyles.sizeSet.buttonWidth,
    backgroundColor: AppStyles.colorSet.mainThemeForegroundColor,
    borderRadius: AppStyles.sizeSet.radius,
    padding: 12
  },
  loginText: {
    fontSize: 22,
    fontFamily: AppStyles.fontFamily.boldFont,
    color: AppStyles.colorSet.mainThemeBackgroundColor
  },
  InputContainer: {
    width: "85%",
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: AppStyles.sizeSet.radius
  },
  body: {
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.colorSet.mainTextColor
  },
  orView: {
    marginTop: 50,
    marginBottom: 30
  },
  orText: {
    fontSize: 18,
    fontFamily: AppStyles.fontFamily.boldFont,
    color: AppStyles.colorSet.mainTextColor
  }
});

export default styles;
