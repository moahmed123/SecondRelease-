import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default class SizeCheckBox extends React.Component {
  render() {
    const { size, index, containerStyle, selectedIndex, onPress } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={index === selectedIndex
            ? [
                styles.sizeOptionBox,
                styles.selectedSizeOptionBox,
                containerStyle
              ]
            : [styles.sizeOptionBox, containerStyle]}>
        <Text
          style={index === selectedIndex
              ? [styles.size, styles.selectedSize]
              : styles.size}>
          {size}
        </Text>
      </TouchableOpacity>
    );
  }
}

SizeCheckBox.propTypes = {
  size: PropTypes.string,
  index: PropTypes.number,
  onPress: PropTypes.func,
  selectedIndex: PropTypes.string,
  containerStyle: PropTypes.any
};
