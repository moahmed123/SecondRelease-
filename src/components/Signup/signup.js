import React from "react";
import PropTypes from "prop-types";
import { Text, TextInput, View, ActivityIndicator } from "react-native";
import Button from "react-native-button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: false,
      loading: true,
      fullname: "",
      phone: "",
      email: "",
      password: ""
    };
  }

  onRegister = () => {
    const { fullname, phone, email, password } = this.state;

    this.props.onRegister({ fullname, phone, email, password });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
        <KeyboardAwareScrollView style={{ flex: 1, width: "100%" }}>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder='Full Name'
              onChangeText={text => this.setState({ fullname: text })}
              value={this.state.fullname}
              underlineColorAndroid='transparent'/>
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder='Phone Number'
              onChangeText={text => this.setState({ phone: text })}
              value={this.state.phone}
              underlineColorAndroid='transparent'/>
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder='E-mail Address'
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
              underlineColorAndroid='transparent'/>
          </View>
          <View style={[styles.InputContainer, { marginBottom: 50 }]}>
            <TextInput
              style={styles.body}
              placeholder='Password'
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
              underlineColorAndroid='transparent'/>
          </View>
          {this.state.progress ? (
            <ActivityIndicator
              size='large'
              color={"#384c8d"}
              animating={true}/>
          ) : (
            <Button
              containerStyle={styles.facebookContainer}
              style={styles.facebookText}
              onPress={this.onRegister}>
              Sign Up
            </Button>
          )}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

Signup.propTypes = {
  onRegister: PropTypes.func
};

export default Signup;
