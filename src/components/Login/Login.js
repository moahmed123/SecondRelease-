import PropTypes from "prop-types";
import React from "react";
import { Text, TextInput, View, ActivityIndicator } from "react-native";
import Button from "react-native-button";
import AppStyles from "../../AppStyles";
import styles from "./styles";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginProgress: false,
      facebookProgress: false,
      loading: false,
      email: "marya22@gmail.com",
      password: "marya22"
    };
  }

  onLogin = () => {
    const { email, password } = this.state;

    this.props.onLogin(email, password);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder='E-mail or phone number'
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            underlineColorAndroid='transparent'/>
        </View>
        <View style={[styles.InputContainer, { marginBottom: 30 }]}>
          <TextInput
            style={styles.body}
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            underlineColorAndroid='transparent'/>
        </View>
        {this.state.loginProgress ? (
          <ActivityIndicator
            size='large'
            color={AppStyles.colorSet.mainThemeForegroundColor}
            animating={true}/>
        ) : (
          <Button
            containerStyle={styles.loginContainer}
            style={styles.loginText}
            onPress={this.onLogin}>
            Log in
          </Button>
        )}
        <View style={styles.orView}>
          <Text style={styles.orText}>OR</Text>
        </View>
        {this.state.facebookProgress ? (
          <ActivityIndicator size='large' color={"#384c8d"} animating={true} />
        ) : (
          <Button
            containerStyle={[
              styles.loginContainer,
              { marginTop: 0, backgroundColor: "#384c8d" }
            ]}
            style={styles.loginText}
            onPress={this.loginWithFb}>
            Facebook Login
          </Button>
        )}
      </View>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func
};

export default Login;
