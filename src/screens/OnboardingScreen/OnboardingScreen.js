import React, { Component } from "react";
import { View, Platform } from "react-native";
import PropTypes from "prop-types";
import Onboarding from "../../components/Onboarding";
import styles from "./styles";
import AppStyles from "../../AppStyles";
// import { icons } from '@assets';

// example data
const flowData = {
  bgColor: AppStyles.colorSet.mainThemeForegroundColor,
  fgColor: AppStyles.colorSet.mainThemeBackgroundColor,
  screens: [
    {
      icon: AppStyles.imageSet.shopertinoLogo,
      title: "Shopertino",
      description:
        "Welcome to Shopertino! Buy our Products easily and get access to app only exclusives."
    },
    {
      icon: AppStyles.imageSet.shoppingBag,
      title: "Shopping Bag",
      description:
        "Add products to your shopping cart, and check them out later."
    },
    {
      icon: AppStyles.imageSet.quickSearch,
      title: "Quick Search",
      description: "Quickly find the products you like the most."
    },
    {
      icon: AppStyles.imageSet.wishlist,
      title: "Wishlist",
      description:
        "Build a wishlist with your favourite products to buy them later."
    },
    {
      icon: AppStyles.imageSet.delivery,
      title: "Order Tracking",
      description: "Monitor your orders and get updates when something changes."
    },
    {
      icon: AppStyles.imageSet.notification,
      title: "Notifications",
      description:
        "Get notifications for new products, promotions and discounts."
    },
    {
      icon: AppStyles.imageSet.payment,
      title: "Stripe Payments",
      description: "We support all payment options, thanks to stripe."
    },
    {
      icon:
        Platform.OS === "ios"
          ? AppStyles.imageSet.applePay
          : AppStyles.imageSet.googlePay,
      title: Platform.OS === "ios" ? "Apple Pay" : "Google Pay",
      description:
        Platform.OS === "ios"
          ? "Pay with a single click with Apple Pay."
          : "Pay with a single click with Google Pay."
    }
  ]
};

class OnboardingScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <Onboarding
          data={flowData}
          onFinished={() => this.props.navigation.replace("Welcome")}/>
      </View>
    );
  }
}

export default OnboardingScreen;
