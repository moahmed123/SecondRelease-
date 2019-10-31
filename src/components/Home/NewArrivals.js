import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import CarouselView from "../Carousel/CarouselView";
import CarouselProductView from "../Carousel/CarouselProductView";
import styles from "./styles";
import ProductDetailModal from "../../components//Modals/ProductDetailModal/ProductDetailModal";

import * as actionCreatores from '../../action';
import { connect } from "react-redux";
//Connect Url 
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";

class NewArrivals extends Component {
    state = {
        currentIndex: 0,
        isProductDetailVisible: false, // Use Page Visible             
    };
    renderItem = ({ itemIndex, currentIndex, item, animatedValue }) => (        
        <CarouselProductView
            key={itemIndex.toString()}
            // onCardPress={() => this.props.onCardPress(item)}
            onCardPress={()=>{

                const parametersurl = ExpandStores.UrlStore + RoutesApi.ProductInfo;        
                const tokon = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.
                tokon.then((token) => {                            
                    this.props.GetProductInfo(parametersurl, token, item.product_id);
                    // Redirect To Page Is such as pupops.
                    this.setState({isProductDetailVisible: true});                            
                });                        
            }}
            item={item}
            index={itemIndex}
            currentIndex={currentIndex}
            animatedValue={animatedValue} />        
    );

    render() {
        const { dataSource, title } = this.props;

        return (
            <View style={[styles.carouselContainer, { marginBottom: 10 }]}>
                <Text style={styles.carouselTitleText}>{title}</Text>
                <CarouselView
                    currentIndex={this.state.currentIndex}
                    dataSource={dataSource}
                    renderItem={this.renderItem}
                    onIndexChange={index => this.setState({ currentIndex: index })} />

                <ProductDetailModal                    
                    visible={this.state.isProductDetailVisible}
                    // onFavouritePress={this.onFavouritePress}
                    // onAddToBag={this.onAddToBag}
                    onCancelPress={() =>
                        {this.setState({
                            isProductDetailVisible: !this.state.isProductDetailVisible
                            // isProductDetailVisible: false
                        });
                        this.props.refreshData();
                    }}                     
                />
            </View>
        );
    }
}

// NewArrivals.propTypes = {
//     title: PropTypes.string,
//     dataSource: PropTypes.array,
//     onIndexChange: PropTypes.func,
//     onCardPress: PropTypes.func
// };
function mapStateToProps(state) {
    return {
        ProductsData: state.ProductInfo
    }
}
export default connect(mapStateToProps, actionCreatores)(NewArrivals);