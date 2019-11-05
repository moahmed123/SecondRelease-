import PropTypes from "prop-types";
import React from "react";
import { Text, TextInput, View, ActivityIndicator, AsyncStorage } from "react-native";
import Button from "react-native-button";
import AppStyles from "../../AppStyles";
import styles from "./styles";
import Strings from '../../ExpandStores/LocalizedStrings';
// Get Fun Action
import { connect } from 'react-redux';
import * as actionCreatores from './../../action';
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";
import { withNavigation } from "react-navigation";
import { StackActions, NavigationActions } from 'react-navigation';

class Login extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            loginProgress: false,
            facebookProgress: false,
            loading: false,
            email: "",
            password: ""
        };
    }

    onLogin = () => {
        const { email, password } = this.state;
        // Create Url Store.
        const parametersurl = ExpandStores.UrlStore + RoutesApi.LoginUser;
        const tokon = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.
        tokon.then((token) => {
            //validateInputLogin
            this.props.validateInputLogin(parametersurl, token , email , password);
            // this.setState({progress: true});
        });
    };
    _MassageValidLogin(){
        const {LoginCustomerData} = this.props;
        if(LoginCustomerData){
            if(LoginCustomerData.customer === undefined){
                return <Text style={styles.MassageError}> {LoginCustomerData} </Text>

            }else{
                if(LoginCustomerData.customer.email === undefined){
                    return <Text style={styles.MassageError}> data doesn't correct </Text>
                }else{
                    // const userlogin = true;
                    // deviceStorage.setUserData(userlogin);
                    AsyncStorage.setItem('userlogin', 'login');
                    // Save Data Of User
                    const username  = LoginCustomerData.customer.firstname + ' ' + LoginCustomerData.customer.lastname;
                    const useremail = LoginCustomerData.customer.email;
                    AsyncStorage.setItem('username', username);
                    AsyncStorage.setItem('useremail', useremail);

                    // this.setState({loginProgress:true})
                    setTimeout(()=>{
                       //restart App
                       const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
                        });

                        this.props.navigation.dispatch(resetAction);                  
                        // this.setState({loginProgress:false})                        
                    }, 50);
                    return <Text style={styles.MassageSuccess}> Done Login </Text>
                    // Need Do: Save Data For User
                }
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, styles.leftTitle]}>{Strings.SignIn}</Text>
                <View style={styles.InputContainer}>
                    <TextInput
                        style={styles.body}

                        placeholder={Strings.components.login.emailPlaceHolder}
                        onChangeText={text => this.setState({ email: text.replace(/ /g,"") })}
                        value={this.state.email}
                        underlineColorAndroid='transparent' />
                </View>
                <View style={[styles.InputContainer, { marginBottom: 30 }]}>
                    <TextInput
                        style={styles.body}
                        secureTextEntry={true}
                        placeholder={Strings.components.login.passwordPlaceHolder}
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password}
                        underlineColorAndroid='transparent' />
                </View>
                {this.state.loginProgress ? (
                    <ActivityIndicator
                        size='large'
                        color={AppStyles.colorSet.mainThemeForegroundColor}
                        animating={true} />
                ) : (
                        <Button
                            containerStyle={styles.loginContainer}
                            style={styles.loginText}
                            onPress={this.onLogin}
                            >
                            {Strings.LoginButton}
                        </Button>
                    )}
                    {this._MassageValidLogin()}
                {/* <View style={styles.orView}>
                    <Text style={styles.orText}>OR</Text>
                </View> */}
                {/* {this.state.facebookProgress ? (
                    <ActivityIndicator size='large' color={"#384c8d"} animating={true} />
                ) : (
                        <Button
                            containerStyle={[
                                styles.loginContainer,
                                { marginTop: 0, backgroundColor: "#384c8d" }
                            ]}
                            style={styles.loginText}
                            onPress={this.loginWithFb}>
                            Facebook Login
                        </Button>
                    )} */}
            </View>
        );
    }
}

Login.propTypes = {
    onLogin: PropTypes.func
};


function mapStateToProps(state) {
    return {
        LoginCustomerData: state.LoginCustomerData
    }
}
export default connect(mapStateToProps, actionCreatores)(withNavigation(Login));
// export default Login;
