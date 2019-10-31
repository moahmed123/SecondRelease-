import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import { ordersRef, onOrdersUpdate } from "../../firebase/API/orders";

class OrdersScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.unsubscribeOrders = ordersRef.onSnapshot(querySnapshot => {
      onOrdersUpdate(querySnapshot, this.setOrderHistory);
    });
  }

  componentWillUnmount() {
    this.unsubscribeOrders();
  }

  setOrderHistory = orders => {
    console.log("orders===", orders);
    this.props.dispatch({
      type: "LOAD_ORDER_HISTORY",
      data: orders
    });
  };

  render() {
    return (
      <Order
        orderHistory={this.props.orderHistory}
        navigation={this.props.navigation}/>
    );
  }
}

OrdersScreen.propTypes = {
  navigation: PropTypes.object,
  orderHistory: PropTypes.array
};

const mapStateToProps = ({ products }) => {
  return {
    categories: products.categories,
    allProducts: products.allProducts,
    orderHistory: products.orderHistory
  };
};

export default connect(mapStateToProps)(OrdersScreen);
