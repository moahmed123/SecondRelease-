import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
// import Modal from 'react-native-modal';
import AppStyles from "../../../AppStyles";
import styles from "./styles";

export default class Header extends React.Component {
  render() {
    const { headerContainerStyle, onCancelPress, onSharePress } = this.props;

    return (
      <View style={[styles.headerContainer, headerContainerStyle]}>
        <TouchableOpacity
          onPress={onCancelPress}
          style={styles.headerIconContainer}>
          <Image
            style={styles.headerIcon}
            resizeMode={"contain"}
            source={AppStyles.iconSet.arrowDown}/>
        </TouchableOpacity>
        <View style={styles.headerIconspace} />
        <TouchableOpacity
          onPress={onSharePress}
          style={[styles.headerIconContainer, styles.headerIconRightContainer]}>
          <Image
            style={styles.headerIcon}
            resizeMode={"contain"}
            source={AppStyles.iconSet.share}/>
        </TouchableOpacity>
      </View>
    );
  }
}

Header.propTypes = {
  headerContainerStyle: PropTypes.object,
  onCancelPress: PropTypes.func,
  onSharePress: PropTypes.func
};
