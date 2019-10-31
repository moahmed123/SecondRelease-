import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Button,TextInput, Text} from "react-native";
import { connect } from "react-redux";
import UUIDGenerator from "react-native-uuid-generator";
import { updatePricesByQty } from "../../utils/updatePricesByQty";
import ProductGrid from "../ProductGrid/ProductGrid";
import ProductDetailModal from "../Modals/ProductDetailModal/ProductDetailModal";
import styles from "./styles";



import * as actionCreatores from '../../action';
//Connect Url 
import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";
import SearchBar from "react-native-search-box";


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isProductDetailVisible: false,
            product: {},
            SearchData: ''
        };
    }
    _DataOfSearch(){
        const {SearchData} = this.props 
        if(SearchData){
            console.log(SearchData);            
            if(SearchData.Products.length > 0){
                return (
                    <ProductGrid
                        products={SearchData.Products}
                        itemContainerStyle={{ alignItems: "center" }}                        
                        />
                )            
            }else{
                return <Text style={{width: '100%', textAlign: 'center', paddingTop: 30}}> no Product for this name  </Text>;
            }
        }else{
            return <Text style={{width: '100%', textAlign: 'center', paddingTop: 150, color: '#ddd'}}>  Please enter the name of product  </Text>;
        }
    }
    render() {
        const { extraData } = this.props;

        return (
            <View style={styles.container}>
                <SearchBar
                    backgroundColor={"transparent"}
                    cancelTitle={"Cancel"}
                    onChangeText={text => {                                                        
                        this.setState({SearchData: text});
                        const parametersurl = ExpandStores.UrlStore + RoutesApi.CategoryProducts;
                        const token = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.

                        token.then((Token) => {                                                        
                            this.props.Search( parametersurl, Token, text)
                        })
                    }}                            
                    cancelButtonTextStyle={styles.cancelButtonText}
                    inputBorderRadius={9}
                    inputStyle={styles.searchInput} 
                />
                {/* <Button
                    title="Go" 
                    color="#f194ff"
                    containerStyle={styles.Button}
                    onPress={() =>{
                        const parametersurl = ExpandStores.UrlStore + RoutesApi.CategoryProducts;
                        const token = deviceStorage.getUserData("Token"); //Get Token In deviceStorage.

                        token.then((Token) => {                                                        
                            this.props.Search( parametersurl, Token, this.state.SearchData)
                        })
                    }}                    
                /> */}
                {this._DataOfSearch()}                                
            </View>
        );
    }
}

// Search.propTypes = {
//     title: PropTypes.string,
//     products: PropTypes.array,
//     SearchScreen: PropTypes.array,
//     navigation: PropTypes.func,
//     extraData: PropTypes.object,
//     productPricesByQty: PropTypes.array
// };

// const mapStateToProps = ({ products }) => {
//     return {
//         productPricesByQty: products.productPricesByQty
//     };
// };
function mapStateToProps(state) {
    return {
        SearchData: state.Search
    }
}
export default connect(mapStateToProps, actionCreatores)(Search);
