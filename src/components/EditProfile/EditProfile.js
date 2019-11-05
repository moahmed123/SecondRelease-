import React, { Component } from "react";
import { Text, View, ScrollView , Button, AsyncStorage} from "react-native";
import PropTypes from "prop-types";
import EditProfileItemField from "./EditProfileItemField";
import styles from "./styles";
import Strings from '../../ExpandStores/LocalizedStrings';

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
                        <Text style={styles.label}>{Strings.components.editProfile.publicProfile}</Text>
                    </View>
                    <View style={styles.contentView}>
                        <EditProfileItemField
                            onChange={text => this.setState({ firstName: text })}
                            value={firstName}
                            title={Strings.components.editProfile.firstName}
                            placeholder={Strings.components.editProfile.firstNamePlaceHolder}
                            isEditable={true} />
                        <View style={styles.lineView} />
                        <EditProfileItemField
                            onChange={text => this.setState({ lastName: text })}
                            value={lastName}
                            title={Strings.components.editProfile.lastName}
                            placeholder={Strings.components.editProfile.lastNamePlaceHolder}
                            isEditable={true} />
                    </View>
                    <View style={styles.labelView}>
                        <Text style={styles.label}>{}</Text>
                    </View>
                    <View style={styles.contentView}>
                        <EditProfileItemField
                            onChange={text => this.setState({ email: text })}
                            value={email}
                            title={Strings.components.editProfile.emailLabel}
                            placeholder={Strings.components.editProfile.emailPlaceHolder}
                            isEditable={false} />
                        <View style={styles.lineView} />
                        <EditProfileItemField
                            onChange={number => this.setState({ pass: number })}
                            value={pass}
                            title={Strings.components.editProfile.passwordLabel}
                            keyboardType={"numeric"}
                            placeholder={Strings.components.editProfile.passwordPlaceHolder}
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
