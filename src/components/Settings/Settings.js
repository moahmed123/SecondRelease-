import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    ActivityIndicator,
    WebView
} from 'react-native';
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";
import Strings from '../../ExpandStores/LocalizedStrings';

class TestWebView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadedSpinner: true,
        }
    }
    render() {
        var renderTime = Date.now();
        return (
            <View style={{ flex: 1, height: Dimensions.get("window").height }}>
                {
                    (this.state.isLoadedSpinner)?                        
                        <ActivityIndicator color = "#ddd"/>                        
                    :
                        null
                }
                <WebView
                    source={{ uri: UrlCheckout }}
                    style={{ flex: 1 }}
                    onLoad={() => {
                        this.setState({ isLoadedSpinner: false });
                        console.log('On load event', `Loading time : ${Date.now() - renderTime}`)
                    }}
                />
            </View>
        );
    }
}

export default class App extends Component {
    static navigationOptions = {
        title: Strings.components.profile.contactUsTitle,
      };
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            url: '',
        }
    }
    componentDidMount(){
        const parametersurl = ExpandStores.CheckOutLink;
        const tokon = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.
        tokon.then((token) => {
            UrlCheckout = parametersurl + token;
            this.setState({
                url: UrlCheckout
            })

        });
    }
    render() {
        if (this.state.isLoaded) {
            return (
                <TestWebView />
            )
        }
        return (
            <View style={styles.container}>
                <View style={{ height: 0, width: 0 }}>
                    <WebView
                        source={{ uri: this.state.url }}
                        onLoad={() => {
                            this.setState({ isLoaded: true })
                        }}
                    />
                </View>
                <ActivityIndicator UrlCheckout = {this.state.url}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
