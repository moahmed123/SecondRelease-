import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default class FlowItem extends Component {
  render() {
    const { icon, title, description } = this.props.data;
    const { style, textColor } = this.props;

    return (
      <View style={style}>
        <View style={styles.container}>
          <View style={{ flex: 4 }} />
          <View style={[{ flex: 5 }, styles.centerItems]}>
            <Image source={icon} style={styles.icon} />
          </View>
          <View style={[{ flex: 1.3 }, styles.centerItems]}>
            <Text style={[textColor, styles.title]}>{title}</Text>
          </View>
          <View style={[{ flex: 1.3 }, styles.centerItems]}>
            <Text style={[textColor, styles.description]}>{description}</Text>
          </View>
          <View style={{ flex: 5.5 }} />
        </View>
      </View>
    );
  }
}

FlowItem.propTypes = {
  textColor: PropTypes.object,
  data: PropTypes.object,
  style: PropTypes.any
};
