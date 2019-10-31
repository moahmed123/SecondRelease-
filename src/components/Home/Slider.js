import React, { Component } from "react";
import { Dimensions } from "react-native";
import SideSwipe from "react-native-sideswipe";
import PropTypes from "prop-types";
import CarouselSlider from "../Carousel/CarouselSlider";

const { width } = Dimensions.get("window");
const renderItemWidth = width * 0.7;
// const renderItemWidth = width;

export default class Slider extends Component {
  shouldSwipe = ({ dx }) => {
    return dx < -30 || dx > 30;
  };
  renderItem = ({ itemIndex, currentIndex, item, animatedValue }) => (
    <CarouselSlider
      key={itemIndex}
    //   onCardPress={() => this.props.onCardPress(item)}
      item={item}
      index={itemIndex}
      currentIndex={currentIndex}
      animatedValue={animatedValue}/>
  );
  render() {
    const { dataSource, onIndexChange, renderItem, currentIndex } = this.props;
    const offset = (width - renderItemWidth) / 2;

    return (
      <SideSwipe
        index={currentIndex}
        data={dataSource}
        //shouldCapture={gestureState => this.shouldSwipe(gestureState)}
        itemWidth={renderItemWidth}
        
        threshold={renderItemWidth / 2 - 10}
        
        style= {{height: 200, marginBottom: 20,  paddingBottom: 30, width: '100%'}}

        extractKey={item => item.id}
        contentOffset={offset}
        onIndexChange={onIndexChange}
        renderItem={this.renderItem}
        // renderItem={({ itemIndex, currentIndex, item, animatedValue }) =>
        //   renderItem({ itemIndex, currentIndex, item, animatedValue })}
          />
    );
  }
}

Slider.propTypes = {
  dataSource: PropTypes.array,
  renderItem: PropTypes.func,
  onIndexChange: PropTypes.func,
  currentIndex: PropTypes.number
};
