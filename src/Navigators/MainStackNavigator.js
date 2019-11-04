import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator";

import ShoppingBagScreen from "../screens/ShoppingBagScreen/ShoppingBagScreen";
import CategoryProductGridScreen from "../screens/Shop/CategoryProductGridScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import ContactUsScreen from "../screens/ContactUsScreen/ContactUsScreen";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";
import ShippingAddressScreen from "../screens/OrderProcedureScreen/ShippingAddressScreen";
import ShippingMethodScreen from "../screens/OrderProcedureScreen/ShippingMethodScreen";
import PaymentMethodScreen from "../screens/OrderProcedureScreen/PaymentMethodScreen";
import AddACardScreen from "../screens/OrderProcedureScreen/AddACardScreen";

import SplashScreen from "react-native-splash-screen";
// import CheckoutScreen from "../screens/OrderProcedureScreen/CheckoutScreen";
import DrawerStackNavigator from "./DrawerStackNavigator";

// import CheckoutCart from '../components/CheckoutPage/CheckoutPage';
import strings from "./../ExpandStores/LocalizedStrings";
import AppStyles from "../AppStyles";

const MainStackNavigator = createStackNavigator(
  {
    Drawer: { screen: DrawerStackNavigator },
    CategoryProductGrid: { screen: CategoryProductGridScreen },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: strings.CheckOutButtonText
      }
    },
    Contact: {
      screen: ContactUsScreen,
      navigationOptions: {
        title: strings.ContactUsScreenTitle
      }
    },
    EditProfile: {
      screen: EditProfileScreen,
      navigationOptions: {
        title: strings.editProfile
      }
    },
    ShippingAddress: {
      screen: ShippingAddressScreen,
      navigationOptions: {
        title: strings.ShippingAddress
      }
    },
    ShippingMethod: { screen: ShippingMethodScreen },
    PaymentMethod: { screen: PaymentMethodScreen },
    AddACard: { screen: AddACardScreen },
    // Checkout: { screen: CheckoutCart },
    Bag: { screen: ShoppingBagScreen }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "float",
    cardStyle: {
      backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor
    },
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
        // Disable the transition animation when resetting to the main screen
        if (sceneProps.index === 0 && sceneProps.scenes.length > 2) {
          return null;
        }

        SplashScreen.hide();

        // Otherwise, use the usual animation
        return Platform.OS === "ios"
          ? StackViewStyleInterpolator.forHorizontal(sceneProps)
          : StackViewStyleInterpolator.forFadeFromBottomAndroid(sceneProps);
      }
    })
  }
);

// getInitialRoute() {
//   return isDoneOnboarding(this.props.onboardingData) ? "Drawer" : "Start";
// }

// function mapStateToProps() {
//   return {
//     isAuthed: authentication.isAuthed,
//     profileData: authentication.profileData,
//     onboardingData: authentication.onboardingData,
//   };
// }

export default MainStackNavigator;
