import React, { Component } from "react";
import PropTypes from "prop-types";
import Wishlist from "../../components/Wishlist/Wishlist";
// import AppStyles from "../../AppStyles";

export default class WishlistScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Wishlist />;
  }
}

WishlistScreen.propTypes = {
  title: PropTypes.string,
  bestSellerProducts: PropTypes.array,
  navigation: PropTypes.object,
  extraData: PropTypes.object
};
