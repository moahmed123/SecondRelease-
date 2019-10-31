import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, Text, AsyncStorage } from "react-native";
import styles from "./styles";

export default class ProfileImageCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            
        }
    }
    componentDidMount(){
        const DataUser = AsyncStorage.getItem('username');
        DataUser.then(data => {            
            this.setState({
                username: data,
            })
        })
    }

    render() {
        // const { extraData } = this.props;        
        return (
            <View style={styles.cardContainer}>
                <View style={styles.cardImageContainer}>
                    <Image
                        style={styles.cardImage}
                        source={{
                            uri:
                                "https://cdn131.picsart.com/289212614039201.png?r1024x1024"
                        }} />
                </View>
                <View style={styles.cardNameContainer}>
                    <Text style={styles.cardName}>
                        {this.state.username}
                    </Text>
                </View>
            </View>
        );
    }
}

ProfileImageCard.propTypes = {
    title: PropTypes.string,
    // ProfileItemScreen: PropTypes.array,
    navigation: PropTypes.func,
    extraData: PropTypes.object
};
