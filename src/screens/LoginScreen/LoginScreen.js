import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Login from "../../components/Login/Login";
import styles from "./styles";
import { login } from "../../firebase/API/auth";
import deviceStorage from "../../utils/deviceStorage";

// import firebase from "react-native-firebase";
// import { FBLoginManager } from "react-native-facebook-login";

class LoginScreen extends React.Component {
  static navigationOptions = () => ({
    headerTintColor: "#464646",
    headerTitleStyle: styles.headerTitleStyle,
    gesturesEnabled: false,
    headerStyle: {
      borderBottomWidth: 0
    }
  });
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  onLoginPress = async (email, password) => {
    const user = await login(email, password);

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

  //   loginWithFb = () => {
  //     _this = this;
  //     this.setState({ facebookProgress: true });
  //     Platform.OS == "ios"
  //       ? null
  //       : FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);
  //     FBLoginManager.logout(() => {
  //       console.log("FaceBook LogOut");
  //     });
  //     FBLoginManager.loginWithPermissions(
  //       ["public_profile", "email", "user_friends"],
  //       function(error, data) {
  //         if (!error) {
  //           const credential = firebase.auth.FacebookAuthProvider.credential(
  //             data.credentials.token
  //           );

  //           firebase
  //             .auth()
  //             .signInWithCredential(credential)
  //             .then(async response => {
  //               const isNewUser = response.additionalUserInfo.isNewUser;
  //               const {
  //                 first_name,
  //                 last_name
  //               } = response.additionalUserInfo.profile;
  //               const { uid, email, phoneNumber, photoURL } = response.user._user;
  //               const position = await _this.getCurrentLocation(
  //                 navigator.geolocation
  //               );
  //               const { navigation } = _this.props;

  //               _this.usersRef = firebase
  //                 .firestore()
  //                 .collection("users")
  //                 .doc(uid);

  //               if (isNewUser) {
  //                 const userData = {
  //                   id: uid,
  //                   email: email,
  //                   firstName: first_name,
  //                   lastName: last_name,
  //                   phone: phoneNumber,
  //                   profilePictureURL: photoURL,
  //                   userID: uid,
  //                   isOnline: true,
  //                   position: {
  //                     latitude: position.coords.latitude,
  //                     longitude: position.coords.longitude
  //                   },
  //                   created_at: firebase.firestore.FieldValue.serverTimestamp(),
  //                   appIdentifier: "rn-android-dating"
  //                 };

  //                 _this.usersRef.set(userData);
  //               }

  //               _this.usersRef
  //                 .get()
  //                 .then(function(user) {
  //                   if (user.exists) {
  //                     const FCM = firebase.messaging();

  //                     FCM.requestPermission();
  //                     // gets the device's push token
  //                     FCM.getToken().then(token => {
  //                       const userData = {
  //                         ...user.data(),
  //                         position: {
  //                           latitude: position.coords.latitude,
  //                           longitude: position.coords.longitude
  //                         }
  //                       };

  //                       _this.usersRef.update({
  //                         isOnline: true,
  //                         pushToken: token,
  //                         position: {
  //                           latitude: position.coords.latitude,
  //                           longitude: position.coords.longitude
  //                         }
  //                       });
  //                       // navigation.dispatch({ type: 'Login' });
  //                       AsyncStorage.setItem(
  //                         "@loggedInData:value",
  //                         JSON.stringify(userData)
  //                       );
  //                       navigation.dispatch({
  //                         type: "UPDATE_USER_DATA",
  //                         user: userData
  //                       });
  //                       this.handleIncompleteUserData(userData);
  //                       navigation.navigate("Swipe");
  //                       _this.setState({ facebookProgress: false });
  //                     });
  //                   }
  //  else {
  //                     alert("user does not exist!");
  //                     _this.setState({ facebookProgress: false });
  //                   }
  //                   // _this.setState({loginProgress: false});
  //                 })
  //                 .catch(function(error) {
  //                   const { code, message } = error;

  //                   alert(message);
  //                   _this.setState({ facebookProgress: false });
  //                 });
  //             })
  //             .catch(error => {
  //               console.log(error);
  //               _this.setState({ facebookProgress: false });
  //             });
  //         }
  //  else {
  //           console.log("Error: ", error);
  //           Alert.alert("Network is disconnected");
  //           _this.setState({ facebookProgress: false });
  //         }
  //       }
  //     );
  //   };

  render() {
    return <Login onLogin={this.onLoginPress} />;
  }
}

export default connect()(LoginScreen);
