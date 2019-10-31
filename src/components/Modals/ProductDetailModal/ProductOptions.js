import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import ColorCheckBox from "../../ColorCheckBox/ColorCheckBox";
import SizeCheckBox from "../../SizeCheckBox/SizeCheckBox";
import styles from "./styles";

export default class ProductOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSizeIndex: 0,
            selectedColorIndex: 0
        };
    }

    onSizeCheckBoxPress = (productOptionId, optionValueId) => {
        this.setState({ selectedSizeIndex: optionValueId }, () => {
            // this.props.onSizeSelected(index);
            this.props.onSizeSelected(productOptionId, optionValueId);
        });
    };

    onColorCheckBoxPress = index => {
        this.setState({ selectedColorIndex: index }, () => {
            this.props.onColorSelected(index);
        });
    };

    render() {
        const { optionContainerStyle, item } = this.props;

        return (
            <View style={[styles.optionContainer, optionContainerStyle]}>
                {item.product_options && item.product_options.map((size, index) => {                    
                    return(
                        <View style={styles.sizeContainer} key = {index + ''}>                    
                            {
                                size.option_value.map((option, i ) => {
                                    return(
                                        <SizeCheckBox
                                            containerStyle={styles.checkBox}    
                                            key={i + ""}
                                            size={option.name}
                                            selectedIndex={this.state.selectedSizeIndex}
                                            onPress={() => {                                                                                                                                                                                            
                                                this.onSizeCheckBoxPress(size.product_option_id, option.product_option_value_id);
                                                console.log(size.product_option_id);
                                                console.log(option.product_option_value_id)
                                                
                                            }}
                                            index={option.product_option_value_id} />
                                    )
                                })   
                            }                                
                        </View>)
                                     
                })}
                {/* <View style={styles.colorContainer}>
                    {item.colors &&
                        item.colors.map((color, index) => (
                            <ColorCheckBox
                                containerStyle={styles.checkBox}
                                key={index + ""}
                                color={color}
                                selectedIndex={this.state.selectedColorIndex}
                                onPress={() => this.onColorCheckBoxPress(index)}
                                index={index} />
                        ))}
                </View> */}
            </View>
        );
    }
}

// ProductOptions.propTypes = {
//     optionContainerStyle: PropTypes.object,
//     item: PropTypes.object,
//     onSizeSelected: PropTypes.func,
//     onColorSelected: PropTypes.func
// };
