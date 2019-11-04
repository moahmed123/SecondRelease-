import React, { Component } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
// import AppStyles from "../../AppStyles";
import Strings from '../../ExpandStores/LocalizedStrings';
// const { width } = Dimensions.get("window");

export default class CheckOutDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMethodIndex: 0
    };
  }

  renderCheckOutDetails = ({ index, item, checkoutDetail }) => {
    return (
      <View
        style={[
          styles.checkOutItemContainer,
          { borderBottomWidth: index === checkoutDetail.length - 1 ? 0 : 0.5 }
        ]}>
        <View style={styles.checkOutTitleContainer}>
          <Text style={styles.checkOutTitle}>{item.title}</Text>
        </View>
        <View style={styles.checkOutValueContainer}>
          <Text style={styles.checkOutValue}>{item.value}</Text>
        </View>
      </View>
    );
  };

  render() {
    const {
      containerStyle,
      shippingMethod,
      totalPrice,
      selectedPaymentMethod
    } = this.props;
    let paymentValue = {
      apple: "Apple Pay",
      google: "Google Pay"
    };

    let payment = {
      title: Strings.components.orderProcedure.checkOutDetials.paymentTitle,
      value: paymentValue[selectedPaymentMethod.key]
        ? paymentValue[selectedPaymentMethod.key]
        : `Visa ${selectedPaymentMethod.cardEndingNumber}`
    };

    let shipping = {
      title: Strings.components.orderProcedure.checkOutDetials.shippingTitle,
      value: shippingMethod
    };

    let total = {
      title: Strings.components.orderProcedure.checkOutDetials.totalTitle,
      value: `$${totalPrice}`
    };

    const checkoutDetail = [payment, shipping, total];

    return (
      <View style={[styles.checkOutDetailContainer, containerStyle]}>
        {checkoutDetail.map((item, index) =>
          this.renderCheckOutDetails({ item, index, checkoutDetail })
        )}
      </View>
    );
  }
}

CheckOutDetails.propTypes = {
  shippingMethod: PropTypes.string,
  totalPrice: PropTypes.number,
  selectedPaymentMethod: PropTypes.string,
  containerStyle: PropTypes.style
};
