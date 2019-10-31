import React, { Component } from "react";
import { Switch, Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default class SettingsItem extends Component {
  render() {
    const { title, value, onValueChange } = this.props;

    return (
      <View style={styles.itemView}>
        <Text style={styles.text}>{title}</Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          style={styles.switch}/>
      </View>
    );
  }
}

SettingsItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.bool,
  onValueChange: PropTypes.func
};
