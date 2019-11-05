import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, FlatList, Alert,ActivityIndicator, Text, Dimensions} from "react-native";
import { connect } from "react-redux";
import ShoppingBagCard from "./ShoppingBagCard";
import FooterButton from "../FooterButton/FooterButton";
import { updatePricesByQty } from "../../utils/updatePricesByQty";
import styles from "./styles";

// Get Action Function
import * as actionCreatores from '../../action';
//Connect Url
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";
import { withNavigation } from "react-navigation";
const { height } = Dimensions.get("window");
import LoadingBar from '../../components/LoadingBar/LoadingBar';
import Strings from '../../ExpandStores/LocalizedStrings';

class ShoppingBag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        const parametersurl = ExpandStores.UrlStore + RoutesApi.CartProducts;
        const tokon = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.
        tokon.then((token) => {
            this.props.CartProducts(parametersurl, token)
        });
    }

    // onQtyChange = product => {
    //     updatePricesByQty(product, this.props.productPricesByQty, pricesByQty => {
    //         this.props.dispatch({
    //             type: "ADD_PRODUCT_PRICES_BY_QTY",
    //             data: pricesByQty
    //         });

    //         this.props.dispatch({
    //             type: "SET_TOTAL_SHOPPING_BAG_PRICE"
    //         });
    //     });
    // };

    // onColorSelected = ({ item, index }) => {
    //     item.selectedColorIndex = index;
    //     this.props.dispatch({
    //         type: "UPDATE_SHOPPING_BAG",
    //         data: item
    //     });
    // };

    // onSizeSelected = ({ item, index }) => {
    //     item.selectedSizeIndex = index;
    //     this.props.dispatch({
    //         type: "UPDATE_SHOPPING_BAG",
    //         data: item
    //     });
    // };

    // onLongPress = item => {
    //     Alert.alert(
    //         "Remove from cart",
    //         "This product will be removed from cart.",
    //         [
    //             {
    //                 text: "Remove",
    //                 onPress: () => this.removeFromShoppingBag(item),
    //                 style: "destructive"
    //             },
    //             {
    //                 text: "Cancel",
    //                 onPress: () => console.log("i'm cancelling myself")
    //             }
    //         ],
    //         { cancelable: true }
    //     );
    // };

    removeFromShoppingBag = item => {
        this.props.dispatch({
            type: "REMOVE_FROM_PRODUCT_PRICES_BY_QTY",
            data: item.shoppingBagId
        });

        this.props.dispatch({
            type: "REMOVE_FROM_SHOPPING_BAG",
            data: item
        });

        this.props.dispatch({
            type: "SET_TOTAL_SHOPPING_BAG_PRICE"
        });
    };

    onContinuePress = () => {
        // this.props.dispatch({
        //     type: "UPDATE_TOTAL_PRICE",
        //     data: Number(this.props.totalPrice)
        // });

        // this.props.shoppingBag.length && this.props.navigation.navigate("AddACard");
        this.props.navigation.navigate('Settings');
        console.log('dfdf')
    };

    renderItem = ({ item }) => (
        <ShoppingBagCard
            item={item}
            // onColorSelected={index => this.onColorSelected({ item, index })}
            // onSizeSelected={index => this.onSizeSelected({ item, index })}
            productPricesByQty={this.props.productPricesByQty}
            showLoading = {this._showLoading}
            // onQtyChange={this.onQtyChange}
            // onLongPress={this.onLongPress}
             />
    );
    _showLoading = value =>{
        this.setState({loading: value})
    }
    ProductsCartData() {
        const { ProductsCart } = this.props;

        if (ProductsCart) {
            const lengthProdcuts = ProductsCart.products.length;
            return (
                <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
                    {
                        (this.state.loading)?
                        <View style={{position: 'absolute', width: '100%', height: height ,paddingTop:height/2.5 , backgroundColor: 'rgba(0, 0, 0, 0.45)', zIndex: 222}}>
                            <ActivityIndicator size="large" color="#eee" />
                        </View>
                        :null
                    }
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={ProductsCart.products}
                        // keyExtractor={item => item.shoppingBagId.toString()}
                        // extraData={this.props.shoppingBag}
                        renderItem={this.renderItem}
                        style={{ flex: 1 }} />
                    {
                        (lengthProdcuts != 0) ?
                            <View style={[styles.footerContainer, (ProductsCart.totals.length > 5 )? {height: height * 0.3}: null]}>
                                {ProductsCart.totals.slice(1).map((Total, index) => {
                                    return (
                                        <View style={styles.totalContainer} key={index}>
                                            <View style={styles.totalTitleContainer}>
                                                <Text numberOfLines={1} ellipsizeMode="middle" style={styles.totalTitle}>{Total.title}</Text>
                                            </View>
                                            <View style={styles.titleCostSpace} />
                                            <View style={styles.totalCostContainer}>
                                                <Text ellipsizeMode="middle" numberOfLines={1} style={styles.totalCost}>{Total.text}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                                <FooterButton
                                    title={Strings.components.shoppingBag.continueTitle}
                                    onPress={this.onContinuePress}
                                    footerTitleStyle={styles.footerTitle}
                                    footerContainerStyle={styles.footerButtonContainer} />
                            </View>
                            :
                            <View style={{ flex: 10 }}>
                                <Text style={{ color: '#999', width: '100%', textAlign: 'center' }}> Empty Cart </Text>
                            </View>
                    }
                </View>
            )
        } else {
            return <LoadingBar/>
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
                {this.ProductsCartData()}
            </View>
        );
    }
}

ShoppingBag.propTypes = {
    navigation: PropTypes.object,
    shopCategories: PropTypes.array,
    item: PropTypes.object,
    shoppingBag: PropTypes.array,
    productPricesByQty: PropTypes.array,
    totalPrice: PropTypes.string
};

// const mapStateToProps = ({ products }) => {
//     return {
//         shoppingBag: products.shoppingBag,
//         productPricesByQty: products.productPricesByQty,
//         totalPrice: products.totalShoppinBagPrice
//     };
// };
function mapStateToProps(state) {
    return {
        ProductsCart: state.ProductsCart
    }
}
export default connect(mapStateToProps, actionCreatores)(ShoppingBag);
