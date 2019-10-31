import PropTypes from "prop-types";
import React from "react";
import { Image, TouchableHighlight, View, Text } from "react-native";
import styles from "./styles";

export default class DrawerItem extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    source: PropTypes.any,
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.btnClickContain}
        underlayColor='rgba(128, 128, 128, 0.1)'>
        <View style={styles.btnContainer}>
          <Image source={this.props.source} style={styles.btnIcon} />
          <Text style={styles.btnText}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
