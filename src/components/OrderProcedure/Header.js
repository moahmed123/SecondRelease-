import React, { Component } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

// const { width } = Dimensions.get("window");

export default class Header extends Component {
  render() {
    const { title, headerContainerStyle, headerStyle } = this.props;

    return (
      <View style={[styles.headerContainer, headerContainerStyle]}>
        <Text style={[styles.header, headerStyle]}>{title}</Text>
      </View>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  headerContainerStyle: PropTypes.any,
  headerStyle: PropTypes.any
};
