import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import SettingsItem from "./SettingsItem";
import PropTypes from "prop-types";
import styles from "./styles";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFaceID: false,
      shouldOrderUpdate: false,
      isNewArrivals: false,
      isPromotions: false,
      isSalesAlerts: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.body}>
          <View style={styles.labelView}>
            <Text style={styles.label}>SECURITY</Text>
          </View>
          <View style={styles.contentView}>
            <SettingsItem
              title={"Enable Face ID / Touch ID Login"}
              value={this.state.isFaceID}
              onValueChange={() =>
                this.setState({ isFaceID: !this.state.isFaceID })}/>
          </View>
          <View style={styles.captionView}>
            <Text style={styles.caption}>
              While turned off, you will not be able to login with your
              password.
            </Text>
          </View>
          <View style={styles.labelView}>
            <Text style={styles.label}>PUSH NOTIFICATIONS</Text>
          </View>
          <View style={styles.contentView}>
            <SettingsItem
              title={"Order updates"}
              value={this.state.shouldOrderUpdate}
              onValueChange={() =>
                this.setState({
                  shouldOrderUpdate: !this.state.shouldOrderUpdate
                })}/>
            <View style={styles.lineView} />
            <SettingsItem
              title={"New arrivals"}
              value={this.state.isNewArrivals}
              onValueChange={() =>
                this.setState({ isNewArrivals: !this.state.isNewArrivals })}/>
            <View style={styles.lineView} />
            <SettingsItem
              title={"Promotions"}
              value={this.state.isPromotions}
              onValueChange={() =>
                this.setState({ isPromotions: !this.state.isPromotions })}/>
            <View style={styles.lineView} />
            <SettingsItem
              title={"Sales alerts"}
              value={this.state.isSalesAlerts}
              onValueChange={() =>
                this.setState({ isSalesAlerts: !this.state.isSalesAlerts })}/>
          </View>
          <View style={styles.labelView}>
            <Text style={styles.label}>ACCOUNT</Text>
          </View>
          <View style={styles.contentView}>
            <View style={styles.itemButton}>
              <Text style={[styles.text, { color: "#384c8d" }]}>Support</Text>
            </View>
            <View style={styles.lineView} />
            <TouchableOpacity
              onPress={() => console.log("logout")}
              style={styles.itemButton}>
              <Text style={[styles.text, { color: "#384c8d" }]}>Log out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.labelView} />
        </ScrollView>
      </View>
    );
  }
}

Settings.propTypes = {
  title: PropTypes.string,
  SettingsScreen: PropTypes.array,
  navigation: PropTypes.func,
  extraData: PropTypes.object
};
