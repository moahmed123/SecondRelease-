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
const { width, height } = Dimensions.get('window');

class ProductDetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option_Data: "",
            DoneCart: false,
            wishList: false,
            AppName: '',

            quantity: 1,
            size: { 
                width: width*.9,
                height: height *0.5,
            },
            modalVisible: false,
            snacbarVisability: false,
            selected: '',
            valselected: '',
            selectedReq: '',
            
            selectedTwo: '',
            valselectedTwo: '',
            selectedTwoReq: '',
            
            selectedThree: '',
            valselectedThree: '',
            selectedThreeReq: '',
            
            selectedfour: '',
            valselectedfour: '',
            selectedfourReq: '',
            
            PriceChanged: 0,
            webViewHeight:12,
            optionImage:'../../assets/placeHoldersImages/categoryListPlaceHolder.png',

            disableCart: ''
        };
        this.onValueChange = this.onValueChange.bind(this);
    } 
    componentDidMount(){
        const { ProductsData } = this.props; 
        if(this.props.ProductsData){
            console.log('mohamedalaa33');
            console.log(ProductsData.Product.product_options.length);   
            // Add RequeedOption 
            if(ProductsData.Product.product_options.length > 0){
                if(ProductsData.Product.product_options[0].required == 1){
                    this.setState({                
                        selectedReq: 1,
                    })            
                }
            }
            if(ProductsData.Product.product_options.length > 1){
                if(ProductsData.Product.product_options[1].required == 1){
                    this.setState({                
                        selectedTwoReq: 1
                    })            
                }    
            }
            if(ProductsData.Product.product_options.length > 2){
                if(ProductsData.Product.product_options[2].required == 1){
                    this.setState({                
                        selectedThreeReq: 1
                    })            
                }    
            }
            if(ProductsData.Product.product_options.length > 3){
                if(ProductsData.Product.product_options[3].required == 1){
                    this.setState({                
                        selectedfourReq: 1
                    })            
                }    
            }
        // End              
        }else{
            console.log('mohamed')
        }
    }
    onValueChange(value, valSelected, i, require) {        
        if (i == 0) {
            this.setState({
                selected: value,
                valselected: valSelected,
                selectedReq: require
            })            
        } else if (i == 1) {
            this.setState({
                selectedTwo: value,
                valselectedTwo:valSelected,
                selectedTwoReq: require
            });            
        } else if (i == 2) {
            this.setState({
                selectedThree: value,
                valselectedThree: valSelected,
                selectedThreeReq: require
            });            
        } else if (i == 3) {
            this.setState({
                selectedfour: value,
                valselectedfour: valSelected,
                selectedfourReq: require
            });            
        }        
    }
    // setModalVisible(visible) {
    //     this.setState({modalVisible: visible});
    // }

    
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
                                            style={styles.productCardImage} 
                                            defaultSource = {require("./../../../../assets/ReloadImage.png")}
                                        />
                                        <Image
                                            style={styles.imageBackground}
                                            source={{ uri: image.url }} 
                                            // defaultSource = {require("./../../../assets/ReloadImage.png")}
                                            />
                                        {
                                            this.state.DoneCart ?
                                                <Text style={{
                                                    color: '#fff', width: '60%', padding: 8, position: "absolute", height: 40,
                                                    backgroundColor: "#155724", textAlign: 'center', marginHorizontal: '20%',
                                                    borderRadius: 3, bottom: 25
                                                }}>
                                                    {strings.AddedToCart}
                                                    </Text>
                                                : null
                                        }
                                        {
                                            this.state.wishList ?
                                                <Text style={{
                                                    color: '#fff', width: '60%', padding: 5, position: "absolute", height: 30,
                                                    backgroundColor: "#155724", textAlign: 'center', marginHorizontal: '20%',
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
                                    source={{ uri: ProductsData.Product.image }}
                                  //  defaultSource = {require("../../../assets/images/ReloadImage.png")}
                                     />
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
                    {/* <ProductOptions
                        item={ProductsData.Product}
                        onSizeSelected={this.onSizeSelected}
                        onColorSelected={this.onColorSelected}
                        optionContainerStyle={styles.optionContainerStyle} /> */}
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
                                <Text style={{marginHorizontal: 15}}>
                                    <Text style={[
                                        styles.productCardPrice,
                                        { fontSize: 10, color: '#999', textDecorationLine: 'line-through', textDecorationColor: '#777' }
                                    ]}>
                                        &nbsp;{ProductsData.Product.price}&nbsp;
                                    </Text>
                                    <Text style={[styles.price, { color: '#cc0000' }]}>{ProductsData.Product.special}</Text>
                                </Text>
                                :
                                <Text style={[styles.price, {marginHorizontal: 15}]}>{ProductsData.Product.price}</Text>
                        }

                        <View style={styles.borderLine} />
                    </View>
                                        
                    {/* <View style={styles.footerContainer}>
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
                                            this.props.CartProducts(urlGetCart, token).then(()=>{
                                                setTimeout(() => {
                                                    this.setState({ DoneCart: false });
                                                }, 2000);
                                            })                                            
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
                                        this.props.CartProducts(urlGetCart, token).then(()=>{
                                            setTimeout(() => {
                                                this.setState({ DoneCart: false });
                                            }, 2000);
                                        });

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
                    </View> */}
                </View>
            )
        }
    }
    // Option 
    _getOptionGroup(){
        const { ProductsData } = this.props;  
        if(ProductsData){                        
            const optionGroup = ProductsData.Product.product_options;
            console.log(optionGroup.length);            
            let optionValues = [];    
            for (let i = 0; i < optionGroup.length; i++) {
                if (i == 0) {
                    val = this.state.selected;                    
                } else if (i == 1) {
                    val = this.state.selectedTwo;
                }
                else if (i == 2) {
                    val = this.state.selectedThree;
                } else if (i == 3) {
                    val = this.state.selectedFour;
                }
                optionValues.push(
                    <View>
                        <Text style={styles.optionsGroupLabel}>
                            {optionGroup[i].name}
                            {(optionGroup[i].required == 1)? <Text style={{color: '#cc0000'}}> * </Text>: null}
                        </Text>
                        <Picker
                            note
                            mode="dropdown"
                            style={{ width: 130, backgroundColor: "#f0f0f0"}}
                            // selectedValue={this.state.selected}
                            selectedValue={val}
                            // onValueChange={this.onValueChange.bind(this)}                        
                            onValueChange={(value, key) => {
                                // this.onValueChange(value, i, optionGroup[i].required);
                                console.log(key)
                                if(optionGroup[i].option_value && value != 0 ){
                                    console.log(optionGroup[i].product_option_id); // General Id Option.
                                    console.log(optionGroup[i].option_value[key - 1]); // Json Of Option Choose.
                                    console.log(value); //Number For Option Id.

                                    const ProductOptionId = optionGroup[i].product_option_id;
                                    const PriceVal = optionGroup[i].option_value[key - 1].price;
                                    const PricePrefixVal = optionGroup[i].option_value[key - 1].price_prefix;
                                    const ProductChildOptionId = optionGroup[i].option_value[key - 1].product_option_value_id;
                                    const OptionImage = optionGroup[i].option_value[key - 1].image;
                                    // Check Price To Increase
                                    if(PriceVal){
                                        console.log(PricePrefixVal + PriceVal + this.props.product.price);
                                        if(PricePrefixVal == "+"){
                                            //--/\.00|\D/g  .. /\D/g
                                            const sum = parseInt(this.props.product.price.replace(/\.00|\D/g,'')) + parseInt(PriceVal.replace(/\.00|\D/g,'')) ;
                                            console.log(sum);
                                            this.setState({PriceChanged: sum})
                                        }else{
                                            const min = parseInt(this.props.product.price.replace(/\.00|\D/g,'')) - parseInt(PriceVal.replace(/\.00|\D/g,'')) ;
                                            console.log(min);
                                            this.setState({PriceChanged: min})
                                        }
                                    }else{
                                        this.setState({PriceChanged: 0})
                                    }                        
                                    //Send Option To Cart {ProductOptionId:ProductChildOptionId}
                                    const SingleValueOption = " { \" " + ProductOptionId + " \" : \" "+ ProductChildOptionId + " \" }";
                                    this.onValueChange(value, SingleValueOption, i, optionGroup[i].required);
                                    //Change Image For Option 
                                    if(OptionImage){
                                        this.setState({optionImage: OptionImage})
                                        console.log(OptionImage);
                                    }
                                    console.log(OptionImage);
                                }                            
                            }}
                            key={i}
                        >                        
                            <Picker.Item label='...' value = {0} />
                            {
                                (!optionGroup[i].option_value)? 
                                    null:
                                    optionGroup[i].option_value.map((data, key) => {
                                    return (
                                        // <Picker.Item label={data.name} value={data} key={key} />
                                        <Picker.Item label={data.name} value={data.option_value_id} key={key} />
                                    );
                                })
                            }
                        </Picker>
                    </View>
                )
            }    
            return (
                <View>
                    <View style={styles.singleOptionRootContainer}>                        
                            <View children={optionValues} 
                                //== "ar"? {width: 130 ,direction: 'rtl'} : {width: 130}}
                            >
                            </View>                                          
                    </View>

                </View>
            );
        }
    };    
    //End Option
    // AddToCart
    _CkeckAddCartPage = () =>{   
        const { ProductsData , onCancelPress} = this.props;  
        const parametersurl = ExpandStores.UrlStore + RoutesApi.AddToCart;
        const token = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.
        const urlGetCart = ExpandStores.UrlStore + RoutesApi.CartProducts;// Link Get Products Cart
        const productId = ProductsData.Product.product_id;

        console.log(this.state.selectedReq + '  ' +this.state.valselected)
        console.log(ProductsData.Product.product_options + '  ' +this.state.selected)
        if(ProductsData.Product.product_options.length >= 1 && !this.state.selected){
            
            Alert.alert(strings.emptyOptions)
        }else if(ProductsData.Product.product_options.length >= 2 && !this.state.selectedTwo){            
            
            Alert.alert(strings.emptyOptions)
        }else if(ProductsData.Product.product_options.length >= 3 && !this.state.selectedThree){
            
            Alert.alert(strings.emptyOptions)
        }else if(ProductsData.Product.product_options.length >= 4 && !this.state.selectedfour){
            
            Alert.alert(strings.emptyOptions)
        }else{
            if(this.state.valselectedfour){
                const optionValue = 
                "{" + 
                this.state.valselected.replace(new RegExp("[{}]", "g"), "")                
                + "," + 
                this.state.valselectedTwo.replace(new RegExp("[{}]", "g"), "")
                + "," + 
                this.state.valselectedThree.replace(new RegExp("[{}]", "g"), "")
                + ","  
                this.state.valselectedfour.replace(new RegExp("[{}]", "g"), "")
                + "}";   

                if(optionValue){
                    optionValue = JSON.parse(optionValue)
                }                
                token.then((token)=>{
                    this.props.AddToCart(parametersurl, token, productId, this.state.quantity, optionValue);
                    this.setState({
                        DoneCart: true
                    });
                    // Refresh Data Products Cart
                    this.props.CartProducts(urlGetCart, token).then(()=>{
                        setTimeout(() => {
                            this.setState({ DoneCart: false });
                        }, 500);
                        this.props.navigation.navigate('ShoppingBag');
                    })
                })

            }else if(this.state.valselectedThree){
                const optionValue = 
                "{" + 
                this.state.valselected.replace(new RegExp("[{}]", "g"), "")                
                + "," + 
                this.state.valselectedTwo.replace(new RegExp("[{}]", "g"), "")
                + "," + 
                this.state.valselectedThree.replace(new RegExp("[{}]", "g"), "")
                + "}"; 

                if(optionValue){
                    optionValue = JSON.parse(optionValue)
                }
                //this.props.addToCart(this.props.product.product_id , this.state.quantity , optionValue);
                token.then((token)=>{
                    this.props.AddToCart(parametersurl, token, productId, this.state.quantity, optionValue);
                    this.setState({
                        DoneCart: true
                    });
                    // Refresh Data Products Cart
                    this.props.CartProducts(urlGetCart, token).then(()=>{
                        setTimeout(() => {
                            this.setState({ DoneCart: false });
                        }, 500);
                        this.props.navigation.navigate('ShoppingBag');
                    })
                })

            }else if(this.state.valselectedTwo){                
                var optionValue = 
                "{" + 
                this.state.valselected.replace(new RegExp("[{}]", "g"), "")                
                + "," + 
                this.state.valselectedTwo.replace(new RegExp("[{}]", "g"), "")
                + "}";   
                
                if(optionValue){
                    optionValue = JSON.parse(optionValue)
                }
                token.then((token)=>{
                    this.props.AddToCart(parametersurl, token, productId, this.state.quantity, optionValue);
                    this.setState({
                        DoneCart: true
                    });
                    // Refresh Data Products Cart
                    this.props.CartProducts(urlGetCart, token).then(()=>{
                        setTimeout(() => {
                            this.setState({ DoneCart: false });
                        }, 500);
                        this.props.navigation.navigate('ShoppingBag');
                    })
                })

            }else{
                    var optionValue =  this.state.valselected;
                    if(optionValue){
                        optionValue = JSON.parse(optionValue)
                    }
                    token.then((token)=>{
                        this.props.AddToCart(parametersurl, token, productId, this.state.quantity, optionValue);
                        this.setState({
                            DoneCart: true
                        });
                        // Refresh Data Products Cart
                        this.props.CartProducts(urlGetCart, token).then(()=>{
                            setTimeout(() => {
                                this.setState({ DoneCart: false });
                                onCancelPress();
                            }, 500);
                            this.props.navigation.navigate('ShoppingBag');
                        })                                                
                    })                
                }
            }                      
        }            
    //End Add ToCart

    render() {
        const { visible, onCancelPress, ProductsData } = this.props;         
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
                deviceHeight={deviceHeight}
                // scrollOffset={1200}
                propagateSwipe={true}>
                <ScrollView>
                {/* style={styles.transparentContainer} */}
                    <View style={{backgroundColor:'#fff'}}>                                    
                        <StatusBar
                            backgroundColor='rgba(0,0,0,0.5)'
                            barStyle='dark-content' />
                            {/* style={styles.viewContainer} */}
                        <View style={styles.viewContainer}>
                            {this._ProductData()}
                        </View>
                        {/* New Option */}                        
                        <View style={[styles.productOptionsSection, {marginHorizontal: 15}]}>                            
                            {this._getOptionGroup()}
                            {/* <View style={styles.borderLine} /> */}
                        </View>                   
                        {/* End New Option */} 
                        {
                            (ProductsData)?                            
                            <View style={styles.footerContainer}>
                                <FooterButton
                                    onPress={() => {this._CkeckAddCartPage()}}
                                    footerContainerStyle={[styles.addToBagContainerStyle,{padding: 10}]}
                                    footerTitleStyle={{
                                        color: "white",
                                        fontFamily: AppStyles.fontFamily.regularFont
                                    }}
                                    title={strings.addtobag} />
                                <View style={styles.buttonSpace} />                        
                            </View>
                            :null
                        }                      
                    </View>   
                </ScrollView>                
            </Modal>
        );
    }

}

function mapStateToProps(state) {
    return {
        ProductsData: state.ProductInfo
    }
}
export default connect(mapStateToProps, actionCreatores)(withNavigation(ProductDetailModal));
// export default ProductDetailModal;
