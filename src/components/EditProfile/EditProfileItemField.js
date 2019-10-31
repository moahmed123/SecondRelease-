import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, TextInput } from "react-native";
import styles from "./styles";
import AppStyles from "../../AppStyles";

export default class EditProfileItemField extends Component {
    render() {
        const {
            title,
            onChange,
            value,
            isEditable,
            placeholder,
            keyboardType
        } = this.props;

        return (
            <View style={styles.itemView}>
                <Text style={styles.labelText}>{title}</Text>
                <TextInput
                    keyboardType={keyboardType}
                    underlineColorAndroid='transparent'
                    style={styles.text}
                    editable={isEditable}
                    placeholderTextColor={AppStyles.colorSet.hairlineColor}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChange} />
            </View>
        );
    }
}

// EditProfileItemField.propTypes = {
//   onChange: PropTypes.func,
//   value: PropTypes.string,
//   title: PropTypes.string,
//   isEditable: PropTypes.bool,
//   placeholder: PropTypes.string,
//   keyboardType: PropTypes.string
// };
