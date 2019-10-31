import React, { Component } from "react";
import { Animated, Dimensions, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const { width: screenWidth } = Dimensions.get("window");
const width = screenWidth * 0.7;

export default class CarouselSlider extends Component {
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
    const configInterpolateImageObject = {
      inputRange: [index - 1, index, index + 1],
      outputRange: [0.8, 1, 0.8],
      extrapolate: "clamp"
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
            source={{ uri: item.slideimage }}/>
        </Animated.View>        
      </TouchableOpacity>
    );
  };
}

// CarouselSlider.propTypes = {
//   animatedValue: PropTypes.object,
//   item: PropTypes.object,
//   navigation: PropTypes.object,
//   index: PropTypes.number,
//   onCardPress: PropTypes.func
// };
