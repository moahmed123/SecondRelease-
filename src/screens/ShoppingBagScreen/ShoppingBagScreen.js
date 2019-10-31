import React, { Component } from "react";
import PropTypes from "prop-types";
import ShoppingBag from "../../components/ShoppingBag/ShoppingBag";
import AppStyles from "../../AppStyles";
// import styles from "./styles";

export default class ShoppingBagScreen extends Component {
  static navigationOptions = () => ({
    title: "Shopping Bag",
    headerTintColor: AppStyles.colorSet.mainThemeForegroundColor
  });

  constructor(props) {
    super(props);
  }

  render() {
    return <ShoppingBag navigation={this.props.navigation} />;
  }
}

ShoppingBagScreen.propTypes = {
  // title: PropTypes.string,
  // dataSource: PropTypes.object,
  navigation: PropTypes.object
  // onIndexChange: PropTypes.func
};
