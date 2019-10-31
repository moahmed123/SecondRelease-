import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import ColorCheckBox from "../../ColorCheckBox/ColorCheckBox";
import SizeCheckBox from "../../SizeCheckBox/SizeCheckBox";
import styles from "./styles";

export default class ProductOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSizeIndex: 0,
      selectedColorIndex: 0
    };
  }

  onSizeCheckBoxPress = index => {
    this.setState({ selectedSizeIndex: index }, () => {
      this.props.onSizeSelected(index);
    });
  };

  onColorCheckBoxPress = index => {
    this.setState({ selectedColorIndex: index }, () => {
      this.props.onColorSelected(index);
    });
  };

  render() {
    const { optionContainerStyle, item } = this.props;

    return (
      <View style={[styles.optionContainer, optionContainerStyle]}>
        <View style={styles.sizeContainer}>
          {item.sizes &&
            item.sizes.map((size, index) => (
              <SizeCheckBox
                containerStyle={styles.checkBox}
                key={index + ""}
                size={size}
                selectedIndex={this.state.selectedSizeIndex}
                onPress={() => this.onSizeCheckBoxPress(index)}
                index={index}/>
            ))}
        </View>
        <View style={styles.colorContainer}>
          {item.colors &&
            item.colors.map((color, index) => (
              <ColorCheckBox
                containerStyle={styles.checkBox}
                key={index + ""}
                color={color}
                selectedIndex={this.state.selectedColorIndex}
                onPress={() => this.onColorCheckBoxPress(index)}
                index={index}/>
            ))}
        </View>
      </View>
    );
  }
}

ProductOptions.propTypes = {
  optionContainerStyle: PropTypes.object,
  item: PropTypes.object,
  onSizeSelected: PropTypes.func,
  onColorSelected: PropTypes.func
};
