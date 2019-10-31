import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
// import Modal from 'react-native-modal';
import AppStyles from "../../../AppStyles";
import styles from "./styles";

export default class Favourite extends React.Component {
  render() {
    const { favouriteContainerStyle, isFavourite, onPress } = this.props;

    return (
      <View style={[styles.favouriteIconContainer, favouriteContainerStyle]}>
        <TouchableOpacity
          onPress={onPress}
          style={styles.favouriteIconCircleContainer}>
          <Image
            style={styles.favouriteIcon}
            source={isFavourite
                ? AppStyles.iconSet.wishlistFilled
                : AppStyles.iconSet.wishlistUnFilled}/>
        </TouchableOpacity>
      </View>
    );
  }
}

Favourite.propTypes = {
  favouriteContainerStyle: PropTypes.object,
  iconSource: PropTypes.any,
  onPress: PropTypes.func,
  isFavourite: PropTypes.bool
};
