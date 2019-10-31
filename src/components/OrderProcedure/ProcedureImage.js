import React, { Component } from "react";
import { Image, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

// const { width } = Dimensions.get("window");

export default class ProcedureImage extends Component {
  render() {
    const {
      procedureImageContainerStyle,
      procedureImageStyle,
      source
    } = this.props;

    return (
      <View
        style={[styles.procedureImageContainer, procedureImageContainerStyle]}>
        <Image
          source={source}
          resizeMode='contain'
          style={[styles.procedureImage, procedureImageStyle]}/>
      </View>
    );
  }
}

ProcedureImage.propTypes = {
  procedureImageContainerStyle: PropTypes.any,
  procedureImageStyle: PropTypes.any,
  source: PropTypes.any
};
