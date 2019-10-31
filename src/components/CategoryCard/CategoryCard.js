import PropTypes from "prop-types";
import React, { Component } from "react";
import { ImageBackground, TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export default class CategoryCard extends Component {
  render() {
    const { item, imageContainerStyle, onCategoryPress } = this.props;

    return (
      <ImageBackground
        source={{ uri: (item.image)?item.image:item.thumb }}        
        style={[styles.categoryImageContainer, imageContainerStyle]}
        imageStyle={styles.categoryImage}
        resizeMode='cover'>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onCategoryPress}
          style={styles.categoryTextContainerView}>
          <Text style={styles.categoryText}>{item.name.toUpperCase()}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

CategoryCard.propTypes = {
  item: PropTypes.object.isRequired,
  onCategoryPress: PropTypes.func,
  imageContainerStyle: PropTypes.object
};
