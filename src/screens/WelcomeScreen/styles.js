import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 150
  },
  logo: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  title: {
    fontSize: AppStyles.fontSet.xlarge,
    fontFamily: AppStyles.fontFamily.boldFont,
    color: AppStyles.colorSet.mainThemeForegroundColor,
    marginBottom: 20,
    textAlign: "center"
  },
  caption: {
    fontSize: 18,
    fontFamily: AppStyles.fontFamily.regularFont,
    paddingHorizontal: 50,
    marginBottom: 20,
    textAlign: "center",
    color: AppStyles.colorSet.mainTextColor
  },
  loginContainer: {
    width: AppStyles.sizeSet.buttonWidth,
    backgroundColor: AppStyles.colorSet.mainThemeForegroundColor,
    borderRadius: AppStyles.sizeSet.radius,
    padding: 15,
    marginTop: 30
  },
  loginText: {
    fontSize: 20,
    fontFamily: AppStyles.fontFamily.boldFont,
    color: AppStyles.colorSet.mainThemeBackgroundColor,
    textAlign: "center"
  },
  signupContainer: {
    width: AppStyles.sizeSet.buttonWidth,
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
    borderRadius: AppStyles.sizeSet.radius,
    padding: 15,
    borderWidth: 1,
    borderColor: AppStyles.colorSet.mainThemeForegroundColor,
    marginTop: 30
  },
  signupText: {
    fontSize: 20,
    fontFamily: AppStyles.fontFamily.boldFont,
    color: AppStyles.colorSet.mainThemeForegroundColor,
    textAlign: "center"
  }
});

export default styles;
