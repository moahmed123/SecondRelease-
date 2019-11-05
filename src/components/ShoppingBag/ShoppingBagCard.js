import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, TouchableOpacity, Alert, Image } from "react-native";
import { connect } from "react-redux";
import CardContent from "./CardContent";
import QuantityControl from "./QuantityControl";
import styles from "./styles";

import * as actionCreatores from '../../action';
//Get Url
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";
import Strings from '../../ExpandStores/LocalizedStrings';

class ShoppingBagCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemQty: 1
        };
    }

    componentDidMount() {
        // const product = this.props.productPricesByQty.find(product => {
        //     return product.id === this.props.item.shoppingBagId;
        // });

        if (this.props.item) {
            this.setState({ itemQty: this.props.item.quantity });

        }
    }

    increaseQty = () => {
        this.setState(
            prevState => ({
                itemQty: prevState.itemQty + 1
            }),
            () => this.setObjForProps()
        );
    };

    decreaseQty = () => {
        this.setState(
            prevState => ({
                itemQty:
                    prevState.itemQty === 0 ? prevState.itemQty : prevState.itemQty - 1
            }),
            () => {
                // this.setObjForProps();
                this.state.itemQty === 0 && this.onItemEqualsZero();
            }
        );
    };

    setObjForProps = () => {        
        console.log(this.props.item);
        const token = deviceStorage.getUserData("Token");
        const productId = this.props.item.product_id;
        const quantity = this.state.itemQty;
        const option = this.props.item.option;
        const removeUrl = ExpandStores.UrlStore + RoutesApi.RemoveFromCart;
        var optionvalue = '';
        // Option When Change Quantity
        console.log("quantity");
        console.log(quantity);
        console.log(option.length)
        if(option.length == 1){
            optionvalue = " { \" " + option[0].product_option_id + " \" : \" "+ option[0].product_option_value_id + " \" }";
            optionvalue = JSON.parse(optionvalue);            
        }else if(option.length > 1){
            // If Two Option
            if(option.length == 2){
                optionvalue = 
                "{ \"" +option[0].product_option_id + "\" : \"" +  option[0].product_option_value_id + "\""                                
                + "," + "\""+
                option[1].product_option_id + "\" : \"" +  option[1].product_option_value_id + "\""
                + "}";  
                optionvalue = JSON.parse(optionvalue);            
            }else if(option.length == 3){
                optionvalue = 
                "{ \"" +option[0].product_option_id + "\" : \"" +  option[0].product_option_value_id + "\""                                
                + "," + "\""+
                option[1].product_option_id + "\" : \"" +  option[1].product_option_value_id + "\""
                + "," + "\""+
                option[2].product_option_id + "\" : \"" +  option[2].product_option_value_id + "\""
                + "}";  
                optionvalue = JSON.parse(optionvalue);            
            }
        }     
        
        token.then((Token)=>{
            const urladdCart = ExpandStores.UrlStore + RoutesApi.AddToCart;

            const urlGetCart = ExpandStores.UrlStore + RoutesApi.CartProducts; 
            
            //Remove Product And Add Again.
            this.props.showLoading(true);
            // this.props.RemoveProductCart(removeUrl, Token, this.props.item.key).then(()=>{                
            //     // Updata Unmber of itemQty
            //     this.props.AddToCart( urladdCart, Token, productId, quantity, optionvalue);                
            // });
            this.props.RemoveProductCart(removeUrl, Token, this.props.item.key).then(()=>{
                this.props.AddToCart( urladdCart, Token, productId, quantity, optionvalue).then(()=>{
                    this.props.CartProducts(urlGetCart, Token).then(()=>{
                        this.props.showLoading(false);                
                    });
                })   
            })
            console.log(optionvalue);
            // Updata Unmber of itemQty
            // this.props.AddToCart( urladdCart, Token, productId, quantity, optionvalue);
            // Refresh Data Products Cart
            // this.props.CartProducts(urlGetCart, Token).then(()=>{
            //     this.props.showLoading(false);                
            // });
        })

    };

    onItemEqualsZero = () => {
        const { item } = this.props;

        Alert.alert(
            Strings.components.shoppingBagCard.removeItemTitle,
          Strings.components.shoppingBagCard.removeItemMessage,
            [
                {
                    text: Strings.components.shoppingBagCard.removeButtonText,
                    onPress: () => this.removeFromShoppingBag(item),
                    style: "destructive"
                },
                {
                    text: Strings.components.shoppingBagCard.cancelButtonText,
                    onPress: () => this.increaseQty()
                }
            ],
            { cancelable: true }
        );
    };

    removeFromShoppingBag = item => {
        const parametersurl = ExpandStores.UrlStore + RoutesApi.RemoveFromCart;
        const urlGetCart = ExpandStores.UrlStore + RoutesApi.CartProducts;
        const token = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.

        token.then((token) => {                            
            this.props.showLoading(true);
            this.props.RemoveProductCart(parametersurl, token, item.key).then(()=>{                
                // Refresh Data Products Cart
                this.props.CartProducts(urlGetCart, token).then(()=>{
                    this.props.showLoading(false);
                })
            });
            // // Refresh Data Products Cart
            // this.props.CartProducts(urlGetCart, token).then(()=>{
            //     this.props.showLoading(false);
            // })
        });                

    };

    render() {
        const { item } = this.props;
        const totalPrice = (item.price * this.state.itemQty).toFixed(2);

        return (
            <TouchableOpacity
                // onLongPress={() => this.props.onLongPress(item)}
                activeOpacity={1}
                style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.cardImage}
                        resizeMode='cover' />
                </View>
                <CardContent
                    // price={`$${totalPrice}`}
                    price = {item.total}
                    item={item}
                    onColorSelected={this.props.onColorSelected}
                    onSizeSelected={this.props.onSizeSelected}
                    contentContainer={styles.contentContainer} />
                <QuantityControl
                    quantity={this.state.itemQty}
                    // quantity={item.quantity}
                    onIncreaseQuantity={() => this.increaseQty()}
                    onDecreaseQuantity={() => this.decreaseQty()}
                    containerStyle={styles.quantityControlContainer} />
            </TouchableOpacity>
        );
    }
}

ShoppingBagCard.propTypes = {
    onQtyChange: PropTypes.func,
    item: PropTypes.object,
    productPricesByQty: PropTypes.array,
    onSizeSelected: PropTypes.func,
    onColorSelected: PropTypes.func,
    onLongPress: PropTypes.func
};

function mapStateToProps(state) {
    return {
        ProductsData: state.ProductInfo
    }
}

export default connect(mapStateToProps, actionCreatores)(ShoppingBagCard);
