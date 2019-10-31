import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "../../components/Profile/Profile";
// import AppStyles from "../../AppStyles";
// import styles from "./styles";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Profile navigation={this.props.navigation} />;
  }
}

ProfileScreen.propTypes = {
  navigation: PropTypes.object
};
