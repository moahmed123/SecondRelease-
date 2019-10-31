import { Platform } from "react-native";

// const WINDOW_WIDTH = Dimensions.get('window').width;
// const WINDOW_HEIGHT = Dimensions.get('window').height;

const colorSet = {
  mainThemeBackgroundColor: "white",
  mainThemeForegroundColor: "#333333",
  // mainThemeForegroundColor: "#c0c0c0",
  mainTextColor: "#555555",
  mainSubtextColor: "#999999",
  hairlineColor: "#cccccc",
  subHairlineColor: "#f2f2f3",
  tint: "#3068CC",
  facebook: "#4267b2",
  grey: "grey"
};

const imageSet = {
  shopertinoLogo: require("../assets/images/smart.png"),
  shoppingBag: require("../assets/images/shopping-bag.png"),
  quickSearch: require("../assets/images/quick-search.png"),
  wishlist: require("../assets/images/wishlist.png"),
  delivery: require("../assets/images/delivery.png"),
  notification: require("../assets/images/notification.png"),
  payment: require("../assets/images/payment.png"),
  applePay: require("../assets/images/apple-pay.png"),
  googlePay: require("../assets/images/google-pay.png"),
  googlePayColored: require("../assets/images/google-pay-colored.png"),
  creditCard: require("../assets/images/credit-card.png"),
  box: require("../assets/images/box.png")
};

const iconSet = {
  homeDrawer: require("../assets/icons/home-drawer.png"),
  logoutDrawer: require("../assets/icons/logout-drawer.png"),
  orderDrawer: require("../assets/icons/order-drawer.png"),
  profileDrawer: require("../assets/icons/profile-drawer.png"),
  searchDrawer: require("../assets/icons/search-drawer.png"),
  shopDrawer: require("../assets/icons/shop-drawer.png"),
  shoppingBagDrawer: require("../assets/icons/shopping-bag-drawer.png"),
  wishlistDrawer: require("../assets/icons/wishlist-drawer.png"),
  menuHamburger: require("../assets/icons/menu-hamburger.png"),
  shoppingBagFilled: require("../assets/icons/shopping-bag-filled.png"),
  accountDetail: require("../assets/icons/account-detail.png"),
  settings: require("../assets/icons/settings.png"),
  contactUs: require("../assets/icons/contact-us.png"),
  rightArrow: require("../assets/icons/right-arrow.png"),
  wishlistFilled: require("../assets/icons/wishlist-filled.png"),
  wishlistUnFilled: require("../assets/icons/wishlist-unfilled.png"),
  arrowDown: require("../assets/icons/down-arrow.png"),
  share: require("../assets/icons/share.png"),
  simpleCheck: require("../assets/icons/simple-check.png"),
  appleFilled: require("../assets/icons/apple-filled.png"),
  add: require("../assets/icons/add.png"),
  minus: require("../assets/icons/minus.png"),
  creditCardIcon: require("../assets/icons/credit-card-icon.png"),
  tick: require("../assets/icons/tick.png"),
  plus: require("../assets/icons/plus.png"),
  visaPay: require("../assets/icons/visa-pay.png")
};

const fontFamily = {
  boldFont: "Oswald-Bold",
  semiBoldFont: "Oswald-SemiBold",
  regularFont: "Oswald-Regular",
  mediumFont: "Oswald-Medium",
  lightFont: "Oswald-Light",
  extraLightFont: "Oswald-ExtraLight"
};

const fontSet = {
  xxlarge: 40,
  xlarge: 30,
  large: 25,
  middle: 20,
  normal: 16,
  small: 13,
  xsmall: 11,
  title: 30,
  content: 20
};

const sizeSet = {
  buttonWidth: "70%",
  inputWidth: "80%",
  radius: 25
};

const styleSet = {
  menuBtn: {
    container: {
      backgroundColor: colorSet.grayBgColor,
      borderRadius: 22.5,
      padding: 10,
      marginLeft: 10,
      marginRight: 10
    },
    icon: {
      tintColor: "black",
      width: 15,
      height: 15
    }
  },
  searchBar: {
    container: {
      marginLeft: Platform.OS === "ios" ? 30 : 0,
      backgroundColor: "transparent",
      borderBottomColor: "transparent",
      borderTopColor: "transparent",
      flex: 1
    },
    input: {
      backgroundColor: colorSet.inputBgColor,
      borderRadius: 10,
      color: "black"
    }
  },
  rightNavButton: {
    marginRight: 10
  },
  borderRadius: {
    main: 25,
    small: 5
  },
  textInputWidth: {
    main: "80%"
  }
};

const StyleDict = {
  imageSet,
  iconSet,
  fontFamily,
  colorSet,
  fontSet,
  sizeSet,
  styleSet
};

export default StyleDict;
