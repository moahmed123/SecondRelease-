import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import DrawerItem from "../DrawerItem/DrawerItem";
import AppStyles from "../../AppStyles";
import styles from "./styles";

export default class DrawerContainer extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <DrawerItem
            title='HOME'
            source={AppStyles.iconSet.homeDrawer}
            onPress={() => {
              navigation.navigate("Home");
            }}/>
          <DrawerItem
            title='SHOP'
            source={AppStyles.iconSet.shopDrawer}
            onPress={() => {
              navigation.navigate("Shop");
            }}/>
          <DrawerItem
            title='BAG'
            source={AppStyles.iconSet.shoppingBagDrawer}
            onPress={() => {
              navigation.navigate("ShoppingBag");
            }}/>
          <DrawerItem
            title='SEARCH'
            source={AppStyles.iconSet.searchDrawer}
            onPress={() => {
              navigation.navigate("Search");
            }}/>
          <DrawerItem
            title='ORDERS'
            source={AppStyles.iconSet.orderDrawer}
            onPress={() => {
              navigation.navigate("Order");
            }}/>
          <DrawerItem
            title='WISHLIST'
            source={AppStyles.iconSet.wishlistDrawer}
            onPress={() => {
              navigation.navigate("Wishlist");
            }}/>
          <DrawerItem
            title='PROFILE'
            source={AppStyles.iconSet.profileDrawer}
            onPress={() => {
              navigation.navigate("Profile");
            }}/>
          <DrawerItem
            title='LOGOUT'
            source={AppStyles.iconSet.logoutDrawer}
            onPress={() => {
              navigation.navigate("Auth");
            }}/>
        </View>
      </View>
    );
  }
}
