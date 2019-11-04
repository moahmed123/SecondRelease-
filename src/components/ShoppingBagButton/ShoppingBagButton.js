import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import IconBadge from "react-native-icon-badge";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppStyles from "../../AppStyles";
import styles from "./styles";


import * as actionCreatores from '../../action';
//Get Url
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";

class ShoppingBagButton extends React.Component {
    componentDidMount(){
        const urlGetCart = ExpandStores.UrlStore + RoutesApi.CartProducts;
        const token = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.
        token.then((token) => {
            // Refresh Data Products Cart
            this.props.CartProducts(urlGetCart, token);
        })
    }
    render() {
        const { bagItems } = this.props;
        if(bagItems){
          console.log(bagItems.products && bagItems.products.length);
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <IconBadge
                        MainElement={<Image
                            source={AppStyles.iconSet.shoppingBagFilled}
                            style={styles.headerButtonImage} />}
                        BadgeElement={
                            (bagItems)? <Text style={{ color: "#FFFFFF" }}>{bagItems.products.length}</Text> : null
                            // bagItems.products.length >= 0 && ( <Text style={{ color: "#FFFFFF" }}>2</Text> )
                        }
                        IconBadgeStyle={{
                            width: 20,
                            height: 20,
                            // backgroundColor: bagItems.products.length >= 0 ? "#fb898e" : "transparent"
                            backgroundColor: bagItems ?  "#fb898e": "transparent"
                        }} />
                </TouchableOpacity>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        bagItems: state.ProductsCart
    }
}
// ShoppingBagButton.propTypes = {
//     onPress: PropTypes.func,
//     bagItems: PropTypes.array
// };

export default connect(mapStateToProps, actionCreatores)(ShoppingBagButton);
