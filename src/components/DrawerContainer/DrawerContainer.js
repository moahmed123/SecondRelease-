import PropTypes from "prop-types";
import React from "react";
import { View, AsyncStorage, I18nManager} from "react-native";
import DrawerItem from "../DrawerItem/DrawerItem";
import AppStyles from "../../AppStyles";
import styles from "./styles";

import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from "react-redux";
//Call Action And Get Home Page Data && Page Home Page 
import * as actionCreatores from '../../action';
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";
import AuthStack from "./../../Navigators/AuthStackNavigator";
import { createReduxContainer } from "react-navigation-redux-helpers";
import RootNavigator from "../../Navigators/RootNavigator";
import RNRestart from 'react-native-restart';

// import strings from '../../ExpandStores/Localizedstrings';
import strings from '../../ExpandStores/LocalizedStrings';

class DrawerContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Login: false
        };     
    }
    static propTypes = {
        navigation: PropTypes.object.isRequired
    };
    
    componentDidMount(){        
        // console.log(this.state.Login);
        // Get Value To User Login Or not 
        const value = AsyncStorage.getItem('userlogin');
        if (value !== null) {
            // console.log(value);
            // We have data!!
            value.then((user)=>{    
                console.log(user)            
                if(user == "login"){
                    this.setState({Login: true});
                }else{
                    this.setState({Login: false});
                }
            })
        }    
    }
    _getToken(Language){
        const Token = deviceStorage.getUserData("Token");  
        const URLStore = ExpandStores.UrlStore + RoutesApi.SwitchLanguage;
        const urlHomeStore = ExpandStores.UrlStore + RoutesApi.Home;
        // Url To Home Store        
        Token.then((token)=>{   
            console.log({token, URLStore, Language});
            this.props.SwitchLanguage(URLStore, token, Language).then(()=>{
                AsyncStorage.multiSet([
                    ["AppLanguage", Language]                
                ]).then(()=>{                    
                    this.props.HomeStore(urlHomeStore, token).then(()=>{
                        if(I18nManager.isRTL != true){
                            I18nManager.forceRTL(true);   
                            // strings.setLanguage('ar');
                            RNRestart.Restart();
                        }else{
                            I18nManager.forceRTL(false);                       
                            // strings.setLanguage('en');
                            RNRestart.Restart();
                        }                        
                    });
                })
                
            })             
        })
    }    
    _switchToEnglish(){
        this._getToken('en');                
    }
    _switchToArabic(){
        this._getToken('ar');       
    }
    render() {
        const { navigation } = this.props;                
        return (
            <View style={styles.content}>
                <View style={styles.container}>
                    <DrawerItem
                        title= {strings.homeBottomLabel}
                        source={AppStyles.iconSet.homeDrawer}
                        onPress={() => {
                            navigation.navigate("Home");
                        }} />
                    {                        
                        (!this.state.Login)?                            
                            <DrawerItem
                                title= {strings.LoginButton}
                                source={AppStyles.iconSet.shopDrawer}
                                onPress={() => {
                                    navigation.navigate("Login");
                                }} />                           
                        : null
                    }
                    {                        
                        (!this.state.Login)?
                            <DrawerItem
                                title={strings.Signup}
                                source={AppStyles.iconSet.shopDrawer}
                                onPress={() => {
                                    navigation.navigate("Signup");
                                }} /> 
                        : null
                    }                                     
                    <DrawerItem
                        title={strings.SHOP}
                        source={AppStyles.iconSet.shopDrawer}
                        onPress={() => {
                            navigation.navigate("Shop");
                        }} />
                    <DrawerItem
                        title={strings.BAG}
                        source={AppStyles.iconSet.shoppingBagDrawer}
                        onPress={() => {
                            navigation.navigate("ShoppingBag");
                        }} />
                    <DrawerItem
                        title={strings.searchBottomLabel}
                        source={AppStyles.iconSet.searchDrawer}
                        onPress={() => {
                            navigation.navigate("Search");
                        }} />
                    {                        
                        (!this.state.Login)? null:
                            <DrawerItem
                                title={strings.OrderList}
                                source={AppStyles.iconSet.orderDrawer}
                                onPress={() => {
                                    navigation.navigate("Order");
                                }} />                        
                    }
                    {                        
                        (!this.state.Login)? null:
                            <DrawerItem
                                title={strings.wishList}
                                source={AppStyles.iconSet.wishlistDrawer}
                                onPress={() => {
                                    navigation.navigate("Wishlist");
                                }} />
                        
                    }
                    {                        
                        (!this.state.Login)? null:
                            <DrawerItem
                                title= {strings.Profile}
                                source={AppStyles.iconSet.profileDrawer}
                                onPress={() => {
                                    navigation.navigate("Profile");
                                }} />
                        
                    }         
                    {
                        (I18nManager.isRTL == true)?
                            <DrawerItem
                                title={strings.switchLanguage}
                                source={AppStyles.iconSet.profileDrawer}
                                onPress={() => { this._switchToEnglish()}} /> 
                            : 
                            <DrawerItem
                                title={strings.switchLanguage}
                                source={AppStyles.iconSet.profileDrawer}
                                onPress={() => {this._switchToArabic()}} />                                                                        
                    }          
                                        
                    {                        
                        (!this.state.Login)?
                        null:
                        <DrawerItem
                            title={strings.logOut}
                            source={AppStyles.iconSet.logoutDrawer}
                            onPress={() => {
                                AsyncStorage.setItem('userlogin', 'Logout');
                                //Restart App                                        
                                const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
                                });
                                this.props.navigation.dispatch(resetAction);                  
                            }} />

                    }                        
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        homeData: state.homeStore,        
    }
}
export default connect(mapStateToProps, actionCreatores)(DrawerContainer);
