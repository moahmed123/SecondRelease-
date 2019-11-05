import React, { Component } from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import UUIDGenerator from "react-native-uuid-generator";
import Categories from "./Categories";
import NewArrivals from "./NewArrivals";
import Featured from "./Featured";
import BestSellers from "./BestSellers";
import { updatePricesByQty } from "../../utils/updatePricesByQty";
import ProductDetailModal from "../Modals/ProductDetailModal/ProductDetailModal";
import Strings from '../../ExpandStores/LocalizedStrings';

class Home extends Component {
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
    //TODO: change to uuidv4
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
    const {
      navigation,
      categories,
      newArrivals,
      bestSellers,
      featured
    } = this.props;

    return (
      <ScrollView>
        <Categories navigation={navigation} categories={categories} />
        <NewArrivals
          title={Strings.home.home.newArrivals}
          dataSource={newArrivals}
          onCardPress={this.onCardPress}
          navigation={navigation}/>
        <Featured
          onCardPress={this.onCardPress}
          featuredProducts={featured}
          title={Strings.home.home.featured}/>
        <BestSellers
          onCardPress={this.onCardPress}
          bestSellerProducts={bestSellers}
          title={Strings.home.home.bestSellers}
          navigation={navigation}
          shouldLimit={true}
          limit={10}/>
        <ProductDetailModal
          item={this.state.product}
          visible={this.state.isProductDetailVisible}
          onFavouritePress={this.onFavouritePress}
          onAddToBag={this.onAddToBag}
          onCancelPress={() =>
            this.setState({
              isProductDetailVisible: !this.state.isProductDetailVisible
            })}/>
      </ScrollView>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object,
  productPricesByQty: PropTypes.array,
  categories: PropTypes.array,
  newArrivals: PropTypes.array,
  bestSellers: PropTypes.array,
  featured: PropTypes.array
};

const mapStateToProps = ({ products }) => {
  return {
    productPricesByQty: products.productPricesByQty
  };
};

export default connect(mapStateToProps)(Home);
