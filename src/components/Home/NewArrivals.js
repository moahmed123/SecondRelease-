import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import CarouselView from "../Carousel/CarouselView";
import CarouselProductView from "../Carousel/CarouselProductView";
import styles from "./styles";

export default class NewArrivals extends Component {
  state = {
    currentIndex: 0
  };
  renderItem = ({ itemIndex, currentIndex, item, animatedValue }) => (
    <CarouselProductView
      key={itemIndex}
      onCardPress={() => this.props.onCardPress(item)}
      item={item}
      index={itemIndex}
      currentIndex={currentIndex}
      animatedValue={animatedValue}/>
  );

  render() {
    const { dataSource, title } = this.props;

    return (
      <View style={styles.carouselContainer}>
        <Text style={styles.carouselTitleText}>{title}</Text>
        <CarouselView
          currentIndex={this.state.currentIndex}
          dataSource={dataSource}
          renderItem={this.renderItem}
          onIndexChange={index => this.setState({ currentIndex: index })}/>
      </View>
    );
  }
}

NewArrivals.propTypes = {
  title: PropTypes.string,
  dataSource: PropTypes.array,
  onIndexChange: PropTypes.func,
  onCardPress: PropTypes.func
};
