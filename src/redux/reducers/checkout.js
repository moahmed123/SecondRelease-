import { Platform } from "react-native";
import AppStyles from "../../AppStyles";

const defaultPaymentMethod = {
  title: Platform.OS === "ios" ? "Apple Pay" : "Google Pay",
  key: Platform.OS === "ios" ? "apple" : "google",
  cardEndingNumber: Platform.OS === "ios" ? "Apple Pay" : "Google Pay",
  iconSource: AppStyles.iconSet.creditCardIcon
};

const UPDATE_TOTAL_PRICE = "UPDATE_TOTAL_PRICE";
const UPDATE_CARD_NUMBERS_ENDING = "UPDATE_CARD_NUMBERS_ENDING";
const UPDATE_SHIPPING_METHOD = "UPDATE_SHIPPING_METHOD";
const UPDATE_PAYMENT_METHODS = "UPDATE_PAYMENT_METHODS";
const UPDATE_SELECTED_PAYMENT_METHOD = "UPDATE_SELECTED_PAYMENT_METHOD";
const UPDATE_CURRENT_ORDER_ID = "UPDATE_CURRENT_ORDER_ID";

export const updatePaymentMethods = data => ({
  type: UPDATE_PAYMENT_METHODS,
  data
});

export const updateCardNumbersEnding = data => ({
  type: UPDATE_CARD_NUMBERS_ENDING,
  data
});

export const setCurrentOrderId = data => ({
  type: UPDATE_CURRENT_ORDER_ID,
  data
});

const checkoutInitialState = {
  totalPrice: 0,
  shippingMethod: "UPS Ground",
  cardNumbersEnding: [4242],
  paymentMethod: "apple",
  currentOrderId: "",
  paymentMethods: [
    defaultPaymentMethod,
    {
      title: "Visa Ending in 4242",
      key: "card",
      cardEndingNumber: "4242",
      iconSource: AppStyles.iconSet.visaPay
    }
  ],
  selectedPaymentMethod: defaultPaymentMethod
};

export const checkout = (state = checkoutInitialState, action) => {
  switch (action.type) {
    case UPDATE_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.data
      };
    case UPDATE_CARD_NUMBERS_ENDING:
      return addCardNumberEnding(state, action.data);

    case UPDATE_SHIPPING_METHOD:
      return {
        ...state,
        shippingMethod: action.data,
        totalPrice:
          action.data === "FedEx"
            ? (Number(state.totalPrice) + 5.99).toFixed(2)
            : state.totalPrice
      };
    case UPDATE_PAYMENT_METHODS:
      return updateUserPaymentMethods(state, action.data);

    case UPDATE_SELECTED_PAYMENT_METHOD:
      return {
        ...state,
        selectedPaymentMethod: action.data
      };
    case UPDATE_CURRENT_ORDER_ID:
      return {
        ...state,
        currentOrderId: action.data
      };

    default:
      return state;
  }
};

const updateUserPaymentMethods = (state, newMethod) => {
  const doesExist = state.paymentMethods.find(method => {
    return method.key == newMethod.key;
  });

  if (!doesExist) {
    return {
      ...state,
      paymentMethods: [...state.paymentMethods, newMethod]
    };
  }
 else {
    return state;
  }
};

const addCardNumberEnding = (state, newCardNumberEnding) => {
  const doesExist = state.cardNumbersEnding.find(number => {
    return newCardNumberEnding == number;
  });

  if (!doesExist) {
    return {
      ...state,
      cardNumbersEnding: [...state.cardNumbersEnding, newCardNumberEnding]
    };
  }
 else {
    return state;
  }
};
