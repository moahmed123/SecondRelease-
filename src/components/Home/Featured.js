import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList, Text } from "react-native";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./styles";

export default class Featured extends Component {
  renderItem = ({ item, index }) => (
    <ProductCard
      // onPress={() => this.props.onCardPress(item)}
      key={index + ""}
      item={item}/>
  );

  render() {
    const { featuredProducts, title, extraData } = this.props;

    return (
      <View style={styles.unitContainer}>
        <Text style={styles.unitTitle}>{title}</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={featuredProducts}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          extraData={extraData}
          renderItem={this.renderItem}/>
      </View>
    );
  }
}

Featured.propTypes = {
  title: PropTypes.string,
  featuredProducts: PropTypes.array,
  navigation: PropTypes.func,
  onCardPress: PropTypes.func,
  extraData: PropTypes.object
};
