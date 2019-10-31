import React from "react";
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Share,
  Platform,
  Image
} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import Header from "./Header";
import ProductOptions from "./ProductOptions";
import Favourite from "./Favourite";
import FooterButton from "../../FooterButton/FooterButton";
import AppStyles from "../../../AppStyles";
import styles from "./styles";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class ProductDetailModal extends React.Component {
  onSizeSelected = index => {
    this.props.item.selectedSizeIndex = index;
  };

  onColorSelected = index => {
    this.props.item.selectedColorIndex = index;
  };

  onShare = async () => {
    const { item } = this.props;

    try {
      await Share.share({
        title: "Shopertino Product",
        dialogTitle: `Shopertino Product: ${item.name}`,
        message: item.description,
        url: item.photo
      });
    }
 catch (error) {
      alert(error.message);
    }
  };

  render() {
    const { visible, onCancelPress, item, onAddToBag } = this.props;

    return (
      <Modal
        isVisible={visible}
        hideModalContentWhileAnimating={true}
        animationIn='zoomInDown'
        animationOut='zoomOutUp'
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        style={styles.modalStyle}
        backdropOpacity={0.5}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}>
        <View style={styles.transparentContainer}>
          <StatusBar
            backgroundColor='rgba(0,0,0,0.5)'
            barStyle='dark-content'/>
          <View style={styles.viewContainer}>
            {item.details && (
              <Swiper
                loop={false}
                activeDot={<View style={styles.activeDot} />}
                containerStyle={styles.swiperContainer}>
                {item.details.map((image, index) => (
                  <View
                    key={index + ""}
                    style={styles.imageBackgroundContainer}>
                    <Image
                      style={styles.imageBackground}
                      source={{ uri: image }}/>
                  </View>
                ))}
              </Swiper>
            )}
            <Header
              onCancelPress={onCancelPress}
              headerContainerStyle={styles.headerContainerStyle}
              onSharePress={this.onShare}/>
            <ProductOptions
              item={item}
              onSizeSelected={this.onSizeSelected}
              onColorSelected={this.onColorSelected}
              optionContainerStyle={styles.optionContainerStyle}/>
            <Favourite
              onPress={() => this.props.onFavouritePress(item)}
              isFavourite={item.isFavourite}
              favouriteContainerStyle={styles.favouriteContainerStyle}/>
            <View style={styles.descriptionContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>{`$${item.price}`}</Text>
              <View style={styles.borderLine} />
            </View>
            <View style={styles.footerContainer}>
              <FooterButton
                onPress={() => onAddToBag(item)}
                footerContainerStyle={styles.addToBagContainerStyle}
                footerTitleStyle={{
                  color: "white",
                  fontFamily: AppStyles.fontFamily.regularFont
                }}
                title={"ADD TO BAG"}/>
              <View style={styles.buttonSpace} />
              <FooterButton
                footerContainerStyle={styles.payContainerStyle}
                footerTitleStyle={{
                  color: AppStyles.colorSet.mainThemeForegroundColor,
                  fontFamily: AppStyles.fontFamily.regularFont
                }}
                iconSource={Platform.OS === "ios"
                    ? AppStyles.iconSet.appleFilled
                    : AppStyles.imageSet.googlePayColored}
                iconStyle={styles.footerIconStyle}
                title={"Pay"}/>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

ProductDetailModal.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.object,
  visible: PropTypes.bool,
  onCancelPress: PropTypes.func,
  onFavouritePress: PropTypes.func,
  onAddToBag: PropTypes.func
};

export default ProductDetailModal;
