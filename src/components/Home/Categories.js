import PropTypes from "prop-types";
import React, { Component } from "react";
import { FlatList } from "react-native";
import CategoryCard from "../CategoryCard/CategoryCard";
import { withNavigation } from "react-navigation";
import * as actionCreatores from '../../action';
import { connect } from "react-redux";

class Categories extends Component {
    onCategoryPress = item => {
        this.props.CategoryProducts(null);
        this.props.navigation.navigate("CategoryProductGrid", {
            title: item.name,
            categoryId: item.category_id
        });

    };

    renderItem = ({ item }) => (
        <CategoryCard
            onCategoryPress={() => this.onCategoryPress(item)}
            item={item} />
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
                renderItem={this.renderItem} />
        );
    }
}

// Categories.propTypes = {
//   categories: PropTypes.array.isRequired,
//   onCategoryPress: PropTypes.func,
//   extraData: PropTypes.object,
//   navigation: PropTypes.object
// };


function mapStateToProps(state) {
    return {
        CategoryProductsData: state.CategoryProducts
    }
}
export default connect(mapStateToProps, actionCreatores)(withNavigation(Categories));