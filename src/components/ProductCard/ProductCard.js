import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "./styles";

export default class ProductCard extends Component {
  render() {
    const { cardConainerStyle, onPress, item } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[styles.productCardConainer, cardConainerStyle]}>
        <View style={styles.productCardImageConainer}>
          {/* <Image style={styles.productCardImage} source={{ uri: item.photo }} /> */}
          <Image style={styles.productCardImage} source={{ uri: item.thumb }} />
        </View>
        <Text style={styles.productCardPrice}>{item.price}</Text>
        <Text style={styles.productCardDescription} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

ProductCard.propTypes = {
  cardConainerStyle: PropTypes.object,
  item: PropTypes.object,
  onPress: PropTypes.func
};
