import React, { Component } from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./styles";
import AppStyles from "../../AppStyles";
import Strings from '../../ExpandStores/LocalizedStrings';
// const { width } = Dimensions.get("window");

let upsGround = {
  name: "UPS Ground",
  arrivalTime: Strings.components.orderProcedure.shippingDetails.upsArrivalTime,
  price: Strings.components.orderProcedure.shippingDetails.upsPrice
};

let fedEx = {
  name: "FedEx",
  arrivalTime: Strings.components.orderProcedure.shippingDetails.fedExArrivalTime,
  price: "$5.99"
};

const shippingMethod = [upsGround, fedEx];

let name = {
  id: 1,
  placeholder: Strings.components.orderProcedure.shippingDetails.namePlaceHolder,
  isEditable: true,
  onSelectedValueChange: () => false
};

let email = {
  id: 2,
  placeholder: Strings.components.orderProcedure.shippingDetails.emailPlaceHolder,
  isEditable: true,
  onSelectedValueChange: () => false
};

let address = {
  id: 3,
  placeholder: Strings.components.orderProcedure.shippingDetails.addressPlaceHolder,
  isEditable: true,
  onSelectedValueChange: () => false
};

let apt = {
  id: 4,
  placeholder: Strings.components.orderProcedure.shippingDetails.aptPlaceHolder,
  isEditable: true,
  onSelectedValueChange: () => false
};

let zipCode = {
  id: 5,
  placeholder: Strings.components.orderProcedure.shippingDetails.zipCodePlaceHolder,
  isEditable: true,
  onSelectedValueChange: () => false
};

let city = {
  id: 6,
  placeholder: Strings.components.orderProcedure.shippingDetails.cityPlaceHolder,
  isEditable: true,
  onSelectedValueChange: () => false
};

let state = {
  id: 7,
  placeholder: Strings.components.orderProcedure.shippingDetails.statePlaceHolder,
  isEditable: true,
  onSelectedValueChange: () => false
};

let country = {
  id: 8,
  placeholder: Strings.components.orderProcedure.shippingDetails.countryPlaceHolder,
  isEditable: false,
  value: Strings.components.orderProcedure.shippingDetails.countryValue,
  onSelectedValueChange: () => false
};

const shippingAddressFields = [
  name,
  email,
  address,
  apt,
  zipCode,
  city,
  state,
  country
];

class ShippingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMethodIndex: 0
    };
  }

  onShippingMethodPress = index => {
    this.setState({ selectedMethodIndex: index }, () => {
      this.props.dispatch({
        type: "UPDATE_SHIPPING_METHOD",
        data: shippingMethod[this.state.selectedMethodIndex].name
      });
    });
  };

  keyExtractor = (item, index) => index.id;

  renderAddressFields = ({ index, item }) => {
    const { onCardNumberChange, cardNumberValue } = this.props;
    const isLastItem = index === shippingAddressFields.length - 1;

    return (
      <View
        style={[
          styles.addressInputFieldContainer,
          { borderBottomWidth: isLastItem ? 0 : 0.5 }
        ]}
        key={index + ""}>
        <TextInput
          underlineColorAndroid='transparent'
          style={styles.addressInputField}
          editable={item.isEditable}
          placeholderTextColor={AppStyles.colorSet.hairlineColor}
          placeholder={item.placeholder}
          value={isLastItem ? item.value : cardNumberValue}
          onChangeText={onCardNumberChange}/>
      </View>
    );
  };

  renderMethodFields = ({ index, item }) => {
    // const { onCardNumberChange, cardNumberValue } = this.props;

    return (
      <TouchableOpacity
        onPress={() => this.onShippingMethodPress(index)}
        style={[
          styles.shippingMethodContainer,
          { borderBottomWidth: index === shippingMethod.length - 1 ? 0 : 0.5 }
        ]}
        key={index + ""}>
        <View style={styles.methodDetailContainer}>
          <Text style={styles.methodTitle}>{item.name}</Text>
          <Text style={styles.methodDetail}>{item.arrivalTime}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
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
    const {
      title,
      containerStyle,
      titleStyle,
      isShippinngMethod,
      isShippinngAddress
    } = this.props;

    return (
      <View style={[styles.fieldsContainer, containerStyle]}>
        <Text style={[styles.fieldsTitle, titleStyle]}>{title}</Text>
        <View style={styles.shippingDetailsContainer}>
          <View style={styles.shippingItemsContainer}>
            {isShippinngMethod &&
              shippingMethod.map((item, index) =>
                this.renderMethodFields({ item, index })
              )}
            {isShippinngAddress && (
              <View style={styles.addressFieldsContainer}>
                {shippingAddressFields.map((item, index) =>
                  this.renderAddressFields({ item, index })
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

{
  /* <View style={styles.addressFieldsContainer}>
{data.map((item, index) => this.renderAddressFields({ item, index }))}
</View> */
}

ShippingDetails.propTypes = {
  title: PropTypes.string.isRequired,
  containerStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  iconSource: PropTypes.any,
  cardNumberPlaceholder: PropTypes.number,
  onCardNumberChange: PropTypes.func,
  cardNumberValue: PropTypes.number,
  cardDatePlaceholder: PropTypes.string,
  cardDateValue: PropTypes.string,
  onCardDateChange: PropTypes.func,
  cvcPlaceholder: PropTypes.string,
  cvcValue: PropTypes.string,
  onCvcChange: PropTypes.func,
  cardNumberMaxLength: PropTypes.number,
  dateMaxLength: PropTypes.number,
  cvcMaxLength: PropTypes.number,
  isShippinngAddress: PropTypes.bool,
  isShippinngMethod: PropTypes.bool
};

export default connect()(ShippingDetails);
