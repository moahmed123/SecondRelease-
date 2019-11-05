import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, Text } from "react-native";
import strings from '../../ExpandStores/LocalizedStrings'
import styles from "./styles";

export default class CardContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedColorIndex: this.props.item.selectedColorIndex
                ? this.props.item.selectedColorIndex
                : 0,
            selectedSizeIndex: this.props.item.selectedSizeIndex
                ? this.props.item.selectedSizeIndex
                : 0
        };
    }

    // onColorSelected = index => {
    //     this.setState({ selectedColorIndex: index }, () => {
    //         this.props.onColorSelected(index);
    //     });
    // };

    // onSizeSelected = index => {
    //     this.setState({ selectedSizeIndex: index }, () => {
    //         this.props.onSizeSelected(index);
    //     });
    // };

    render() {
        const { contentContainer, item, price } = this.props;

        return (
            <View style={contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{item.name}</Text>
                </View>
                <View style={styles.optionContainer}>
                    {
                        (item.option)?
                            item.option.map((data, key) => {
                                return(
                                    <View style={styles.colorOptionContainer} key = {key}>
                                        <View style={styles.colorOptionTitleContainer}>
                                            <Text style={styles.color}>{data.name}</Text>
                                        </View>
                                        <View style={styles.checkBoxContainer}>
                                            <Text style={styles.color}>{data.value}</Text>                       
                                        </View>
                                    </View>
                                )
                            })                            
                        :null
                    }
                    <View style={styles.colorOptionContainer}>                        
                        {(item.stock)?
                            <View style={styles.checkBoxContainer}>
                                <Text style={[styles.color, {color: '#27ae60', marginHorizontal: 5, fontSize: 16}]}>
                                    {strings.CartItemInStockLabel}                                                                
                                </Text>
                            </View>
                            :
                            <View style={styles.checkBoxContainer}>
                                <Text style={[styles.color, {color: '#cc0000', marginHorizontal: 5, fontSize: 16}]}>
                                     {strings.CartItemNotInStockLabel}
                                </Text>
                            </View>
                        }
                    </View>
                    {/* <View style={styles.sizeOptionContainer}>
                        {/* <View style={styles.colorOptionTitleContainer}>
                            <Text style={styles.size}>{"Size"}</Text>
                        </View> */}
                        {/* <View style={styles.checkBoxContainer}>
              {item.sizes &&
                item.sizes.map((size, index) => (
                  <SizeCheckBox
                    containerStyle={styles.checkBox}
                    key={index + ""}
                    size={size}
                    selectedIndex={this.state.selectedSizeIndex}
                    onPress={() => this.onSizeSelected(index)}
                    index={index}/>
                ))}
            </View> */}
                    {/* </View> */}
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{price}</Text>
                </View>
            </View>
        );
    }
}

CardContent.propTypes = {
    contentContainer: PropTypes.object,
    item: PropTypes.object,
    price: PropTypes.string,
    onColorSelected: PropTypes.func,
    onSizeSelected: PropTypes.func
};
