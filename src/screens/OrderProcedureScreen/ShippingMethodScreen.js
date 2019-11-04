import React, { Component } from "react";
import { View, Platform, StatusBar } from "react-native";
// import PropTypes from "prop-types";
import Header from "../../components/OrderProcedure/Header";
import ProcedureImage from "../../components/OrderProcedure/ProcedureImage";
import ShippingDetails from "../../components/OrderProcedure/ShippingDetails";
import HeaderButton from "../../components/OrderProcedure/HeaderButton";
import AppStyles from "../../AppStyles";
import Strings from '../../ExpandStores/LocalizedStrings';

// import styles from "./styles";

export default class ShippingMethodScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTintColor: AppStyles.colorSet.mainThemeForegroundColor,
    headerStyle: {
      borderBottomWidth: 0,
      paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
      // height: Platform.OS === "android" && StatusBar.currentHeight * 3
    },
    headerRight: (
      <HeaderButton
        onPress={() => {
          navigation.replace("PaymentMethod");
        }}
        buttonContainerStyle={{ marginRight: 10 }}
        title={Strings.screens.orderProcedureScreen.shippingMethodScreen.headerRightButton}/>
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
      <View>
        <Header title={Strings.screens.orderProcedureScreen.shippingMethodScreen.title} />
        <ProcedureImage source={AppStyles.imageSet.box} />
        <ShippingDetails isShippinngMethod={true} title={Strings.screens.orderProcedureScreen.shippingMethodScreen.detailsTitle} />
      </View>
    );
  }
}

// ShippingMethodScreen.propTypes = {
//   // title: PropTypes.string,
//   // dataSource: PropTypes.object,
//   // navigation: PropTypes.func,
//   // onIndexChange: PropTypes.func
// };
