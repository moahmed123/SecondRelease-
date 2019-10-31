import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Shop from "../../components/Shop/Shop";
// import AppStyles from "../../AppStyles";

// import styles from "./styles";

class ShopScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Shop
        categories={this.props.categories}
        navigation={this.props.navigation}/>
    );
  }
}

ShopScreen.propTypes = {
  navigation: PropTypes.object,
  categories: PropTypes.array
};

const mapStateToProps = ({ products }) => {
  return {
    categories: products.categories
  };
};

export default connect(mapStateToProps)(ShopScreen);
