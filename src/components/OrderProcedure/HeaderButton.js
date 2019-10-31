import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default class HeaderButton extends Component {
  render() {
    const { title, buttonContainerStyle, buttonStyle, onPress } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.buttonContainer, buttonContainerStyle]}>
        <Text style={[styles.button, buttonStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

HeaderButton.propTypes = {
  title: PropTypes.string.isRequired,
  buttonContainerStyle: PropTypes.any,
  buttonStyle: PropTypes.any,
  onPress: PropTypes.func
};
