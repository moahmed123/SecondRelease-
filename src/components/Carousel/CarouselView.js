import React, { Component } from "react";
import { Dimensions } from "react-native";
import SideSwipe from "react-native-sideswipe";
import PropTypes from "prop-types";

const { width } = Dimensions.get("window");
const renderItemWidth = width * 0.7;

export default class CarouselView extends Component {
  shouldSwipe = ({ dx }) => {
    return dx < -30 || dx > 30;
  };

  render() {
    const { dataSource, onIndexChange, renderItem, currentIndex } = this.props;
    const offset = (width - renderItemWidth) / 2;

    return (
      <SideSwipe
        index={currentIndex}
        data={dataSource}
        shouldCapture={gestureState => this.shouldSwipe(gestureState)}
        itemWidth={renderItemWidth}
        threshold={renderItemWidth / 2 - 10}
        extractKey={item => item.id}
        contentOffset={offset}
        onIndexChange={onIndexChange}
        renderItem={({ itemIndex, currentIndex, item, animatedValue }) =>
          renderItem({ itemIndex, currentIndex, item, animatedValue })}/>
    );
  }
}

CarouselView.propTypes = {
  dataSource: PropTypes.array,
  renderItem: PropTypes.func,
  onIndexChange: PropTypes.func,
  currentIndex: PropTypes.number
};
