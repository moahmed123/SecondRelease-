import firebase from "react-native-firebase";
import deviceStorage from "../../utils/deviceStorage";

export const ordersRef = firebase
  .firestore()
  .collection("shopertino_orders")
  .where("user_id", "==", getUserId());

export function onOrdersUpdate(querySnapshot, callback) {
  const orders = [];

  querySnapshot.forEach(doc => {
    const data = doc.data();

    orders.push(data);
  });

  return callback(orders);
}

async function getUserId() {
  const user = await deviceStorage.getUserData();

  return user.id;
}
