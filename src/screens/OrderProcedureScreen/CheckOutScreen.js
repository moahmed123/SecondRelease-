import React, { Component } from "react";
import { View, Alert, Platform, StatusBar } from "react-native";
import { connect } from "react-redux";
import UUIDGenerator from "react-native-uuid-generator";
import PropTypes from "prop-types";
import Header from "../../components/OrderProcedure/Header";
import CheckOutDetails from "../../components/OrderProcedure/CheckOutDetails";
import FooterButton from "../../components/FooterButton/FooterButton";
// import HeaderButton from "../../components/OrderProcedure/HeaderButton";
import AppStyles from "../../AppStyles";
import Strings from '../../ExpandStores/LocalizedStrings';

class CheckoutScreen extends Component {
  static navigationOptions = () => ({
    headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
    headerStyle: {
      borderBottomWidth: 0,
      paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      cardNumberValue: ""
    };
  }

  onFooterPress = () => {
    const {
      totalPrice,
      shippingMethod,
      selectedPaymentMethod,
      shoppingBag
    } = this.props;

    UUIDGenerator.getRandomUUID(uuid => {
      const order = {
        id: uuid,
        createdAt: new Date(),
        products:
          shoppingBag.length > 0
            ? [...shoppingBag]
            : this.getProductsFromOrderHistory(),
        totalPrice:
          shippingMethod === "FedEx"
            ? (Number(totalPrice) - 5.99).toFixed(2)
            : totalPrice,
        shippingMethod,
        selectedPaymentMethod
      };

      this.handleOrderPLaced(order);
    });
  };

  handleOrderPLaced = order => {
    Alert.alert(
      Strings.screens.orderProcedureScreen.checkOutScreen.alertTitle,
      Strings.screens.orderProcedureScreen.checkOutScreen.alertMessage,
      [
        {
          text: Strings.screens.orderProcedureScreen.checkOutScreen.alertButtonText,
          onPress: () => {
            this.props.dispatch({
              type: "HANDLE_ORDER_PLACED",
              data: order
            });
            this.props.navigation.navigate("Order");
          }
        }
      ],
      { cancelable: true }
    );
  };

  getProductsFromOrderHistory = () => {
    const order = this.props.orderHistory.find(product => {
      return product.id === this.props.currentOrderId;
    });

    return order.products;
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
        <Header
          headerContainerStyle={{ borderBottomWidth: 0 }}
          headerStyle={{ fontFamily: AppStyles.fontFamily.boldFont }}
          title={Strings.screens.orderProcedureScreen.checkOutScreen.title}/>
        <CheckOutDetails
          totalPrice={this.props.totalPrice}
          shippingMethod={this.props.shippingMethod}
          title={Strings.screens.orderProcedureScreen.checkOutScreen.checkOutDetialstitle}
          cardNumbersEnding={this.props.cardNumbersEnding}
          isShippinngAddress={true}
          selectedPaymentMethod={this.props.selectedPaymentMethod}/>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <FooterButton
            footerContainerStyle={{
              backgroundColor: AppStyles.colorSet.mainThemeForegroundColor
            }}
            footerTitleStyle={{ color: "white" }}
            onPress={this.onFooterPress}
            title={Strings.screens.orderProcedureScreen.checkOutScreen.footeButton}/>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ checkout, products }) => {
  return {
    totalPrice: checkout.totalPrice,
    shippingMethod: checkout.shippingMethod,
    cardNumbersEnding: checkout.cardNumbersEnding,
    selectedPaymentMethod: checkout.selectedPaymentMethod,
    currentOrderId: checkout.currentOrderId,
    shoppingBag: products.shoppingBag,
    orderHistory: products.orderHistory
  };
};

export default connect(mapStateToProps)(CheckoutScreen);

CheckoutScreen.propTypes = {
  totalPrice: PropTypes.number,
  orderHistory: PropTypes.array,
  cardNumbersEnding: PropTypes.array,
  currentOrderId: PropTypes.string,
  shippingMethod: PropTypes.string,
  selectedPaymentMethod: PropTypes.string,
  shoppingBag: PropTypes.string,
  navigation: PropTypes.object
};
