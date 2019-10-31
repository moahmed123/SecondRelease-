import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import Home from "../../components/Home/Home";
import { productsRef, onProductsUpdate } from "../../firebase/API/products";
import {
  categoriesRef,
  onCategoriesUpdate
} from "../../firebase/API/categories";

//Call Action And Get Home Page Data 
// import * as actionCreatores from '../../action';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.unsubscribeProducts = productsRef.onSnapshot(querySnapshot => {
      onProductsUpdate(querySnapshot, this.setProducts);
    });
    this.unsubscribeCategories = categoriesRef.onSnapshot(querySnapshot => {
      onCategoriesUpdate(querySnapshot, this.setCategories);
    });
  }

  componentWillUnmount() {
    this.unsubscribeProducts();
    this.unsubscribeCategories();
  }

  setProducts = products => {
    this.props.dispatch({
      type: "SET_PRODUCTS",
      data: products
    });
  };

  setCategories = categories => {
    this.props.dispatch({
      type: "SET_CATEGORIES",
      data: categories
    });
  };

  render() {
    // const {homeData} = this.props; 
    // if(homeData){
    //   console.log(homeData)
    // }
    return (
      <Home
        categories={this.props.categories}
        newArrivals={this.props.allProducts}
        featured={this.props.allProducts}
        bestSellers={this.props.allProducts}
        navigation={this.props.navigation}/>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object,
  categories: PropTypes.array,
  allProducts: PropTypes.array
};

const mapStateToProps = ({ products }) => {
  return {
    categories: products.categories,
    allProducts: products.allProducts
  };
};
// function mapStateToProps(state) {
//   return {
//     homeData: state.homeStore
//   }
// }
export default connect(mapStateToProps)(HomeScreen);
