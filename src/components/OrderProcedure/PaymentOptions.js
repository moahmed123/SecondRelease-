import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./styles";
import AppStyles from "../../AppStyles";
import Strings from '../../ExpandStores/LocalizedStrings';
// const { width } = Dimensions.get("window");

class PaymentOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMethodIndex: 0
    };
  }

  onPaymentMethodPress = (index, paymentMethods) => {
    this.setState({ selectedMethodIndex: index }, () => {
      this.props.dispatch({
        type: "UPDATE_SELECTED_PAYMENT_METHOD",
        data: paymentMethods[this.state.selectedMethodIndex]
      });
    });
  };

  renderMethodFields = ({ index, item, paymentMethods }) => {
    // const { onCardNumberChange, cardNumberValue } = this.props;

    return (
      <TouchableOpacity
        onPress={() => this.onPaymentMethodPress(index, paymentMethods)}
        style={[
          styles.shippingMethodContainer,
          { borderBottomWidth: index === paymentMethods.length - 1 ? 0 : 0.5 }
        ]}
        key={index + ""}>
        <View style={styles.paymentOptionIconContainer}>
          <Image
            source={item.iconSource}
            resizeMode='contain'
            style={styles.paymentOptionIcon}/>
        </View>
        <View style={styles.optionDetailContainer}>
          <Text style={styles.optionTitle}>{item.title}</Text>
        </View>
        <View style={styles.methodIconContainer}>
          {this.state.selectedMethodIndex === index && (
            <Image
              source={AppStyles.iconSet.tick}
              resizeMode='contain'
              style={styles.shippingAddressIcon}/>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { paymentMethods } = this.props;

    return (
      <View>
        <View style={styles.shippingDetailsContainer}>
          <View style={styles.shippingItemsContainer}>
            {paymentMethods.map((item, index) =>
              this.renderMethodFields({ item, index, paymentMethods })
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.replace("AddACard", {
              previousScreen: "PaymentMethod"
            })}
          style={styles.addNewCardContainer}>
          <View style={styles.addNewCardIconContainer}>
            <Image
              source={AppStyles.iconSet.plus}
              resizeMode='contain'
              style={styles.addCardIcon}/>
          </View>
          <View style={styles.addNewCardTitleContainer}>
            <Text style={styles.addNewCardTitle}>{Strings.components.orderProcedure.paymentOptions.addNewCard}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

PaymentOptions.propTypes = {
  paymentMethods: PropTypes.string,
  navigation: PropTypes.object
};

export default connect()(PaymentOptions);
