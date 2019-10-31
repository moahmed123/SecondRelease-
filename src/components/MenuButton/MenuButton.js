import React from "react";
import { TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import AppStyles from "../../AppStyles";
import styles from "./styles";

export default class MenuButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.headerButtonContainer}
        onPress={this.props.onPress}>
        <Image
          style={styles.headerButtonImage}
          source={AppStyles.iconSet.menuHamburger}/>
      </TouchableOpacity>
    );
  }
}

MenuButton.propTypes = {
  onPress: PropTypes.func
};
