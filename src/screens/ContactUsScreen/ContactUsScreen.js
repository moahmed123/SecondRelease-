import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { Platform, StatusBar } from "react-native";
import ContactUs from "../../components/ContactUs/ContactUs";
// import styles from "./styles";
import AppStyles from "../../AppStyles";
import Strings from '../../ExpandStores/LocalizedStrings';

export default class ContactUsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title:
      typeof navigation.state.params === "undefined" ||
      typeof navigation.state.params.title === "undefined"
        ? Strings.contactus
        : navigation.state.params.title,
    headerTintColor: AppStyles.colorSet.mainThemeForegroundColor
  });

  constructor(props) {
    super(props);
  }

  render() {
    return <ContactUs />;
  }
}

// ContactUsScreen.propTypes = {
//   title: PropTypes.string,
//   SearchScreen: PropTypes.array,
//   navigation: PropTypes.func,
//   extraData: PropTypes.object
// };
