import React from "react";
import PropTypes from "prop-types";
import { Text, TextInput, View, ActivityIndicator } from "react-native";
import Button from "react-native-button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";

// Get Fun Action
import { connect } from 'react-redux';
import * as actionCreatores from './../../action';
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";
//To move To Other Redirect
import { withNavigation } from "react-navigation";
import Strings from '../../ExpandStores/LocalizedStrings';

class Signup extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            progress: false,
            loading: true,
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            password: ""
        };
        this._MassageValidRegister = this._MassageValidRegister.bind(this);

    }

    onRegister = () => {
        const { firstname, lastname, phone, email, password } = this.state;
        // Create Url Store.
        const parametersurl = ExpandStores.UrlStore + RoutesApi.RegisterUser;
        const tokon = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.
        tokon.then((token) => {
            this.props.validateInput(parametersurl, token, firstname, lastname, email, password);
            this.setState({progress: true});
        });
        setTimeout(()=>{
            this.setState({progress: false});
        }, 2000)
    };
    _MassageValidRegister(){
        const {RegisterData} = this.props;
        if(RegisterData){
            console.log(RegisterData.customer);

            if(RegisterData.customer === undefined){
                return <Text style={styles.MassageError}> {RegisterData} </Text>

            }else{
                if(RegisterData.customer.email === undefined){
                    return <Text style={styles.MassageError}> data doesn't correct </Text>
                }else{
                    setTimeout(()=>{
                        this.props.navigation.navigate("Login");
                    }, 500);
                    return <Text style={styles.MassageSuccess}> Done Register </Text>

                }
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, styles.leftTitle]}>{Strings.registerNewAccount}</Text>
                <KeyboardAwareScrollView style={{ flex: 1, width: "100%" }}>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            placeholder={Strings.components.editProfile.firstNamePlaceHolder}
                            onChangeText={text => this.setState({ firstname: text })}
                            value={this.state.firstname}
                            underlineColorAndroid='transparent' />
                    </View>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            placeholder={Strings.components.editProfile.lastNamePlaceHolder}
                            onChangeText={text => this.setState({ lastname: text })}
                            value={this.state.lastname}
                            underlineColorAndroid='transparent' />
                    </View>
                    {/* <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            placeholder='Phone Number'
                            onChangeText={text => this.setState({ phone: text })}
                            value={this.state.phone}
                            underlineColorAndroid='transparent' />
                    </View> */}
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}

                            placeholder={Strings.components.editProfile.emailPlaceHolder}
                            onChangeText={text => this.setState({ email: text.replace(/ /g,"") })}
                            value={this.state.email}
                            underlineColorAndroid='transparent' />
                    </View>
                    <View style={[styles.InputContainer, { marginBottom: 50 }]}>
                        <TextInput
                            style={styles.body}
                            placeholder={Strings.PasswordPlaceHolder}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ password: text })}
                            value={this.state.password}
                            underlineColorAndroid='transparent' />
                    </View>
                    {this.state.progress ? (
                        <ActivityIndicator
                            size='large'
                            color={"#384c8d"}
                            animating={true} />
                    ) : (
                            <Button
                                containerStyle={styles.facebookContainer}
                                style={styles.facebookText}
                                onPress={this.onRegister}
                                >
                                {Strings.Signup}
                            </Button>
                        )}
                        {this._MassageValidRegister()}
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

Signup.propTypes = {
    onRegister: PropTypes.func
};


function mapStateToProps(state) {
    return {
        RegisterData: state.ResultRegister
    }
}
export default connect(mapStateToProps, actionCreatores)(withNavigation(Signup));
