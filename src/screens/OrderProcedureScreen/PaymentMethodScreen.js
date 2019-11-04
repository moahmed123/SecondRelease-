import React, { Component } from "react";
import { Platform, StatusBar } from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PropTypes from "prop-types";
import Header from "../../components/OrderProcedure/Header";
import ProcedureImage from "../../components/OrderProcedure/ProcedureImage";
import PaymentOptions from "../../components/OrderProcedure/PaymentOptions";
import HeaderButton from "../../components/OrderProcedure/HeaderButton";
import AppStyles from "../../AppStyles";
import Strings from '../../ExpandStores/LocalizedStrings';
// import styles from "./styles";

class PaymentMethodScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
    headerStyle: {
      borderBottomWidth: 0,
      paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
      // height: Platform.OS === "android" && StatusBar.currentHeight * 3
    },
    headerLeft: (
      <HeaderButton
        onPress={() => {
          navigation.goBack();
        }}
        buttonContainerStyle={{ marginLeft: 10 }}
        title={Strings.screens.orderProcedureScreen.paymentMethodScreen.headerBackButton}/>
    ),
    headerRight: (
      <HeaderButton
        onPress={() => {
          navigation.replace("Checkout");
        }}
        buttonContainerStyle={{ marginRight: 10 }}
        title={Strings.screens.orderProcedureScreen.paymentMethodScreen.headerRightButton}/>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      cardNumberValue: ""
    };
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <Header title={Strings.screens.orderProcedureScreen.paymentMethodScreen.title} />
        <ProcedureImage source={AppStyles.imageSet.creditCard} />
        <PaymentOptions
          navigation={this.props.navigation}
          cardNumbersEnding={this.props.cardNumbersEnding}
          paymentMethods={this.props.paymentMethods}/>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ checkout }) => {
  return {
    totalPrice: checkout.totalPrice,
    shippingMethod: checkout.shippingMethod,
    cardNumbersEnding: checkout.cardNumbersEnding,
    paymentMethods: checkout.paymentMethods
  };
};

export default connect(mapStateToProps)(PaymentMethodScreen);

PaymentMethodScreen.propTypes = {
  cardNumbersEnding: PropTypes.array,
  navigation: PropTypes.object,
  paymentMethods: PropTypes.array
};
