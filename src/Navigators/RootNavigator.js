import React from "react";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
import AppStyles from "../AppStyles";
import MainStack from "./MainStackNavigator";
import AuthStack from "./AuthStackNavigator";

export const RootNavigator = createAnimatedSwitchNavigator(
  {
    Auth: AuthStack,
    Main: MainStack
  },
  {
    initialRouteName: "Auth",
    cardStyle: {
      backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor
    },
    transition: (
      <Transition.Together>
        <Transition.Out
          // type='slide-top'
          type='slide-bottom'
          durationMs={400}
          interpolation='easeIn'/>
        {/* <Transition.In type='fade' durationMs={500} /> */}
      </Transition.Together>
    )
  }
);

export default RootNavigator;
