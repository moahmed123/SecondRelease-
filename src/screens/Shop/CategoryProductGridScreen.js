import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import UUIDGenerator from "react-native-uuid-generator";
import { updatePricesByQty } from "../../utils/updatePricesByQty";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import ProductDetailModal from "../../components//Modals/ProductDetailModal/ProductDetailModal";
import styles from "./styles";
import AppStyles from "../../AppStyles";
// Call Action Function
import * as actionCreatores from '../../action';
//Connect Url 
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";
import LoadingBar from '../../components/LoadingBar/LoadingBar'

class CategoryProductGridScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title:
            typeof navigation.state.params === "undefined" ||
                typeof navigation.state.params.title === "undefined"
                ? "Cartegory Grid"
                : navigation.state.params.title,
        headerTintColor: AppStyles.colorSet.mainThemeForegroundColor
    });
    constructor(props) {
        super(props);
        this.state = {
            isProductDetailVisible: false,
            product: {},
            categoryProducts: []
        };
        this.categoryProducts = this.props.navigation.getParam("products");
        this.categoryId = this.props.navigation.getParam("categoryId");
    }

    componentDidMount() {
        if (this.categoryProducts) {
            this.setState({ categoryProducts: this.categoryProducts });
        }
        else {
            this.getCategoryProducts(this.categoryId);
        }
    }
    getCategoryProducts = categoryId => {        
        const parametersurl = ExpandStores.UrlStore + RoutesApi.CategoryProducts;        
        const tokon = deviceStorage.getUserData("Token");//Get Token In deviceStorage.
        
        tokon.then((token) => {
            this.props.GetCategoryProducts( parametersurl, token, categoryId, '', '', '')
        })        
    };

    // Return Data For Category And Product
    _DataCategoryProducts(){
        if(this.props.CategoryProductsData){
            return(
                <View>
                    <ProductGrid
                    products={this.props.CategoryProductsData.Products}
                    onCardPress={this.onCardPress}
                    itemContainerStyle={{ alignItems: "center" }}
                    //extraData={extraData}
                    />                     
                </View>                
                )
        }else{
            return <LoadingBar/>
        }
    }

    render() {
//        const { extraData } = this.props;

        return (
            <View style={styles.container}>
                {this._DataCategoryProducts()}
                {/* <ProductDetailModal
                    item={this.state.product}
                    visible={this.state.isProductDetailVisible}
                    onFavouritePress={this.onFavouritePress}
                    onAddToBag={this.onAddToBag}
                    onCancelPress={() =>
                        this.setState({
                            isProductDetailVisible: !this.state.isProductDetailVisible
                        })} 
                /> */}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        CategoryProductsData: state.CategoryProducts
    }
}
export default connect(mapStateToProps, actionCreatores)(CategoryProductGridScreen);
// export default CategoryProductGridScreen;