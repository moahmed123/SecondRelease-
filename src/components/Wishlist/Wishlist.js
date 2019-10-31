import React, { Component } from "react";
import { View, Text} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UUIDGenerator from "react-native-uuid-generator";
import { updatePricesByQty } from "../../utils/updatePricesByQty";
import ProductGrid from "../ProductGrid/ProductGrid";
import ProductDetailModal from "../Modals/ProductDetailModal/ProductDetailModal";
import styles from "./styles";

import * as actionCreatores from '../../action';
//Connect Url 
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";
import LoadingBar from '../../components/LoadingBar/LoadingBar';


class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isProductDetailVisible: false,
            product: {}
        };
    }
    componentDidMount(){        
        const parametersurl = ExpandStores.UrlStore + RoutesApi.GetWishList;              
        const token = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.
        token.then((Token)=>{
            this.props.GetWishlist(parametersurl, Token);
        })
    }

    _WishlistData = () => {
        const {WishlistData} = this.props;
        if(WishlistData){
            if(WishlistData.products.length > 0 ){
                return (                
                    <ProductGrid
                        products={WishlistData.products}
                        // onCardPress={this.onCardPress}
                        itemContainerStyle={{ alignItems: "center" }}
                        // extraData={extraData}
                         />
                )
            }else{
                return <Text style={{width: '100%', textAlign: 'center', paddingTop: 30}}> Wishlist Is Empty </Text>;
            }                        
            
        }else{            
            return <LoadingBar/>
        }
    }
    render() {
        const { extraData } = this.props;

        return (
            <View style={styles.container}>
                {this._WishlistData()}
                
                {/* <ProductDetailModal
                    item={this.state.product}
                    visible={this.state.isProductDetailVisible}
                    onFavouritePress={this.onFavouritePress}
                    onAddToBag={this.onAddToBag}
                    onCancelPress={() =>
                        this.setState({
                            isProductDetailVisible: !this.state.isProductDetailVisible
                        })} /> */}
            </View>
        );
    }
}

// Wishlist.propTypes = {
//     title: PropTypes.string,
//     wishlist: PropTypes.array,
//     navigation: PropTypes.func,
//     extraData: PropTypes.object,
//     productPricesByQty: PropTypes.array
// };

function mapStateToProps(state) {
    return {
        WishlistData: state.GetWishlist
    }
}
export default connect(mapStateToProps, actionCreatores)(Wishlist);
