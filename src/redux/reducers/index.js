import { combineReducers } from "redux";
import { createNavigationReducer } from "react-navigation-redux-helpers";
import { app } from "./app";
import { RootNavigator } from "../../Navigators/RootNavigator";
import { products } from "./products";
import { checkout } from "./checkout";

// All File Reducer
import LoginItem from "./LoginItem";
import GeneralData from "./GeneralData";
import HomeData from './HomeStore'
// import app from "./app";

const navReducer = createNavigationReducer(RootNavigator);

// combine reducers to build the state
const appReducer = combineReducers({
  nav: navReducer,
  app,
  products,
  checkout,
  Login: LoginItem,
  generalData: GeneralData,
  homeStore: HomeData
});

export default appReducer;
