import React, { Component } from "react";
import { Platform, StatusBar } from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PropTypes from "prop-types";
import Header from "../../components/OrderProcedure/Header";
import ProcedureImage from "../../components/OrderProcedure/ProcedureImage";
import CardInputFields from "../../components/OrderProcedure/CardInputFields";
import HeaderButton from "../../components/OrderProcedure/HeaderButton";
import AppStyles from "../../AppStyles";
import Strings from '../../ExpandStores/LocalizedStrings';

// import styles from "./styles";

class AddACardScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
      headerLeft: (
        <HeaderButton
          onPress={() => {
            navigation.goBack();
          }}
          buttonContainerStyle={{ marginLeft: 10 }}
          title={Strings.screens.orderProcedureScreen.addACardScreen.headerBackButton}/>
      ),
      headerRight: (
        <HeaderButton
          onPress={params.onDonePress}
          buttonContainerStyle={{ marginRight: 10 }}
          title={Strings.screens.orderProcedureScreen.addACardScreen.headerRightButton}/>
      ),
      headerStyle: {
        borderBottomWidth: 0,
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
        // height: Platform.OS === "android" && StatusBar.currentHeight * 3
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      cardNumberValue: "",
      cardDateValue: "",
      cvcValue: ""
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onDonePress: this.onDonePress
    });
  }

  onDonePress = () => {
    const isCardNumberComplete = this.state.cardNumberValue.length === 19;
    const isCardDateComplete = this.state.cardDateValue.length === 5;
    const isCvcComplete = this.state.cvcValue.length === 3;
    const cardNumber = this.state.cardNumberValue.split(" ");
    const previousScreen = this.props.navigation.getParam("previousScreen");
    const defaultPaymentOption = {
      title: `Visa Ending in ${cardNumber[cardNumber.length - 1]}`, // translation
      cardEndingNumber: `${cardNumber[cardNumber.length - 1]}`,
      key: `card${cardNumber[cardNumber.length - 1]}`, // translation
      iconSource: AppStyles.iconSet.visaPay
    };

    if (isCardNumberComplete & isCardDateComplete & isCvcComplete) {
      this.props.dispatch({
        type: "UPDATE_PAYMENT_METHODS",
        data: defaultPaymentOption
      });

      if (previousScreen === "PaymentMethod") {
        this.props.navigation.replace("PaymentMethod");
      }
 else {
        this.props.navigation.replace("ShippingAddress");
      }
    }
 else {
      alert(Strings.screens.orderProcedureScreen.addACardScreen.alert);
    }
  };

  onCardNumberChange = number => {
    let formattednumber = number.split(" ").join("");

    if (formattednumber.length > 0) {
      formattednumber = formattednumber
        .match(new RegExp(".{1,4}", "g"))
        .join(" ");
    }

    this.setState({ cardNumberValue: formattednumber });

    return formattednumber;
  };

  onCardDateChange = number => {
    let formattedDate = number.split("/").join("");

    if (formattedDate.length > 0) {
      formattedDate = formattedDate.match(new RegExp(".{1,2}", "g")).join("/");
    }

    this.setState({ cardDateValue: formattedDate });

    return formattedDate;
  };

  onCvcChange = cvc => {
    this.setState({ cvcValue: cvc });

    return cvc;
  };

  render() {
    const { cardNumberValue, cardDateValue, cvcValue } = this.state;

    return (
      <KeyboardAwareScrollView extraScrollHeight={30}>
        <Header title={Strings.screens.orderProcedureScreen.addACardScreen.title} />
        <ProcedureImage source={AppStyles.imageSet.creditCard} />
        <CardInputFields
          title={Strings.screens.orderProcedureScreen.addACardScreen.cardInputTitle}
          iconSource={AppStyles.iconSet.creditCardIcon}
          cardNumberPlaceholder={"4242 4242 424 4242 4242"}
          onCardNumberChange={this.onCardNumberChange}
          cardNumberValue={cardNumberValue}
          cardDatePlaceholder={Strings.screens.orderProcedureScreen.addACardScreen.cardDatePlaceholder}
          cardDateValue={cardDateValue}
          onCardDateChange={this.onCardDateChange}
          cvcPlaceholder={"CVC"}
          cvcValue={cvcValue}
          onCvcChange={this.onCvcChange}
          cardNumberMaxLength={19}
          dateMaxLength={5}
          cvcMaxLength={3}/>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect()(AddACardScreen);

AddACardScreen.propTypes = {
  navigation: PropTypes.object
};
