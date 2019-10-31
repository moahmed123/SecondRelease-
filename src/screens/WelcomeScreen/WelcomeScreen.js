import PropTypes from "prop-types";
import React from "react";
import Button from "react-native-button";
import { View, Image, Text } from "react-native";
import AppStyles from "../../AppStyles";
import styles from "./styles";

//Action Call 
import { connect } from 'react-redux';
import * as actionCreatores from './../../action';
//Connect Url 
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";

class WelcomeScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
    };    
    componentDidMount() {        
        // Create Url Store. 
        const parametersurl = ExpandStores.UrlStore + RoutesApi.login;
        const storeUserName = ExpandStores.UserName;
        const storePassword = ExpandStores.Password;
        // Call Action To Login Items
        this.props.LoginStore(parametersurl, storeUserName, storePassword);
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
            this.props.GeneralSetting(urlGeneralStore, Token);
            // Call Home Page Api. 
            this.props.HomeStore(urlHomeStore, Token);  
            this.props.navigation.navigate("Home");
        }
        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image
                        style={styles.image}
                        source={AppStyles.imageSet.shopertinoLogo} />
                </View>
                <Text style={styles.title}>{"Welcome to Shopertino"}</Text>
                <Text style={styles.caption}>
                    {"Shop & get updates on new products and sales with our mobile app."}
                </Text>
                <Button
                    containerStyle={styles.loginContainer}
                    onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style={styles.loginText}>Log In</Text>
                </Button>
                <Button
                    containerStyle={styles.signupContainer}
                    onPress={() => this.props.navigation.navigate("Signup")}>
                    <Text style={styles.signupText}>Sign Up</Text>
                </Button>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        tokenStore: state.Login        
    }
}
export default connect(mapStateToProps, actionCreatores)(WelcomeScreen);
// export default WelcomeScreen;
