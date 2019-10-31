import React from "react";
import {
    View,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    Share,
    Platform,
    Picker,
    Image,
    AsyncStorage,
    Alert
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

//Call Function Action To Get Data  
import * as actionCreatores from '../../../action';
import { connect } from "react-redux";
//Connect Url 
import ExpandStores from '../../../ExpandStores/ExpandStores';
import RoutesApi from '../../../ExpandStores/RoutesApi';
import deviceStorage from "../../../utils/deviceStorage";
import { withNavigation } from "react-navigation";

import LoadingBar from '../../../components/LoadingBar/LoadingBar';
import strings from "../../../ExpandStores/LocalizedStrings";


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class ProductDetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option_Data: "",
            DoneCart: false,
            wishList: false,
            AppName: ''
        };
    }
    onSizeSelected = (productOptionId, optionValueId) => {
        // this.props.item.selectedSizeIndex = index;
        const optionData = " {\"" + productOptionId + "\":\"" + optionValueId + " \"}";        
        console.log(optionData);
        this.setState({ option_Data: optionData })// Select Value Option                
    };

    onColorSelected = index => {
        this.props.item.selectedColorIndex = index;
    };

    onShare = async () => {
        const { ProductsData } = this.props;
        const dataJson = AsyncStorage.getItem('AppName');
        dataJson.then((AppName) => { this.setState({ AppName: AppName }) });
        try {
            await Share.share({
                title: `${this.state.AppName} Product`,
                dialogTitle: `${this.state.AppName} Product: ${ProductsData.Product.name}`,
                message: ProductsData.Product.description,
                url: ProductsData.Product.image
            });
        }
        catch (error) {
            alert(error.message);
        }
    };

    _ProductData() {
        const { onCancelPress, ProductsData } = this.props;
        if (!ProductsData) {
            return <LoadingBar />
        } else {
            return (
                <View style={styles.viewContainer}>

                    {
                        (ProductsData.Product.product_images.length > 0) ?
                            <Swiper
                                loop={true}
                                activeDot={<View style={styles.activeDot} />}
                                containerStyle={styles.swiperContainer}>

                                {ProductsData.Product.product_images.map((image, index) => (
                                    <View
                                        key={index + ""}
                                        style={styles.imageBackgroundContainer}>
                                        <Image
                                            style={styles.imageBackground}
                                            source={{ uri: image.url }} />
                                        {
                                            this.state.DoneCart ?
                                                <Text style={{
                                                    color: '#fff', width: '60%', padding: 5, position: "absolute", height: 30,
                                                    backgroundColor: "#16a085", textAlign: 'center', marginHorizontal: '20%',
                                                    borderRadius: 5
                                                }}>
                                                    {strings.AddedToCart}
                                                    </Text>
                                                : null
                                        }
                                        {
                                            this.state.wishList ?
                                                <Text style={{
                                                    color: '#fff', width: '60%', padding: 5, position: "absolute", height: 30,
                                                    backgroundColor: "#16a085", textAlign: 'center', marginHorizontal: '20%',
                                                    borderRadius: 5
                                                }}>
                                                    {strings.addToWishListLoggedinMessage}
                                                </Text>
                                                : null
                                        }
                                    </View>
                                ))}
                            </Swiper>
                            :
                            <Swiper containerStyle={styles.swiperContainer}>
                                <View style={styles.imageBackgroundContainer}>
                                <Image
                                    style={styles.imageBackground}
                                    source={{ uri: ProductsData.Product.image }} />
                                </View>
                            </Swiper>
                            
                    }
                    {/* {item.details && (
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
                                        source={{ uri: image }} />
                                </View>
                            ))}
                        </Swiper>
                    )} */}
                    <Header
                        onCancelPress={onCancelPress}
                        headerContainerStyle={styles.headerContainerStyle}
                        onSharePress={this.onShare} />
                    <ProductOptions
                        item={ProductsData.Product}
                        onSizeSelected={this.onSizeSelected}
                        onColorSelected={this.onColorSelected}
                        optionContainerStyle={styles.optionContainerStyle} />
                    <Favourite
                        onPress={() => {
                            // this.props.onFavouritePress(item)
                            const value = AsyncStorage.getItem('userlogin');
                            if (value !== null) {
                                console.log(value);
                                // We have data!!
                                value.then((user) => {
                                    if (user == "login") {
                                        let parametersurl = ExpandStores.UrlStore + RoutesApi.AddToWishList;
                                        let token = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.                                        
                                        let productId = ProductsData.Product.product_id;
                                        token.then((Token) => {
                                            this.props.AddToWishlist(parametersurl, Token, productId).then(() => {
                                                this.setState({
                                                    wishList: true
                                                });
                                                setTimeout(() => {
                                                    this.setState({ wishList: false });
                                                }, 3000);
                                            })
                                        });
                                    } else {
                                        Alert.alert(
                                            strings.wishList,
                                            strings.addToWishListLoggedOutMessage,                                            
                                        );
                                    }
                                })
                            }
                        }}
                        // isFavourite={item.isFavourite}
                        favouriteContainerStyle={styles.favouriteContainerStyle} />

                    
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.title}>{ProductsData.Product.name}</Text>
                        {
                            (ProductsData.Product.special) ?
                                <Text>
                                    <Text style={[
                                        styles.productCardPrice,
                                        { fontSize: 10, color: '#999', textDecorationLine: 'line-through', textDecorationColor: '#777' }
                                    ]}>
                                        {ProductsData.Product.price}
                                    </Text>
                                    <Text style={[styles.price, { color: '#cc0000' }]}>{ProductsData.Product.special}</Text>
                                </Text>
                                :
                                <Text style={styles.price}>{ProductsData.Product.price}</Text>
                        }

                        <View style={styles.borderLine} />
                    </View>
                                        
                    <View style={styles.footerContainer}>
                        <FooterButton
                            onPress={() => {
                                //onAddToBag(item);
                                const parametersurl = ExpandStores.UrlStore + RoutesApi.AddToCart;
                                const token = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.
                                const urlGetCart = ExpandStores.UrlStore + RoutesApi.CartProducts;// Link Get Products Cart
                                const productId = ProductsData.Product.product_id;

                                token.then((token) => {
                                    if (ProductsData.Product.product_options.length > 0) {
                                        const requiredOption = ProductsData.Product.product_options[0].required;
                                        if (requiredOption == 1 && !this.state.option_Data) {
                                            Alert.alert(strings.emptyOptions)
                                        }else{
                                            console.log(this.state.option_Data);
                                            let Option_Data = this.state.option_Data;
                                            let quantity = 1;
                                            

                                            console.log(Option_Data);
                                            this.props.AddToCart(parametersurl, token, productId, quantity, Option_Data);
                                            this.setState({
                                                DoneCart: true
                                            });
                                            // Refresh Data Products Cart
                                            this.props.CartProducts(urlGetCart, token);
                                            setTimeout(() => {
                                                this.setState({ DoneCart: false });
                                            }, 2000);
                                        }
                                    } else {
                                        // Add To Cart Fun
                                        console.log(this.state.option_Data);
                                        let Option_Data = this.state.option_Data;
                                        let quantity = 1;
                                        // console.log(this.state.option_Data);
                                        this.props.AddToCart(parametersurl, token, productId, quantity, new Object({"2222":"8732"}));
                                        this.setState({
                                            DoneCart: true
                                        });
                                        // Refresh Data Products Cart
                                        this.props.CartProducts(urlGetCart, token);
                                        setTimeout(() => {
                                            this.setState({ DoneCart: false });
                                        }, 2000);

                                    }

                                });

                            }}
                            footerContainerStyle={styles.addToBagContainerStyle}
                            footerTitleStyle={{
                                color: "white",
                                fontFamily: AppStyles.fontFamily.regularFont
                            }}
                            title={strings.addtobag} />
                        <View style={styles.buttonSpace} />
                        {/* <FooterButton
                            footerContainerStyle={styles.payContainerStyle}
                            footerTitleStyle={{
                                color: AppStyles.colorSet.mainThemeForegroundColor,
                                fontFamily: AppStyles.fontFamily.regularFont
                            }}
                            iconSource={Platform.OS === "ios"
                                ? AppStyles.iconSet.appleFilled
                                : AppStyles.imageSet.googlePayColored}
                            iconStyle={styles.footerIconStyle}
                            title={"Pay"} /> */}
                    </View>                    
                </View>
            )
        }
    }

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
                        barStyle='dark-content' />
                    <View style={styles.viewContainer}>
                        {this._ProductData()}
                    </View>
                </View>                
            </Modal>
        );
    }
}

// ProductDetailModal.propTypes = {
//     onPress: PropTypes.func,
//     item: PropTypes.object,
//     visible: PropTypes.bool,
//     onCancelPress: PropTypes.func,
//     onFavouritePress: PropTypes.func,
//     onAddToBag: PropTypes.func
// };
function mapStateToProps(state) {
    return {
        ProductsData: state.ProductInfo
    }
}
export default connect(mapStateToProps, actionCreatores)(withNavigation(ProductDetailModal));
// export default ProductDetailModal;
