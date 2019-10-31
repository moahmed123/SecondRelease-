import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Search from "../../components/Search/Search";
import { shopertinoProducts } from "../../DummyData/ShopertinoProducts";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      allProducts: shopertinoProducts
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onChangeText: this.onChangeText
    });

    console.log("this.props.navigation", this.props);
  }

  onChangeText = text => {
    const filteredProducts = this.filterProducts(text);

    this.setState({ allProducts: filteredProducts });
  };

  filterProducts = keyword => {
    if (keyword) {
      return shopertinoProducts.filter(product => {
        return (
          product.name &&
          product.name.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
        );
      });
    }
 else {
      return shopertinoProducts;
    }
  };

  render() {
    return <Search products={this.props.searchResultProducts} />;
  }
}

SearchScreen.propTypes = {
  navigation: PropTypes.object,
  searchResultProducts: PropTypes.array
};

const mapStateToProps = ({ products }) => {
  return {
    searchResultProducts: products.searchResultProducts
  };
};

export default connect(mapStateToProps)(SearchScreen);
