import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./styles";
import AppStyles from "../../AppStyles";

export default class ProfileItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, onPress, iconSource, itemIconStyle } = this.props;

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <View style={styles.itemIconContainer}>
          <Image style={[styles.itemIcon, itemIconStyle]} source={iconSource} />
        </View>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
        <View style={styles.itemNavigationIconContainer}>
          <Image
            style={styles.itemNavigationIcon}
            source={AppStyles.iconSet.rightArrow}/>
        </View>
      </TouchableOpacity>
    );
  }
}

ProfileItem.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  navigation: PropTypes.object,
  iconSource: PropTypes.any,
  itemIconStyle: PropTypes.object
};
