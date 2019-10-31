import React from "react";
import { View } from "react-native";
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
import styles from "./styles";

const DrawerNavigator = createDrawerNavigator(
  {
    Home: HomeScreen,
    Shop: ShopScreen,
    Order: OrdersScreen,
    Wishlist: WishlistScreen,
    Search: SearchScreen,
    Profile: ProfileScreen,
    ShoppingBag: ShoppingBagScreen
  },
  {
    drawerPosition: "left",
    initialRouteName: "Home",
    drawerWidth: 300,
    contentComponent: DrawerContainer,
    headerMode: "screen",
    navigationOptions: ({ navigation }) => {
      const routeIndex = navigation.state.index;

      return {
        title: getDrawerScreenTitle(navigation.state.routes[routeIndex].key),
        headerLeft: (
          <MenuButton
            onPress={() => {
              navigation.openDrawer();
            }}/>
        ),
        headerRight: navigation.state.routes[routeIndex].key !=
          "ShoppingBag" && (
          <ShoppingBagButton
            onPress={() => {
              navigation.navigate("Bag");
            }}/>
        ),
        headerTitle: navigation.state.routes[routeIndex].key == "Search" && (
          <View style={styles.searchBarContainer}>
            <SearchBar
              backgroundColor={"transparent"}
              cancelTitle={"Cancel"}
              onChangeText={text => {
                navigation.dispatch({
                  type: "SEARCH_BY_KEY_TEXT",
                  data: text
                });
              }}
              cancelButtonTextStyle={styles.cancelButtonText}
              inputBorderRadius={9}
              inputStyle={styles.searchInput}/>
          </View>
        )
      };
    }
  }
);

const getDrawerScreenTitle = routeKey => {
  switch (routeKey) {
    case "Home":
      return "Shopertino";
    case "Shop":
      return "Shop";
    case "Order":
      return "Orders";
    case "Wishlist":
      return "Wishlist";
    case "Search":
      return "Search";
    case "Profile":
      return "Profile";
    case "ShoppingBag":
      return "Shopping Bag";
    default:
      return "Home";
  }
};

export default connect()(DrawerNavigator);
