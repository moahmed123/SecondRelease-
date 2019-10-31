import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import ProductCard from "../ProductCard/ProductCard";
// import styles from "./styles";

const { width } = Dimensions.get("window");

export default class ProductGrid extends Component {
  renderItem = ({ item, index }) => (
    <ProductCard
      key={index}
      item={item}
      onPress={() => this.props.onCardPress(item)}
      cardConainerStyle={{ width: 0.41 * width }}/>
  );

  render() {
    const { products, ListFooterComponent, itemContainerStyle } = this.props;

    return (
      <FlatGrid
        items={products}
        extraData={products}
        itemDimension={0.41 * width}
        itemContainerStyle={itemContainerStyle}
        renderItem={this.renderItem}
        ListFooterComponent={ListFooterComponent}/>
    );
  }
}

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
  ListFooterComponent: PropTypes.any,
  itemContainerStyle: PropTypes.object,
  navigation: PropTypes.func,
  onCardPress: PropTypes.func
};
