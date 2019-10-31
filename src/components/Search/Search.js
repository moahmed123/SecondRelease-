import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { connect } from "react-redux";
import UUIDGenerator from "react-native-uuid-generator";
import { updatePricesByQty } from "../../utils/updatePricesByQty";
import ProductGrid from "../ProductGrid/ProductGrid";
import ProductDetailModal from "../Modals/ProductDetailModal/ProductDetailModal";
import styles from "./styles";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProductDetailVisible: false,
      product: {}
    };
  }

  onCardPress = item => {
    this.setState({
      product: item,
      isProductDetailVisible: !this.state.isProductDetailVisible
    });
  };

  onFavouritePress = item => {
    item.isFavourite = !item.isFavourite;
    this.setState({ product: item });

    this.props.dispatch({
      type: "ADD_TO_WISHLIST",
      data: item
    });
  };

  onAddToBag = item => {
    UUIDGenerator.getRandomUUID(uuid => {
      const uniqueId = uuid;
      const itemCopy = { ...item, shoppingBagId: uniqueId };
      const product = {
        id: uniqueId,
        qty: 1,
        totalPrice: Number(item.price)
      };

      updatePricesByQty(product, this.props.productPricesByQty, pricesByQty => {
        this.props.dispatch({
          type: "ADD_TO_SHOPPING_BAG",
          data: itemCopy
        });

        this.props.dispatch({
          type: "ADD_PRODUCT_PRICES_BY_QTY",
          data: pricesByQty
        });
      });

      this.setState({ isProductDetailVisible: false });
    });
  };

  render() {
    const { extraData } = this.props;

    return (
      <View style={styles.container}>
        <ProductGrid
          products={this.props.products}
          onCardPress={this.onCardPress}
          itemContainerStyle={{ alignItems: "center" }}
          extraData={extraData}/>
        <ProductDetailModal
          onFavouritePress={this.onFavouritePress}
          item={this.state.product}
          visible={this.state.isProductDetailVisible}
          onAddToBag={this.onAddToBag}
          onCancelPress={() =>
            this.setState({
              isProductDetailVisible: !this.state.isProductDetailVisible
            })}/>
      </View>
    );
  }
}

Search.propTypes = {
  title: PropTypes.string,
  products: PropTypes.array,
  SearchScreen: PropTypes.array,
  navigation: PropTypes.func,
  extraData: PropTypes.object,
  productPricesByQty: PropTypes.array
};

const mapStateToProps = ({ products }) => {
  return {
    productPricesByQty: products.productPricesByQty
  };
};

export default connect(mapStateToProps)(Search);
