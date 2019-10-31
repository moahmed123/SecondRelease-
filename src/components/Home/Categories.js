import PropTypes from "prop-types";
import React, { Component } from "react";
import { FlatList } from "react-native";
import CategoryCard from "../CategoryCard/CategoryCard";

export default class Categories extends Component {
  onCategoryPress = item => {
    this.props.navigation.navigate("CategoryProductGrid", {
      title: item.name,
      categoryId: item.category_id
    });
  };

  renderItem = ({ item }) => (
    <CategoryCard
      onCategoryPress={() => this.onCategoryPress(item)}
      item={item}/>
  );

  render() {
    const { categories, extraData } = this.props;

    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        extraData={extraData}
        renderItem={this.renderItem}/>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  onCategoryPress: PropTypes.func,
  extraData: PropTypes.object,
  navigation: PropTypes.object
};
