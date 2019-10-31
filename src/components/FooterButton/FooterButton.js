import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, Text } from "react-native";
import styles from "./styles";

export default class FooterButton extends Component {
  render() {
    const {
      title,
      onPress,
      footerTitleStyle,
      footerContainerStyle,
      iconSource,
      iconStyle
    } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.footerContainer, footerContainerStyle]}>
        {iconSource && <Image style={iconStyle} source={iconSource} />}
        <Text style={[styles.footerTitle, footerTitleStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

FooterButton.propTypes = {
  title: PropTypes.string.isRequired,
  footerContainerStyle: PropTypes.object,
  footerTitleStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  iconSource: PropTypes.any,
  onPress: PropTypes.func
};
