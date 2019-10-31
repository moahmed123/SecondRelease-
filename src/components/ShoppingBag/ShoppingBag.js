import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, FlatList, Alert, Text } from "react-native";
import { connect } from "react-redux";
import ShoppingBagCard from "./ShoppingBagCard";
import FooterButton from "../FooterButton/FooterButton";
import { updatePricesByQty } from "../../utils/updatePricesByQty";
import styles from "./styles";

class ShoppingBag extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({
      type: "SET_TOTAL_SHOPPING_BAG_PRICE"
    });
  }

  onQtyChange = product => {
    updatePricesByQty(product, this.props.productPricesByQty, pricesByQty => {
      this.props.dispatch({
        type: "ADD_PRODUCT_PRICES_BY_QTY",
        data: pricesByQty
      });

      this.props.dispatch({
        type: "SET_TOTAL_SHOPPING_BAG_PRICE"
      });
    });
  };

  onColorSelected = ({ item, index }) => {
    item.selectedColorIndex = index;
    this.props.dispatch({
      type: "UPDATE_SHOPPING_BAG",
      data: item
    });
  };

  onSizeSelected = ({ item, index }) => {
    item.selectedSizeIndex = index;
    this.props.dispatch({
      type: "UPDATE_SHOPPING_BAG",
      data: item
    });
  };

  onLongPress = item => {
    Alert.alert(
      "Remove from cart",
      "This product will be removed from cart.",
      [
        {
          text: "Remove",
          onPress: () => this.removeFromShoppingBag(item),
          style: "destructive"
        },
        {
          text: "Cancel",
          onPress: () => console.log("i'm cancelling myself")
        }
      ],
      { cancelable: true }
    );
  };

  removeFromShoppingBag = item => {
    this.props.dispatch({
      type: "REMOVE_FROM_PRODUCT_PRICES_BY_QTY",
      data: item.shoppingBagId
    });

    this.props.dispatch({
      type: "REMOVE_FROM_SHOPPING_BAG",
      data: item
    });

    this.props.dispatch({
      type: "SET_TOTAL_SHOPPING_BAG_PRICE"
    });
  };

  onContinuePress = () => {
    this.props.dispatch({
      type: "UPDATE_TOTAL_PRICE",
      data: Number(this.props.totalPrice)
    });

    this.props.shoppingBag.length && this.props.navigation.navigate("AddACard");
  };

  renderItem = ({ item }) => (
    <ShoppingBagCard
      item={item}
      onColorSelected={index => this.onColorSelected({ item, index })}
      onSizeSelected={index => this.onSizeSelected({ item, index })}
      productPricesByQty={this.props.productPricesByQty}
      onQtyChange={this.onQtyChange}
      onLongPress={this.onLongPress}/>
  );

  render() {
    // const { item } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.props.shoppingBag}
          keyExtractor={item => item.shoppingBagId.toString()}
          extraData={this.props.shoppingBag}
          renderItem={this.renderItem}
          style={{ flex: 1 }}/>
        <View style={styles.footerContainer}>
          <View style={styles.totalContainer}>
            <View style={styles.totalTitleContainer}>
              <Text style={styles.totalTitle}>{"Total"}</Text>
            </View>
            <View style={styles.titleCostSpace} />
            <View style={styles.totalCostContainer}>
              <Text
                style={styles.totalCost}>{`$${this.props.totalPrice}`}</Text>
            </View>
          </View>
          <FooterButton
            title={"CONTINUE"}
            onPress={this.onContinuePress}
            footerTitleStyle={styles.footerTitle}
            footerContainerStyle={styles.footerButtonContainer}/>
        </View>
      </View>
    );
  }
}

ShoppingBag.propTypes = {
  navigation: PropTypes.object,
  shopCategories: PropTypes.array,
  item: PropTypes.object,
  shoppingBag: PropTypes.array,
  productPricesByQty: PropTypes.array,
  totalPrice: PropTypes.string
};

const mapStateToProps = ({ products }) => {
  return {
    shoppingBag: products.shoppingBag,
    productPricesByQty: products.productPricesByQty,
    totalPrice: products.totalShoppinBagPrice
  };
};

export default connect(mapStateToProps)(ShoppingBag);
