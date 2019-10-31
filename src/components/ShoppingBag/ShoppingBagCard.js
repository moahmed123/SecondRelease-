import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, TouchableOpacity, Alert, Image } from "react-native";
import { connect } from "react-redux";
import CardContent from "./CardContent";
import QuantityControl from "./QuantityControl";
import styles from "./styles";

class ShoppingBagCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemQty: 1
    };
  }

  componentDidMount() {
    const product = this.props.productPricesByQty.find(product => {
      return product.id === this.props.item.shoppingBagId;
    });

    if (product) {
      this.setState({ itemQty: product.qty });
    }
  }

  increaseQty = () => {
    this.setState(
      prevState => ({
        itemQty: prevState.itemQty + 1
      }),
      () => this.setObjForProps()
    );
  };

  decreaseQty = () => {
    this.setState(
      prevState => ({
        itemQty:
          prevState.itemQty === 0 ? prevState.itemQty : prevState.itemQty - 1
      }),
      () => {
        this.setObjForProps();
        this.state.itemQty === 0 && this.onItemEqualsZero();
      }
    );
  };

  setObjForProps = () => {
    const obj = {
      id: this.props.item.shoppingBagId,
      qty: this.state.itemQty,
      totalPrice: this.props.item.price * this.state.itemQty
    };

    this.props.onQtyChange(obj);
  };

  onItemEqualsZero = () => {
    const { item } = this.props;

    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from the cart?",
      [
        {
          text: "Remove",
          onPress: () => this.removeFromShoppingBag(item),
          style: "destructive"
        },
        {
          text: "Cancel",
          onPress: () => this.increaseQty()
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

  render() {
    const { item } = this.props;
    const totalPrice = (item.price * this.state.itemQty).toFixed(2);

    return (
      <TouchableOpacity
        onLongPress={() => this.props.onLongPress(item)}
        activeOpacity={1}
        style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.photo }}
            style={styles.cardImage}
            resizeMode='cover'/>
        </View>
        <CardContent
          price={`$${totalPrice}`}
          item={item}
          onColorSelected={this.props.onColorSelected}
          onSizeSelected={this.props.onSizeSelected}
          contentContainer={styles.contentContainer}/>
        <QuantityControl
          quantity={this.state.itemQty}
          onIncreaseQuantity={() => this.increaseQty()}
          onDecreaseQuantity={() => this.decreaseQty()}
          containerStyle={styles.quantityControlContainer}/>
      </TouchableOpacity>
    );
  }
}

ShoppingBagCard.propTypes = {
  onQtyChange: PropTypes.func,
  item: PropTypes.object,
  productPricesByQty: PropTypes.array,
  onSizeSelected: PropTypes.func,
  onColorSelected: PropTypes.func,
  onLongPress: PropTypes.func
};

export default connect()(ShoppingBagCard);
