import firebase from "react-native-firebase";

const usersRef = firebase.firestore().collection("users");

/**
 * Register user with email and password
 * @param {Object} userDetail
 * @returns {Promise}
 */
export async function register(userDetail) {
  const { email, fullname, password, phone } = userDetail;

  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const user_uid = response.user.uid;
    const data = {
      id: user_uid,
      email: email,
      firstName: fullname,
      phone: phone,
      userId: user_uid
    };

    await usersRef.doc(user_uid).set(data);
    const user = await usersRef.doc(user_uid).get();

    return { ...user.data(), success: true };
  }
 catch (error) {
    return error;
  }
}

/**
 * Login user with email and password
 * @param {String} email
 * @param {String} password
 * @returns {Promise}
 */
export async function login(email, password) {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const user_uid = response.user.uid;
    const user = await usersRef.doc(user_uid).get();

    return { ...user.data(), success: true };
  }
 catch (error) {
    return error;
  }
}
