import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "./styles";

import ProductDetailModal from "../../components/Modals/ProductDetailModal/ProductDetailModal";
import * as actionCreatores from '../../action';
import { connect } from "react-redux";
//Connect Url 
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";


class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isProductDetailVisible: false, // Use Page Visible             
        };       
    }

    render() {
        const { cardConainerStyle, onPress, item } = this.props;

        return (
            <View>                
                <TouchableOpacity
                    activeOpacity={0.7}                    
                    onPress={()=>{
                        const parametersurl = ExpandStores.UrlStore + RoutesApi.ProductInfo;        
                        const tokon = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.
                        tokon.then((token) => {                            
                            this.props.GetProductInfo(parametersurl, token, item.product_id);
                            // Redirect To Page Is such as pupops.
                            this.setState({isProductDetailVisible: true});                            
                        });                        
                    }}
                    style={[styles.productCardConainer, cardConainerStyle]}>
                    <View style={styles.productCardImageConainer}>
                            {/* <Image
                                style={styles.productCardImage} 
                                defaultSource = {require("./../../../assets/ReloadImage.png")}
                            /> */}
                        {
                            (item.thumb)?                            
                            <Image 
                                style={styles.productCardImage} 
                                source={{ uri: item.thumb }}                                                              
                            />
                            :
                            <Image 
                                style={styles.productCardImage} 
                                source={
                                    (item.image)?{ uri: item.image } : require("./../../../assets/ReloadImage.png")
                                }
                            />
                        }                    
                    </View>
                    {
                        (item.special)? 
                            <Text>
                                <Text style={[styles.productCardPrice, {fontSize: 10, color:'#999', textDecorationLine: 'line-through', textDecorationColor: '#777'}]}>{item.price}</Text>
                                <Text style={[styles.productCardPrice, {color: '#cc0000'}]}>{item.special}</Text>
                            </Text>                            
                        :
                            <Text style={styles.productCardPrice}>{item.price}</Text>
                    }

                                        
                    <Text style={styles.productCardDescription} numberOfLines={1}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
                
                <ProductDetailModal                    
                    visible={this.state.isProductDetailVisible}
                    onFavouritePress={this.onFavouritePress}
                    // onAddToBag={this.onAddToBag}
                    onCancelPress={() =>
                        {this.setState({
                            isProductDetailVisible: !this.state.isProductDetailVisible
                            // isProductDetailVisible: false
                        });
                        this.props.refreshData();
                    }}                     
                />                                
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        ProductsData: state.ProductInfo
    }
}

// ProductCard.propTypes = {
//     cardConainerStyle: PropTypes.object,
//     item: PropTypes.object,
//     onPress: PropTypes.func
// };
export default connect(mapStateToProps, actionCreatores)(ProductCard);