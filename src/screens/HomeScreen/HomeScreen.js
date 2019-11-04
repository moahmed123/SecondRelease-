import PropTypes from "prop-types";
import React, { Component} from "react";
import { ScrollView, I18nManager, AsyncStorage, RefreshControl } from 'react-native'
import { connect } from "react-redux";
// import Home from "../../components/Home/Home";

//Call Action And Get Home Page Data && Page Home Page 
import * as actionCreatores from '../../action';
import Categories from "./../../components/Home/Categories";
import Hotdeals from "./../../components/Home/NewArrivals";
import Featured from "./../../components/Home/Featured";
import Banner from "./../../components/Home/Banner";
import Slider from "./../../components/Home/Slider";
// import strings from '../../ExpandStores/LocalizedStrings';

import ExpandStores from '../../ExpandStores/ExpandStores';
import RoutesApi from '../../ExpandStores/RoutesApi';
import deviceStorage from "../../utils/deviceStorage";

import { StackActions, NavigationActions } from 'react-navigation';

class HomeScreen extends Component {
    // static propTypes = {
    //     navigation: PropTypes.object.isRequired
    //   };
    constructor(props) {
        super(props);
        this.state={
            loading: false
        }
    }
    componentDidMount(){
        // let urlHomeStore = ExpandStores.UrlStore + RoutesApi.Home;
        // let Token = deviceStorage.getUserData("Token");          
        // // Url To Home Store        
        // Token.then((token)=>{
        //     this.props.HomeStore(urlHomeStore, token);  
        // })  
        // if(this.props.Settings){
        //     console.log(this.props.Settings);
        // }
        const dataJson = AsyncStorage.getItem('AppLanguage');
        dataJson.then((data)=>{
            if(data == 'ar'){
                if(I18nManager.isRTL != true){
                    I18nManager.forceRTL(true);
                    // strings.setLanguage('en');
                    // RNRestart.Restart();
                    // Restart App                                        
                    // const resetAction = StackActions.reset({
                    // index: 0,
                    // actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
                    // });
                    // this.props.navigation.dispatch(resetAction); 
                }  
            }else{
                if(I18nManager.isRTL == true){
                    I18nManager.forceRTL(false);
                    // strings.setLanguage('ar');
                    // RNRestart.Restart();
                    // Restart App                                        
                    // const resetAction = StackActions.reset({
                    // index: 0,
                    // actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
                    // });
                    // this.props.navigation.dispatch(resetAction); 
                }
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
    _renderHomePage(){
        const { homeData } = this.props;
        if (homeData) {            
            return homeData.Sections.map((home_Data, i) => {
                switch (home_Data.SectionCodeName) {
                    case "slider":
                        return <Slider key = {"slider" + i} dataSource={home_Data.Collections} />;
                        // return <Text key = {"slider" + i}>slider</Text>
                    case "hotdeals":
                        return <Hotdeals key = {"hotdeals" + i} dataSource = {home_Data.products} title = {home_Data.title} />;                        
                    case "featuredproducts":
                        return <Featured key = {"featuredproducts" + i} featuredProducts={home_Data.products} title = {home_Data.title} />;                    
                        // return <Text key = {i}>featuredproducts</Text>
                    case "featuredcategories":
                        return <Categories key = {"featuredcategories" + i} categories={home_Data.categories} navigation={this.props.navigation}/>;
                        
                    case "specialcategories":
                        return <Categories key = {"specialcategories" + i} categories={home_Data.categories} />;
                        
                    case "oneimagebanner":
                        return <Banner key = {"oneimagebanner1" + i} dataBanner={home_Data.bannerimage} title = {home_Data.title} secondeDataBanner = {null}/>;
                        // return <Text key = {i}>oneimagebanner</Text>

                    case "twoimagebanner":
                        return  <Banner key = {"oneimagebanner2" + i} dataBanner={home_Data.firstbannerimage} title = {home_Data.title} secondeDataBanner = {home_Data.secondbannerimage}/>;
                        // return <Text key = {i}>twoimagebanner</Text>
                    default:
                        console.log("new section with name : " + home_Data.SectionCodeName);
                    // return <Text>{homeSection.SectionCodeName } Should Be Build</Text>
                }

            })
        }
    }
    _refresh(){        
        this.setState({loading: true});
        // Refresh Data
        let urlHomeStore = ExpandStores.UrlStore + RoutesApi.Home;
        let Token = deviceStorage.getUserData("Token");          
        // Url To Home Store        
        Token.then((token)=>{
            // Call Home Page Api.
            this.props.HomeStore(urlHomeStore, token).then(()=>{
                this.setState({loading: false});
            })                          
        }) 
    }
    render() {
        return (
            <ScrollView 
                style={{marginBottom: 15}}
                refreshControl={
                    <RefreshControl
                      refreshing = {this.state.loading}
                      onRefresh  = {() => this._refresh()}
                      tintColor  = "#dceafd"
                      titleColor = "#dceafd"
                    />
                  }
            >
                {this._renderHomePage()}
            </ScrollView>    
        );
    }
}
function mapStateToProps(state) {
    return {
        homeData: state.homeStore,
        // Settings: state.Settingsitem
    }
}
export default connect(mapStateToProps, actionCreatores)(HomeScreen);
