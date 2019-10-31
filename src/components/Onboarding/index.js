import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Carousel from "./Carousel/Carousel";
import FlowItem from "./FlowItem/FlowItem";
import styles from "./styles";

export default class Onboarding extends Component {
  static propTypes = {
    onFinished: PropTypes.func,
    data: PropTypes.shape(),
    iconpackage: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      finished: false
      // back: '',
    };
  }

  onAnimNextPage = next => {
    // alert(p);
    const { screens } = this.props.data;
    const { current } = this.state;

    if (parseInt(current) === screens.length - 1 && parseInt(next) === 0) {
      this.setState({
        current: next,
        finished: true
      });
      this.props.onFinished();
    }
 else {
      this.setState({ current: next });
    }
  };

  render() {
    const { bgColor, fgColor, screens } = this.props.data;

    const textColorStyle = {
      color: fgColor
    };

    const { iconpackage } = this.props;

    const { finished } = this.state;
    let CarouselComponent;

    if (!finished) {
      CarouselComponent = (
        <Carousel
          style={styles.carousel}
          bullets={true}
          autoplay={false}
          currentPage={0}
          // onAnimateNextPage={this._onAnimNextPage}
          onPageBeingChanged={this.onAnimNextPage}
          isLooped={false}>
          {screens.map((item, i) => {
            return (
              <FlowItem
                key={i}
                style={styles.flowItem}
                textColor={textColorStyle}
                data={item}
                iconpackage={iconpackage}/>
            );
          })}
        </Carousel>
      );
    }

    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        {CarouselComponent}
      </View>
    );
  }
}
