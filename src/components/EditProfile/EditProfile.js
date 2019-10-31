import React, { Component } from "react";
import { Text, View, ScrollView , Button, AsyncStorage} from "react-native";
import PropTypes from "prop-types";
import EditProfileItemField from "./EditProfileItemField";
import styles from "./styles";


import { connect } from 'react-redux';
import * as actionCreatores from './../../action';
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";
import { withNavigation } from "react-navigation"; 
import { StackActions, NavigationActions } from 'react-navigation';

class EditProfile extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            pass: "",
            email: ""
        };
    }

    componentDidMount() {
        const email = AsyncStorage.getItem('useremail');
        email.then(email => {
            this.setState({email: email})
        })        
    }

    render() {
        const { firstName, lastName, pass, email } = this.state;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.labelView}>
                        <Text style={styles.label}>PUBLIC PROFILE</Text>
                    </View>
                    <View style={styles.contentView}>
                        <EditProfileItemField
                            onChange={text => this.setState({ firstName: text })}
                            value={firstName}
                            title={"First Name"}
                            placeholder={"Your first name"}
                            isEditable={true} />
                        <View style={styles.lineView} />
                        <EditProfileItemField
                            onChange={text => this.setState({ lastName: text })}
                            value={lastName}
                            title={"Last Name"}
                            placeholder={"Your last name"}
                            isEditable={true} />
                    </View>
                    <View style={styles.labelView}>
                        <Text style={styles.label}>PRIVATE DETAILS</Text>
                    </View>
                    <View style={styles.contentView}>
                        <EditProfileItemField
                            onChange={text => this.setState({ email: text })}
                            value={email}
                            title={"E-mail Address"}
                            placeholder={"Your email"}
                            isEditable={false} />
                        <View style={styles.lineView} />
                        <EditProfileItemField
                            onChange={number => this.setState({ pass: number })}
                            value={pass}
                            title={"password"}
                            keyboardType={"numeric"}
                            placeholder={"Your password "}
                            isEditable={true} />
                    </View>
                    <Button
                        title="Edit Profile"
                        onPress={() => {
                            const { firstName, lastName, pass, email } = this.state;
                            const parametersurl = ExpandStores.UrlStore + RoutesApi.EditUser;
                            const tokon = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.
                            tokon.then((token) => {                                
                                this.props.EditCustomer( parametersurl, token, email, pass,firstName, lastName).then(()=>{
                                    const username  = firstName + " " + lastName;
                                    AsyncStorage.setItem('username', username);
                                    //restart App 
                                    const resetAction = StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
                                    });
                                    this.props.navigation.dispatch(resetAction);                  
                                });                                
                            });                            
                        }}
                    />
                </View>
            </ScrollView>
        );
    }
}

// EditProfile.propTypes = {
//     user: PropTypes.object
// };
function mapStateToProps(state) {
    return {
        LoginCustomerData: state.LoginCustomerData
    }
}
export default connect(mapStateToProps, actionCreatores)(withNavigation(EditProfile));