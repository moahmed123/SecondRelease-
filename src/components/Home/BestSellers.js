import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import ProductGrid from "../ProductGrid/ProductGrid";
import FooterButton from "../FooterButton/FooterButton";
import Strings from '../../ExpandStores/LocalizedStrings';
import styles from "./styles";

export default class BestSellers extends Component {
  onFooterPress = () => {
    this.props.navigation.navigate("CategoryProductGrid", {
      title: "Best Sellers",
      products: this.props.bestSellerProducts
    });
  };

  renderlistFooter = () => (
    <FooterButton onPress={() => this.onFooterPress()} title={Strings.components.home.bestSellers.browseAll} />
  );

  render() {
    const {
      bestSellerProducts,
      title,
      extraData,
      onCardPress,
      shouldLimit,
      limit
    } = this.props;
    const data = [...bestSellerProducts];

    return (
      <View style={styles.unitContainer}>
        <Text style={styles.unitTitle}>{title}</Text>
        <ProductGrid
          products={shouldLimit ? data.splice(0, limit) : data}
          onCardPress={onCardPress}
          extraData={extraData}
          ListFooterComponent={this.renderlistFooter}
          itemContainerStyle={{ alignItems: "center" }}/>
      </View>
    );
  }
}

BestSellers.propTypes = {
  title: PropTypes.string,
  bestSellerProducts: PropTypes.array,
  navigation: PropTypes.object,
  extraData: PropTypes.object,
  onCardPress: PropTypes.func,
  shouldLimit: PropTypes.bool,
  limit: PropTypes.number
};
