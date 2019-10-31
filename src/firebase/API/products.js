import firebase from "react-native-firebase";

export const productsRef = firebase
  .firestore()
  .collection("shopertino_products");

export function onProductsUpdate(querySnapshot, callback) {
  const products = [];

  querySnapshot.forEach(doc => {
    const data = doc.data();

    products.push(data);
  });

  return callback(products);
}
