import PropTypes from "prop-types";
import React, { Component } from "react";
import { FlatList , Text} from "react-native";
import CategoryCard from "../CategoryCard/CategoryCard";
import styles from "./styles";

import * as actionCreatores from '../../action';
import { connect } from "react-redux";
//Connect Url 
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";
import LoadingBar from '../../components/LoadingBar/LoadingBar';


class Shop extends Component {
    componentDidMount(){
        const parametersurl = ExpandStores.UrlStore + RoutesApi.SelectedCategories;
        const token = deviceStorage.getUserData("Token");//Get Token In deviceStorage.
        token.then((Token)=>{
            this.props.Categories(parametersurl, Token);
        })        
    }
    onCategoryPress = item => {
        this.props.CategoryProducts(null); //To Refresh products
        this.props.navigation.navigate("CategoryProductGrid", {
            title: item.name,
            categoryId: item.category_id
        });
    };

    renderItem = ({ item, index }) => (
        <CategoryCard
            onCategoryPress={() => this.onCategoryPress(item)}
            imageContainerStyle={styles.categoryImageContainerStyle}
            key={index}
            item={item} />
    );

    render() {
        const { extraData, CategoriesData } = this.props;
        console.log(CategoriesData);
        if(CategoriesData){
            return(
                <FlatList
                showsVerticalScrollIndicator={false}
                data={CategoriesData.Categories}
                keyExtractor={(item, index) => index.toString()}
                extraData={extraData}
                renderItem={this.renderItem}
                itemContainerStyle={{ alignItems: "center" }}
                style={{ alignSelf: "center" }} />
            )
        }else{
            return <LoadingBar/>
        }
        
    }
}

// Shop.propTypes = {
//     navigation: PropTypes.object,
//     extraData: PropTypes.object,
//     categories: PropTypes.array
// };

function mapStateToProps(state) {
    return {
        CategoriesData: state.CategoriesResult
    }
}
export default connect(mapStateToProps, actionCreatores)(Shop);