import { AsyncStorage } from "react-native";

const LOGGED_IN_USER_DATA = "LOGGED_IN_USER_DATA";

/**
 * Get user Data
 * @returns {Object}
 */
const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem(LOGGED_IN_USER_DATA);

    return userData ? JSON.parse(userData) : false;
  }
  catch (err) {
    return err;
  }
};

/**
 * Set user Data
 * @param {Object} data
 * @returns {Object}
 */
const setUserData = async data => {
  try {
    await AsyncStorage.setItem(LOGGED_IN_USER_DATA, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

const deviceStorage = {
  getUserData,
  setUserData
};

export default deviceStorage;
