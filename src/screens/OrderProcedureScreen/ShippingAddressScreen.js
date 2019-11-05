import React, { Component } from "react";
import { Platform, StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import PropTypes from "prop-types";
import Header from "../../components/OrderProcedure/Header";
import ProcedureImage from "../../components/OrderProcedure/ProcedureImage";
import ShippingDetails from "../../components/OrderProcedure/ShippingDetails";
import HeaderButton from "../../components/OrderProcedure/HeaderButton";
import AppStyles from "../../AppStyles";
import Strings from '../../ExpandStores/LocalizedStrings';

// import styles from "./styles";

export default class ShippingAddressScreen extends Component {
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
          navigation.setParams();
        }}
        buttonContainerStyle={{ marginLeft: 10 }}
        title={Strings.screens.orderProcedureScreen.shippingAddressScreen.headerBackButton}/>
    ),
    headerRight: (
      <HeaderButton
        onPress={() => {
          navigation.replace("ShippingMethod");
        }}
        buttonContainerStyle={{ marginRight: 10 }}
        title={Strings.screens.orderProcedureScreen.shippingAddressScreen.headerRightButton}/>
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
        <Header title={Strings.screens.orderProcedureScreen.shippingAddressScreen.title} />
        <ProcedureImage source={AppStyles.imageSet.box} />
        <ShippingDetails title={Strings.screens.orderProcedureScreen.shippingAddressScreen.detailsTitle} isShippinngAddress={true} />
      </KeyboardAwareScrollView>
    );
  }
}

// ShippingAddressScreen.propTypes = {
// title: PropTypes.string,
// dataSource: PropTypes.object,
// navigation: PropTypes.func,
// onIndexChange: PropTypes.func
// };
