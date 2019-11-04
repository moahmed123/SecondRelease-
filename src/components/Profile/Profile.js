import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, ScrollView, AsyncStorage} from "react-native";
import ProfileImageCard from "./ProfileImageCard";
import ProfileItem from "./ProfileItem";
import FooterButton from "../FooterButton/FooterButton";
import styles from "./styles";
import AppStyles from "../../AppStyles";
import { StackActions, NavigationActions } from 'react-navigation';
import Strings from '../../ExpandStores/LocalizedStrings';

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
                            title={Strings.components.profile.accountDetailsTitle}
                            onPress={() => this.onItemPress("EditProfile", Strings.components.profile.accountDetialsNavigateScreenTitle)}
                            itemIconStyle={{ tintColor: "#6b7be8" }}
                            iconSource={AppStyles.iconSet.accountDetail} />
                        <ProfileItem
                            title={Strings.components.profile.wishListTitle}
                            itemIconStyle={{ tintColor: "#df9292" }}
                            onPress={() => this.onItemPress("Wishlist")}
                            iconSource={AppStyles.iconSet.wishlistFilled} />
                        <ProfileItem
                            title={Strings.components.profile.historyTitle}
                            onPress={() => this.onItemPress("Order")}
                            itemIconStyle={{ tintColor: "#baa3f3" }}
                            iconSource={AppStyles.iconSet.orderDrawer} />
                        {/* <ProfileItem
                            title={"Settings"}
                            onPress={() => this.onItemPress("Settings")}
                            itemIconStyle={{ tintColor: "#a6a4b1" }}
                            iconSource={AppStyles.iconSet.settings} /> */}
                        <ProfileItem
                            title={Strings.components.profile.contactUsTitle}
                            onPress={() => this.onItemPress("Contact", Strings.components.profile.contactUsTitle)}
                            itemIconStyle={{ tintColor: "#9ee19f" }}
                            iconSource={AppStyles.iconSet.contactUs} />
                    </ScrollView>
                </View>
                <View style={styles.footerButtonContainer}>
                    <FooterButton
                        footerContainerStyle={styles.footerContainerStyle}
                        title={"Logout"}
                        onPress={() => {
                            AsyncStorage.setItem('userlogin', 'Logout');
                                //Restart App
                                const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
                                });
                                this.props.navigation.dispatch(resetAction);
                        }} />
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
