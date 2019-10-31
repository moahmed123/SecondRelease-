import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { connect } from "react-redux";
import UUIDGenerator from "react-native-uuid-generator";
import { updatePricesByQty } from "../../utils/updatePricesByQty";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import ProductDetailModal from "../../components//Modals/ProductDetailModal/ProductDetailModal";
import styles from "./styles";
import AppStyles from "../../AppStyles";

class CategoryProductGridScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title:
      typeof navigation.state.params === "undefined" ||
      typeof navigation.state.params.title === "undefined"
        ? "Cartegory Grid"
        : navigation.state.params.title,
    headerTintColor: AppStyles.colorSet.mainThemeForegroundColor
  });

  constructor(props) {
    super(props);
    this.state = {
      isProductDetailVisible: false,
      product: {},
      categoryProducts: []
    };
    this.categoryProducts = this.props.navigation.getParam("products");
    this.categoryId = this.props.navigation.getParam("categoryId");
  }

  componentDidMount() {
    if (this.categoryProducts) {
      this.setState({ categoryProducts: this.categoryProducts });
    }
 else {
      this.getCategoryProducts(this.categoryId);
    }
  }

  getCategoryProducts = categoryId => {
    const categoryProducts = this.props.allProducts.filter(product => {
      return product.category === categoryId;
    });

    this.setState({ categoryProducts });
  };

  onCardPress = item => {
    this.setState({
      isProductDetailVisible: !this.state.isProductDetailVisible,
      product: item
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
          products={this.state.categoryProducts}
          onCardPress={this.onCardPress}
          itemContainerStyle={{ alignItems: "center" }}
          extraData={extraData}/>
        <ProductDetailModal
          item={this.state.product}
          visible={this.state.isProductDetailVisible}
          onFavouritePress={this.onFavouritePress}
          onAddToBag={this.onAddToBag}
          onCancelPress={() =>
            this.setState({
              isProductDetailVisible: !this.state.isProductDetailVisible
            })}/>
      </View>
    );
  }
}

CategoryProductGridScreen.propTypes = {
  title: PropTypes.string,
  CategoryProductGridScreen: PropTypes.array,
  navigation: PropTypes.object,
  extraData: PropTypes.object,
  allProducts: PropTypes.array,
  productPricesByQty: PropTypes.array
};

const mapStateToProps = ({ products }) => {
  return {
    productPricesByQty: products.productPricesByQty,
    allProducts: products.allProducts
  };
};

export default connect(mapStateToProps)(CategoryProductGridScreen);
