import React, { Component} from "react";
import { View, ActivityIndicator } from 'react-native'

class LoadingBar extends Component {
    render() {
        return (
            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#eee" />
            </View>    
        );
    }
}
export default LoadingBar;
