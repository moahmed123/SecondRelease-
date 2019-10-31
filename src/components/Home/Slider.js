import React, { Component } from "react";
import { Dimensions, View, Image } from "react-native";
// import SideSwipe from "react-native-sideswipe";
// import PropTypes from "prop-types";
// import CarouselSlider from "../Carousel/CarouselSlider";

const { width } = Dimensions.get("window");
// const renderItemWidth = width * 0.7;
// // const renderItemWidth = width;

// export default class Slider extends Component {
//   shouldSwipe = ({ dx }) => {
//     return dx < -30 || dx > 30;
//   };
//   renderItem = ({ itemIndex, currentIndex, item, animatedValue }) => (
//     <CarouselSlider
//       key={itemIndex}
//     //   onCardPress={() => this.props.onCardPress(item)}
//       item={item}
//       index={itemIndex}
//       currentIndex={currentIndex}
//       animatedValue={animatedValue}/>
//   );
//   render() {
//     const { dataSource, onIndexChange, renderItem, currentIndex } = this.props;
//     const offset = (width - renderItemWidth) / 2;

//     return (
//       <SideSwipe
//         index={currentIndex}
//         data={dataSource}
//         //shouldCapture={gestureState => this.shouldSwipe(gestureState)}
//         itemWidth={renderItemWidth}

//         threshold={renderItemWidth / 2 - 10}

//         style= {{height: 200, marginBottom: 20,  paddingBottom: 30, width: '100%'}}

//         extractKey={item => item.id}
//         contentOffset={offset}
//         onIndexChange={onIndexChange}
//         renderItem={this.renderItem}
//         // renderItem={({ itemIndex, currentIndex, item, animatedValue }) =>
//         //   renderItem({ itemIndex, currentIndex, item, animatedValue })}
//           />
//     );
//   }
// }

// Slider.propTypes = {
//   dataSource: PropTypes.array,
//   renderItem: PropTypes.func,
//   onIndexChange: PropTypes.func,
//   currentIndex: PropTypes.number
// };
import Carousel , { Pagination }from 'react-native-snap-carousel';

export default class Slider extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            activeSlide: 0
        };
      }

    _renderItem({ item, index }) {
        return (
            <View key={index}>
                <Image
                    source={{ uri: item.slideimage }}
                    style={{
                        width: '96%', height: 200, marginHorizontal: "2%", borderRadius: 5,
                        resizeMode: 'contain'
                    }}
                />
            </View>
        );
    }

    get pagination () {
        const { dataSource } = this.props;
        return (
            <Pagination
              dotsLength={dataSource.length}
              activeDotIndex={this.state.activeSlide}
              containerStyle={{ padding: 0}}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                //   backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backgroundColor: 'rgba(0, 0, 0, 0.75)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

    render() {
        return (
            <View>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.dataSource}
                    renderItem={this._renderItem}
                    sliderWidth={width}
                    itemWidth={width}
                    itemHeight = {200}
                    sliderHeight = {200}
                    loop={true}
                    autoplay={true}
                    autoplayDelay={2000}
                    autoplayInterval={3000}
                    inactiveSlideOpacity={0.7}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                />
                {/* { this.pagination } */}
            </View>
        );
    }
}