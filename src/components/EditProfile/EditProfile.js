import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import PropTypes from "prop-types";
import EditProfileItemField from "./EditProfileItemField";
import styles from "./styles";

export default class EditProfile extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      email: ""
    };
  }

  componentDidMount() {
    if (this.props.user) {
      const { firstName, lastName, phone, email } = this.props.user;

      this.setState({
        firstName,
        lastName,
        phone,
        email
      });
    }
  }

  render() {
    const { firstName, lastName, phone, email } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.body}>
          <View style={styles.labelView}>
            <Text style={styles.label}>PUBLIC PROFILE</Text>
          </View>
          <View style={styles.contentView}>
            <EditProfileItemField
              onChange={text => this.setState({ firstName: text })}
              value={firstName}
              title={"First Name"}
              placeholder={"Your first name"}
              isEditable={true}/>
            <View style={styles.lineView} />
            <EditProfileItemField
              onChange={text => this.setState({ lastName: text })}
              value={lastName}
              title={"Last Name"}
              placeholder={"Your last name"}
              isEditable={true}/>
          </View>
          <View style={styles.labelView}>
            <Text style={styles.label}>PRIVATE DETAILS</Text>
          </View>
          <View style={styles.contentView}>
            <EditProfileItemField
              onChange={text => this.setState({ email: text })}
              value={email}
              title={"E-mail Address"}
              placeholder={"Your email"}
              isEditable={false}/>
            <View style={styles.lineView} />
            <EditProfileItemField
              onChange={number => this.setState({ phone: number })}
              value={phone}
              title={"Phone Number"}
              keyboardType={"numeric"}
              placeholder={"Your phone number"}
              isEditable={true}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

EditProfile.propTypes = {
  user: PropTypes.object
};
