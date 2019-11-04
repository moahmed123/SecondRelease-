import PropTypes from "prop-types";
import React from "react";
import Button from "react-native-button";
import { View, Image, Text, AsyncStorage, I18nManager, BackHandler } from "react-native";
import AppStyles from "../../AppStyles";
import styles from "./styles";
import SplashScreen from "react-native-splash-screen";


//Action Call 
import { connect } from 'react-redux';
import * as actionCreatores from './../../action';
//Connect Url 
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";
import { StackActions, NavigationActions } from 'react-navigation';
import strings from './../../ExpandStores/LocalizedStrings'

class WelcomeScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
    };
    _didFocusSubscription;
    _willBlurSubscription;
  
    constructor(props) {
      super(props);
      this._didFocusSubscription = props.navigation.addListener(
        'didFocus',
        payload =>
          BackHandler.addEventListener(
            'hardwareBackPress',
            this.onBackButtonPressAndroid
          )
      );
    }
     
    onBackButtonPressAndroid = () => {
        console.log(this.props.navigation.state.routeName)
        this.props.navigation.navigate("Home");
        return true;
    };
  
    componentDidMount() {             
        // Create Url Store. 
        const parametersurl = ExpandStores.UrlStore + RoutesApi.login;
        const storeUserName = ExpandStores.UserName;
        const storePassword = ExpandStores.Password;
        // Call Action To Login Items
        this.props.LoginStore(parametersurl, storeUserName, storePassword);
        // To Switch Lang 
        if(I18nManager.isRTL != true){            
            strings.setLanguage('en');
        }else{
            strings.setLanguage('ar');
        }  
         

        // Back Button Android 
        this._willBlurSubscription = this.props.navigation.addListener(
            'willBlur',
            payload =>
              BackHandler.removeEventListener(
                'hardwareBackPress',
                this.onBackButtonPressAndroid
              )
        );
        //Tester 
        // console.log("UserLogin --------------");  
        // // AsyncStorage.setItem('userlogin', 'true');                      
        // console.log(AsyncStorage.getItem('userlogin'))
        // console.log("UserLogin -------------");
        //Tester 

        
        //const dataJson = AsyncStorage.getItem('AppLanguage');
        // dataJson.then((data)=>{
        //     if(data == 'ar'){
        //         if(I18nManager.isRTL != true){
        //             I18nManager.forceRTL(true);
        //             // RNRestart.Restart();
        //             // Restart App                                        
        //             const resetAction = StackActions.reset({
        //             index: 0,
        //             actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
        //             });
        //             this.props.navigation.dispatch(resetAction); 
        //         }  
        //     }else{
        //         if(I18nManager.isRTL == true){
        //             I18nManager.forceRTL(false);
        //             // RNRestart.Restart();
        //             // Restart App                                        
        //             const resetAction = StackActions.reset({
        //             index: 0,
        //             actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
        //             });
        //             this.props.navigation.dispatch(resetAction); 
        //         }
        //     }
        // }).catch((error)=>{
        //     console.log(error);
        // })                        
    }
    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }
    render() {
        const {tokenStore} = this.props;
        if(tokenStore){
            // Token
            const Token = tokenStore.token;
            // Url To General Store
            const urlGeneralStore = ExpandStores.UrlStore + RoutesApi.generalSettings;
            // Url To Home Store
            const urlHomeStore = ExpandStores.UrlStore + RoutesApi.Home;
            
            //save Token In deviceStorage.
            deviceStorage.setUserData(Token);            
            // Get General Setting.
            this.props.Settings(urlGeneralStore, Token);

            if(this.props.DataForApp){
                console.log(this.props.DataForApp);
                const DataForApp = this.props.DataForApp;
                const AppLanguage = this.props.DataForApp.LanguageCode;
                const AppName = this.props.DataForApp.StoreName;
                const AppMainColor = this.props.DataForApp.MainColor;
                // this.setState({appName: AppName});
                //MainColor
                //Save Data For App
                // deviceStorage.setUserData(DataForApp);
                // AsyncStorage.setItem('AppLanguage', AppLanguage);
                AsyncStorage.multiSet([
                    ['AppLanguage', AppLanguage], 
                    ['AppName', AppName],
                    // ['AppMainColor', AppMainColor]
                ]);
                

                // Call Home Page Api.
                this.props.HomeStore(urlHomeStore, Token);  
                this.props.navigation.navigate("Home");
                //Hide Splash Screen 
                SplashScreen.hide();
            }
            // Call Home Page Api. 
            // this.props.HomeStore(urlHomeStore, Token);  
            // this.props.navigation.navigate("Home");
        }
        if(I18nManager.isRTL != true){            
            strings.setLanguage('en');
        }else{
            strings.setLanguage('ar');
        }        
        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image
                        style={styles.image}
                        source={AppStyles.imageSet.shopertinoLogo}
                        // source={{uri: this.props.DataForApp.LogoURL}}
                            />
                </View>                
                {/* <Text style={styles.title}>                
                    {`Welcome`}
                </Text> */}
                <Text style={styles.caption}>    
                    {strings.WelcomeText}
                </Text>
                <Button
                    containerStyle={styles.loginContainer}
                    onPress={() => this.props.navigation.navigate("Home")}>
                    <Text style={styles.loginText}>{strings.home}</Text>
                </Button>
                {/* <Button
                    containerStyle={styles.signupContainer}
                    onPress={() => this.props.navigation.navigate("Signup")}>
                    <Text style={styles.signupText}>Sign Up</Text>
                </Button> */}
            </View>
        );    
             
    }
}

function mapStateToProps(state) {
    return {
        tokenStore: state.Login,
        DataForApp: state.Settingsitem      
    }
}
export default connect(mapStateToProps, actionCreatores)(WelcomeScreen);
// export default WelcomeScreen;
