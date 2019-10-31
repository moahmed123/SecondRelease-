import React from "react";
import { TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import AppStyles from "../../AppStyles";
import styles from "./styles";

export default class ColorCheckBox extends React.Component {
  render() {
    const { color, index, containerStyle, selectedIndex, onPress } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.colorOptionBox,
          containerStyle,
          { backgroundColor: color }
        ]}>
        {index === selectedIndex && (
          <Image
            style={styles.selectedColorIcon}
            source={AppStyles.iconSet.simpleCheck}/>
        )}
      </TouchableOpacity>
    );
  }
}

ColorCheckBox.propTypes = {
  color: PropTypes.string,
  index: PropTypes.number,
  onPress: PropTypes.func,
  selectedIndex: PropTypes.number,
  containerStyle: PropTypes.any
};
