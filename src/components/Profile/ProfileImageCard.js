import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, Text } from "react-native";
import styles from "./styles";

export default class ProfileImageCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const { extraData } = this.props;

    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardImageContainer}>
          <Image
            style={styles.cardImage}
            source={{
              uri:
                "https://images.unsplash.com/photo-1560727750-27e0626cdd49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
            }}/>
        </View>
        <View style={styles.cardNameContainer}>
          <Text style={styles.cardName}>Will Kim</Text>
        </View>
      </View>
    );
  }
}

ProfileImageCard.propTypes = {
  title: PropTypes.string,
  // ProfileItemScreen: PropTypes.array,
  navigation: PropTypes.func,
  extraData: PropTypes.object
};
