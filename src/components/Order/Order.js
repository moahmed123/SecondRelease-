import PropTypes from "prop-types";
import React, { Component } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import OrderCard from "../OrderCard/OrderCard";
// import styles from "./styles";

class Order extends Component {
  onReOrder = order => {
    const { navigation } = this.props;

    this.props.dispatch({
      type: "UPDATE_TOTAL_PRICE",
      data: order.totalPrice
    });

    this.props.dispatch({
      type: "UPDATE_SHIPPING_METHOD",
      data: order.shippingMethod
    });

    this.props.dispatch({
      type: "UPDATE_SELECTED_PAYMENT_METHOD",
      data: order.selectedPaymentMethod
    });

    this.props.dispatch({
      type: "UPDATE_CURRENT_ORDER_ID",
      data: order.id
    });

    navigation.navigate("ShippingAddress");
  };

  renderItem = ({ item, index }) => (
    <OrderCard key={index} onReOrder={this.onReOrder} order={item} />
  );

  render() {
    const { extraData, orderHistory } = this.props;

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={orderHistory}
        keyExtractor={item => item.id}
        extraData={extraData}
        renderItem={this.renderItem}
        itemContainerStyle={{ alignItems: "center" }}
        style={{ alignSelf: "center" }}/>
    );
  }
}

Order.propTypes = {
  orderHistory: PropTypes.array,
  extraData: PropTypes.object,
  navigation: PropTypes.object
};

export default connect()(Order);
