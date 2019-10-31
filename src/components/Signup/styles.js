import { StyleSheet } from "react-native";
import AppStyles from "../../AppStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: AppStyles.fontSet.xlarge,
    fontFamily: AppStyles.fontFamily.semiBoldFont,
    color: AppStyles.colorSet.mainThemeForegroundColor,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  InputContainer: {
    width: AppStyles.sizeSet.inputWidth,
    marginTop: 30,
    borderWidth: 1,
    borderColor: AppStyles.colorSet.grey,
    borderStyle: "solid",
    alignSelf: "center",
    borderRadius: AppStyles.sizeSet.radius
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.colorSet.mainTextColor
  },
  facebookContainer: {
    alignSelf: "center",
    width: AppStyles.sizeSet.buttonWidth,
    backgroundColor: "#384c8d",
    borderRadius: AppStyles.sizeSet.radius,
    padding: 10
  },
  facebookText: {
    fontFamily: AppStyles.fontFamily.boldFont,
    color: AppStyles.colorSet.mainThemeBackgroundColor,
    fontSize: AppStyles.fontSet.middle
  },
  MassageSuccess:{
    textAlign: 'center',
    color: '#fff',
    width: '80%',
    marginHorizontal: '10%',
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: '#2ecc71'
  },
  MassageError:{
    textAlign: 'center',
    color: '#fff',
    width: '80%',
    marginHorizontal: '10%',
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: '#cc0000'
  }
});

export default styles;
