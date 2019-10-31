import PropTypes from "prop-types";
import React, { Fragment, PureComponent, StatusBar } from "react";
// import React, { Component } from "react";
// import { Text, View } from "react-native";
import { createReduxContainer } from "react-navigation-redux-helpers";
import { connect } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import RootNavigator from "../Navigators/RootNavigator";

//Import Action 
// import * as actionCreatores from './../action/index';
// import {MakeRequest} from './../action/index';

const AppContainer = createReduxContainer(RootNavigator);

SplashScreen.hide();

const mapStateToProps = state => ({
    state: state.nav
});
export default connect(mapStateToProps)(AppContainer);


