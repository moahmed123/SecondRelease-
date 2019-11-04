import React from "react";
import { Platform, AsyncStorage } from "react-native";
import { createStackNavigator } from "react-navigation";
import OnboardingScreen from "../screens/OnboardingScreen/OnboardingScreen";
import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SignupScreen from "../screens/SignupScreen/SignupScreen";
import StartingScreen from '../screens/StartingScreen';
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator";
import AppStyles from "../AppStyles";


const AuthStackNavigator = createStackNavigator(
    {
      // Start: { screen: StartScreen },
      Starting: {
        screen: StartingScreen,
        navigationOptions: {header: null},
      },
      Onboarding: {
        screen: OnboardingScreen,
        // screen: WelcomeScreen,
        navigationOptions: { header: null }
      },
      Welcome: {
        screen: WelcomeScreen,
        navigationOptions: { header: null }
      },
      Login: { screen: LoginScreen },
      Signup: { screen: SignupScreen }
      // Checkout: { screen: CheckoutCart }
    },
    {

      initialRouteName: "Starting", // deviceStorage.getUserData("Token").then((token) => {console.log( token)});
      headerMode: "float",
      headerBackTitleVisible: false,
      cardStyle: {
        backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor
      },
      transitionConfig: () => ({
        screenInterpolator: sceneProps => {
          // Disable the transition animation when resetting to the main screen
          if (sceneProps.index === 0 && sceneProps.scenes.length > 2) {
            return null;
          }

          // Otherwise, use the usual animation
          return Platform.OS === "ios"
            ? StackViewStyleInterpolator.forHorizontal(sceneProps)
            : StackViewStyleInterpolator.forFadeFromBottomAndroid(sceneProps);
        }
      })
    }
  );

export default AuthStackNavigator;
