import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, Text } from "react-native";
import ColorCheckBox from "../ColorCheckBox/ColorCheckBox";
import SizeCheckBox from "../SizeCheckBox/SizeCheckBox";
import styles from "./styles";

export default class CardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColorIndex: this.props.item.selectedColorIndex
        ? this.props.item.selectedColorIndex
        : 0,
      selectedSizeIndex: this.props.item.selectedSizeIndex
        ? this.props.item.selectedSizeIndex
        : 0
    };
  }

  onColorSelected = index => {
    this.setState({ selectedColorIndex: index }, () => {
      this.props.onColorSelected(index);
    });
  };

  onSizeSelected = index => {
    this.setState({ selectedSizeIndex: index }, () => {
      this.props.onSizeSelected(index);
    });
  };

  render() {
    const { contentContainer, item, price } = this.props;

    return (
      <View style={contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.colorOptionContainer}>
            <View style={styles.colorOptionTitleContainer}>
              <Text style={styles.color}>{"Color"}</Text>
            </View>
            <View style={styles.checkBoxContainer}>
              {item.colors &&
                item.colors.map((color, index) => (
                  <ColorCheckBox
                    containerStyle={[
                      styles.checkBox,
                      { borderColor: "#f2f2f3", borderWidth: 1.5 }
                    ]}
                    key={index + ""}
                    color={color}
                    selectedIndex={this.state.selectedColorIndex}
                    onPress={() => this.onColorSelected(index)}
                    index={index}/>
                ))}
            </View>
          </View>
          <View style={styles.sizeOptionContainer}>
            <View style={styles.colorOptionTitleContainer}>
              <Text style={styles.size}>{"Size"}</Text>
            </View>
            <View style={styles.checkBoxContainer}>
              {item.sizes &&
                item.sizes.map((size, index) => (
                  <SizeCheckBox
                    containerStyle={styles.checkBox}
                    key={index + ""}
                    size={size}
                    selectedIndex={this.state.selectedSizeIndex}
                    onPress={() => this.onSizeSelected(index)}
                    index={index}/>
                ))}
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    );
  }
}

CardContent.propTypes = {
  contentContainer: PropTypes.object,
  item: PropTypes.object,
  price: PropTypes.string,
  onColorSelected: PropTypes.func,
  onSizeSelected: PropTypes.func
};
