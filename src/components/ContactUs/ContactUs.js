import React, { Component } from "react";
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Linking
} from "react-native";
import styles from "./styles";

import * as actionCreatores from '../../action';
import { connect } from "react-redux";
//Connect Url
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";
// import { withNavigation } from "react-navigation";
import LoadingBar from '../../components/LoadingBar/LoadingBar';
import Strings from '../../ExpandStores/LocalizedStrings';

class ContactUs extends Component {
    static navigationOptions = {
        header: null
    };
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount(){
        let parametersurl = ExpandStores.UrlStore + RoutesApi.ContactInfo;
        let token = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.

        token.then((Token)=>{
            this.props.ContactInfo(parametersurl, Token);
        });
    }

    render() {
        const {ContactInfoData} = this.props;
        if(ContactInfoData){
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.body}>
                        <View style={styles.labelView}>
                            <Text style={styles.label}>{Strings.components.contactUs.title}</Text>
                        </View>
                        <View style={styles.contentView}>
                            <View style={styles.addressView}>
                                <Text style={styles.text}>{Strings.components.contactUs.OurAddress}</Text>
                                <Text style={styles.textcaption}>
                                    {ContactInfoData.StoreAddress}
                                </Text>
                            </View>
                            <View style={styles.itemView}>
                                <Text style={styles.text}>{Strings.components.contactUs.emailUs}</Text>
                                    <Text style={styles.placeholderText}>
                                        {ContactInfoData.StoreEmail}
                                    </Text>
                            </View>
                        </View>
                        {/* <View style={styles.captionView}>
                            <Text style={styles.caption}>
                                {ContactInfoData.StorePhone}
                            </Text>
                        </View> */}
                        <View style={styles.contentView}>
                            <TouchableOpacity
                                onPress={() => Linking.openURL(`tel:${ContactInfoData.StorePhone}`)}
                                style={styles.itemButton}>
                                <Text style={[styles.text, { color: "#384c8d" }]}>Call Us</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.labelView} />
                    </ScrollView>
                </View>
            );
        }else{
            return <LoadingBar/>
        }
    }
}

function mapStateToProps(state) {
    return {
        ContactInfoData: state.ContactInfoData
    };
}

export default connect(mapStateToProps, actionCreatores)(ContactUs);
