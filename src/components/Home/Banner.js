import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Image } from "react-native";
import styles from "./styles";

export default class Banner extends Component {
 
  render() {
    const { dataBanner, title } = this.props;

    return (
      <View>
        <Text style={[styles.carouselTitleText, {marginBottom: 20}]}>{title}</Text>
        <Image
          source={{ uri: dataBanner }}
          style={{ 
            width: '96%', height: 200 , borderWidth: 1, borderColor: "#f1f1f1", borderStyle: 'solid',
            marginHorizontal: "2%", borderRadius: 5, 
          }}
        />
      </View>
    );
  }
}

Banner.propTypes = {
  title: PropTypes.string,
  dataBanner: PropTypes.string
};
