import React, { Component } from "react";
import { Animated, Dimensions, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const { width: screenWidth } = Dimensions.get("window");
const width = screenWidth * 0.7;

export default class CarouselProductView extends Component {
    static WIDTH = width;

    constructor(props) {
        super(props);

        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        });
    }

    render = () => {
        const { animatedValue, item, index, onCardPress } = this.props;

        const configInterpolateTextObject = {
            inputRange: [index - 1, index, index + 1],
            outputRange: [-30, 0, -30],
            extrapolate: "clamp"
        };

        const configInterpolateImageObject = {
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.8, 1, 0.8],
            extrapolate: "clamp"
        };

        const configOpacityInterpolateTextObject = {
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 1, 0]
        };

        return (
            <TouchableOpacity activeOpacity={0.7} onPress={onCardPress}>
                <Animated.View style={styles.carouselProductViewContainer}>
                    <Animated.Image
                        style={[
                            styles.carouselProductViewImage,
                            {
                                transform: [
                                    {
                                        scale: animatedValue.interpolate(
                                            configInterpolateImageObject
                                        )
                                    }
                                ]
                            }
                        ]}
                        source={{ uri: item.thumb }} />
                </Animated.View>
                <Animated.Text
                    numberOfLines={2}
                    style={[
                        styles.carouselProductViewTitle,
                        {
                            // opacity: animatedValue.interpolate(
                            //     configOpacityInterpolateTextObject
                            // ),
                            // transform: [
                            //     {
                            //         translateY: animatedValue.interpolate(
                            //             configInterpolateTextObject
                            //         )
                            //     }
                            // ]
                        }
                    ]}
                    >
                    {(item.name.length > 30)? item.name.toUpperCase().slice(0,30) + ' ...': item.name.toUpperCase()}
                </Animated.Text>
                <Animated.Text
                    style={[
                        styles.carouselProductViewPrice,
                        {
                            // opacity: animatedValue.interpolate(
                            //     configOpacityInterpolateTextObject
                            // ),
                            // transform: [
                            //     {
                            //         translateY: animatedValue.interpolate(
                            //             configInterpolateTextObject
                            //         )
                            //     }
                            // ]
                        }
                    ]}>                    
                    {
                        (item.special)?
                            <Text style={{color: '#cc0000'}}>
                                {item.special}
                                <Text style={{
                                fontSize: 10,textDecorationLine: 'line-through', color: '#999'
                                }}>
                                   	&nbsp; {item.price}	&nbsp;
                                </Text>                                
                            </Text>
                            :
                            item.price
                    }
                </Animated.Text>
            </TouchableOpacity>
        );
    };
}

CarouselProductView.propTypes = {
    animatedValue: PropTypes.object,
    item: PropTypes.object,
    navigation: PropTypes.object,
    index: PropTypes.number,
    onCardPress: PropTypes.func
};
