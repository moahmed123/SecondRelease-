import React from "react";
import { View, Button, I18nManager, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { createDrawerNavigator } from "react-navigation";
import SearchBar from "react-native-search-box";
import DrawerContainer from "../components/DrawerContainer/DrawerContainer";
import MenuButton from "../components/MenuButton/MenuButton";
import ShoppingBagButton from "../components/ShoppingBagButton/ShoppingBagButton";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ShopScreen from "../screens/Shop/ShopScreen";
import OrdersScreen from "../screens/Order/OrdersScreen";
import WishlistScreen from "../screens/WishlistScreen/WishlistScreen";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import ShoppingBagScreen from "../screens/ShoppingBagScreen/ShoppingBagScreen";

import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SignupScreen from "../screens/SignupScreen/SignupScreen";
import styles from "./styles";
import strings from "./../ExpandStores/LocalizedStrings";

//Get App Name.
let appname;

const dataJson = AsyncStorage.getItem("AppName");

dataJson.then(AppName => {
  appname = AppName;
});

const DrawerNavigator = createDrawerNavigator(
  {
    Home: HomeScreen,
    Shop: ShopScreen,
    Order: OrdersScreen,
    Wishlist: WishlistScreen,
    Search: SearchScreen,
    Profile: ProfileScreen,
    ShoppingBag: ShoppingBagScreen,
    Login: LoginScreen,
    Signup: SignupScreen
  },
  {
    // drawerPosition: "left",
    drawerPosition: I18nManager.isRTL !== true ? "left" : "right",
    initialRouteName: "Home",
    drawerWidth: 300,
    contentComponent: DrawerContainer,
    headerMode: "screen",
    navigationOptions: ({ navigation }) => {
      const routeIndex = navigation.state.index;

      return {
        headerTitleStyle: { alignSelf: "center" },
        title: getDrawerScreenTitle(navigation.state.routes[routeIndex].key),
        headerLeft: (
          <MenuButton
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        headerRight: navigation.state.routes[routeIndex].key !==
          "ShoppingBag" && (
          <ShoppingBagButton
            onPress={() => {
              navigation.navigate("Bag");
            }}
          />
        ),
        headerTitle:
          navigation.state.routes[routeIndex].key === "Search" && "Search"
        // (
        //     <View style={styles.searchBarContainer}>
        //         <SearchBar
        //             backgroundColor={"transparent"}
        //             cancelTitle={"Cancel"}
        //             onChangeText={text => {
        //                 // navigation.dispatch({
        //                 //   type: "SEARCH_BY_KEY_TEXT",
        //                 //   data: text
        //                 // });
        //                 // const parametersurl = ExpandStores.UrlStore + RoutesApi.CategoryProducts;
        //                 // const token = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.

        //                 // token.then((Token) => {
        //                 //     // console.log({parametersurl, Token, text});
        //                 //     // this.props.GetCategoryProducts( parametersurl, Token, '', text, '', '')
        //                 // })
        //             }}
        //             cancelButtonTextStyle={styles.cancelButtonText}
        //             inputBorderRadius={9}
        //             inputStyle={styles.searchInput} />
        //     </View>
        // )
      };
    }
  }
);

const getDrawerScreenTitle = routeKey => {
  switch (routeKey) {
    case "Home":
      return appname;
    case "Shop":
      return strings.SHOP;
    case "Order":
      return strings.OrderList;
    case "Wishlist":
      return strings.wishList;
    case "Search":
      return strings.searchBottomLabel;
    case "Profile":
      return strings.Profile;
    case "ShoppingBag":
      return strings.shoppingCart;
    case "Login":
      return strings.LoginButton;
    case "Signup":
      return strings.Signup;      
    default:
      return strings.home;
  }
};

export default connect()(DrawerNavigator);
