import { combineReducers } from "redux";
import { createNavigationReducer } from "react-navigation-redux-helpers";
import { app } from "./app";
import { RootNavigator } from "../../Navigators/RootNavigator";
import { products } from "./products";
import { checkout } from "./checkout";

// All File Reducer
import LoginItem from "./LoginItem";
import SettingsData from "./SettingsData";
import HomeData from './HomeStore';
import GetCategoryProducts from './GetCategoryProducts';
import GetProductInfo from './GetProductInfo';
import CartProducts from './CartProducts';
import Register from './Register';
import LoginCustomer from './LoginCustomer';
import GetWishlist from './GetWishlist';
import GetOrdersList from './GetOrdersList';
import Search from './Search';
import CategorieResult from './CategorieResult';
import ContactInfo from './ContactInfo';
// import app from "./app";

const navReducer = createNavigationReducer(RootNavigator);

// combine reducers to build the state
const appReducer = combineReducers({
    nav: navReducer,
    app,
    products,
    checkout,
    Login: LoginItem,
    Settingsitem: SettingsData,
    homeStore: HomeData,
    CategoryProducts: GetCategoryProducts,
    ProductInfo: GetProductInfo,
    ProductsCart: CartProducts,
    ResultRegister: Register,
    LoginCustomerData: LoginCustomer,
    GetWishlist: GetWishlist,
    GetOrdersList: GetOrdersList,
    Search: Search,
    CategoriesResult: CategorieResult,
    ContactInfoData: ContactInfo

});

export default appReducer;
