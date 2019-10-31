import firebase from "react-native-firebase";

export const categoriesRef = firebase
  .firestore()
  .collection("shopertino_categories");

export function onCategoriesUpdate(querySnapshot, callback) {
  const categories = [];

  querySnapshot.forEach(doc => {
    const data = doc.data();

    categories.push(data);
  });

  return callback(categories);
}
