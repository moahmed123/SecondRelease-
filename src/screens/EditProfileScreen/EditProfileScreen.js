import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EditProfile from "../../components/EditProfile/EditProfile";
import AppStyles from "../../AppStyles";
import Strings from '../../ExpandStores/LocalizedStrings';

class EditProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title:
      typeof navigation.state.params === "undefined" ||
      typeof navigation.state.params.title === "undefined"
        ? Strings.screens.editProfileScreen.title
        : navigation.state.params.title,
    headerTintColor: AppStyles.colorSet.mainThemeForegroundColor
  });

  constructor(props) {
    super(props);
  }

  render() {
    return <EditProfile user={this.props.user} />;
  }
}

EditProfileScreen.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = ({ app }) => {
  return {
    user: app.user
  };
};

export default connect(mapStateToProps)(EditProfileScreen);
