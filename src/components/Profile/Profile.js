import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, ScrollView } from "react-native";
import ProfileImageCard from "./ProfileImageCard";
import ProfileItem from "./ProfileItem";
import FooterButton from "../FooterButton/FooterButton";
import styles from "./styles";
import AppStyles from "../../AppStyles";

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  onItemPress = (routeName, title) => {
    this.props.navigation.navigate(routeName, {
      title: title ? title : routeName
    });
  };

  render() {
    // const { extraData } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.profileCardContainer}>
          <ProfileImageCard />
        </View>
        <View style={styles.profileItemContainer}>
          <ScrollView>
            <ProfileItem
              title={"Account Details"}
              onPress={() => this.onItemPress("EditProfile", "Edit Profile")}
              itemIconStyle={{ tintColor: "#6b7be8" }}
              iconSource={AppStyles.iconSet.accountDetail}/>
            <ProfileItem
              title={"WishList"}
              itemIconStyle={{ tintColor: "#df9292" }}
              onPress={() => this.onItemPress("Wishlist")}
              iconSource={AppStyles.iconSet.wishlistFilled}/>
            <ProfileItem
              title={"Order History"}
              onPress={() => this.onItemPress("Order")}
              itemIconStyle={{ tintColor: "#baa3f3" }}
              iconSource={AppStyles.iconSet.orderDrawer}/>
            <ProfileItem
              title={"Settings"}
              onPress={() => this.onItemPress("Settings")}
              itemIconStyle={{ tintColor: "#a6a4b1" }}
              iconSource={AppStyles.iconSet.settings}/>
            <ProfileItem
              title={"Contact Us"}
              onPress={() => this.onItemPress("Contact", "Contact Us")}
              itemIconStyle={{ tintColor: "#9ee19f" }}
              iconSource={AppStyles.iconSet.contactUs}/>
          </ScrollView>
        </View>
        <View style={styles.footerButtonContainer}>
          <FooterButton
            footerContainerStyle={styles.footerContainerStyle}
            title={"Logout"}
            onPress={() => this.onItemPress("Auth")}/>
        </View>
      </View>
    );
  }
}

Profile.propTypes = {
  title: PropTypes.string,
  ProfileScreen: PropTypes.array,
  navigation: PropTypes.object,
  extraData: PropTypes.object
};
