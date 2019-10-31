import React, { Component } from "react";
// import PropTypes from "prop-types";
import Settings from "../../components/Settings/Settings";
// import styles from "./styles";
import AppStyles from "../../AppStyles";

export default class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title:
      typeof navigation.state.params === "undefined" ||
      typeof navigation.state.params.title === "undefined"
        ? "Settings"
        : navigation.state.params.title,
    headerTintColor: AppStyles.colorSet.mainThemeForegroundColor
  });

  constructor(props) {
    super(props);
  }

  render() {
    return <Settings />;
  }
}

// SettingsScreen.propTypes = {
//   title: PropTypes.string,
//   SearchScreen: PropTypes.array,
//   navigation: PropTypes.func,
//   extraData: PropTypes.object
// };
