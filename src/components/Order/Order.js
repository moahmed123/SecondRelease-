import PropTypes from "prop-types";
import React, { Component } from "react";
import { FlatList , Text,View} from "react-native";
import { connect } from "react-redux";
import OrderCard from "../OrderCard/OrderCard";
import styles from "./styles";

import * as actionCreatores from '../../action';
//Connect Url 
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";

class Order extends Component {
    componentDidMount(){        
        const parametersurl = ExpandStores.UrlStore + RoutesApi.GetOrderList;              
        const token = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.
        token.then((Token)=>{
            this.props.GetOrdersList(parametersurl, Token);
        })
    }
    onReOrder = order => {
        const { navigation } = this.props;

        this.props.dispatch({
            type: "UPDATE_TOTAL_PRICE",
            data: order.totalPrice
        });

        this.props.dispatch({
            type: "UPDATE_SHIPPING_METHOD",
            data: order.shippingMethod
        });

        this.props.dispatch({
            type: "UPDATE_SELECTED_PAYMENT_METHOD",
            data: order.selectedPaymentMethod
        });

        this.props.dispatch({
            type: "UPDATE_CURRENT_ORDER_ID",
            data: order.id
        });

        navigation.navigate("ShippingAddress");
    };

    renderItem = ({ item, index }) => (
        <OrderCard key={index} onReOrder={this.onReOrder} order={item} />
    );

    render() {
        const { extraData, orderHistory, GetOrdersListData } = this.props;
        if(GetOrdersListData){
            console.log(GetOrdersListData)
            // return <Text style={{width: '100%', textAlign: 'center', paddingTop: 30}}> Orderlist Is Empty </Text>;
            if(GetOrdersListData.orders.length > 0 ){
               return (  
                   <View>
                       <View style={styles.productContainer}>                    
                            <View style={styles.productDescriptionContainer}>
                                <Text style={styles.productDescription}>Order Name</Text>
                            </View>
                            <View style={styles.productDescriptionContainer}>
                                <Text style={styles.productDescription}>Porduct Count </Text>
                            </View>
                            <View style={styles.productDescriptionContainer}>
                                <Text style={styles.productDescription}>status</Text>
                            </View>
                            <View style={styles.productDescriptionContainer}>
                                <Text style={styles.productDescription}>Total Price </Text>
                            </View>                                            
                        </View>
                        <FlatList
                        showsVerticalScrollIndicator={false}
                        data={GetOrdersListData.orders}
                        keyExtractor={item => item.id}
                        extraData={extraData}
                        renderItem={this.renderItem}
                        itemContainerStyle={{ alignItems: "center" }}
                        style={{ alignSelf: "center" }} />
                    </View>
               )
            }else{
                return <Text style={{width: '100%', textAlign: 'center', paddingTop: 30}}> Orderlist Is Empty </Text>;
            }
         
        }else{
            return <Text> Loading ... </Text>                  
        }
        // return (
            // <FlatList
            //     showsVerticalScrollIndicator={false}
            //     data={orderHistory}
            //     keyExtractor={item => item.id}
            //     extraData={extraData}
            //     renderItem={this.renderItem}
            //     itemContainerStyle={{ alignItems: "center" }}
            //     style={{ alignSelf: "center" }} />
        // );
    }
}

// Order.propTypes = {
//     orderHistory: PropTypes.array,
//     extraData: PropTypes.object,
//     navigation: PropTypes.object
// };
function mapStateToProps(state) {
    return {
        GetOrdersListData: state.GetOrdersList
    }
}

export default connect( mapStateToProps, actionCreatores)(Order);
