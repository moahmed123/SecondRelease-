import PropTypes from "prop-types";
import React, { Component } from "react";
import { FlatList } from "react-native";
import CategoryCard from "../CategoryCard/CategoryCard";
import styles from "./styles";

export default class Shop extends Component {
  onCategoryPress = item => {
    this.props.navigation.navigate("CategoryProductGrid", {
      title: item.name,
      categoryId: item.id
    });
  };

  renderItem = ({ item, index }) => (
    <CategoryCard
      onCategoryPress={() => this.onCategoryPress(item)}
      imageContainerStyle={styles.categoryImageContainerStyle}
      key={index}
      item={item}/>
  );

  render() {
    const { extraData, categories } = this.props;

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        extraData={extraData}
        renderItem={this.renderItem}
        itemContainerStyle={{ alignItems: "center" }}
        style={{ alignSelf: "center" }}/>
    );
  }
}

Shop.propTypes = {
  navigation: PropTypes.object,
  extraData: PropTypes.object,
  categories: PropTypes.array
};
