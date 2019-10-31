import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Signup from "../../components/Signup/signup";
import styles from "./styles";
import { register } from "../../firebase/API/auth";
import deviceStorage from "../../utils/deviceStorage";

class SignupScreen extends React.Component {
  static navigationOptions = () => ({
    headerTintColor: "#464646",
    headerTitleStyle: styles.headerTitleStyle,
    gesturesEnabled: false,
    headerStyle: {
      borderBottomWidth: 0
    }
  });

  constructor(props) {
    super(props);
  }

  onSignupPress = async userDetail => {
    const user = await register(userDetail);

    if (user.success) {
      this.props.dispatch({
        type: "UPDATE_USER",
        data: user
      });
      await deviceStorage.setUserData(user);
      this.props.navigation.navigate("Drawer");
    }
 else {
      alert(user);
    }
  };

  render() {
    return <Signup onRegister={this.onSignupPress} />;
  }
}

SignupScreen.propTypes = {
  navigation: PropTypes.object
};

export default connect()(SignupScreen);
