import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text, ScrollView } from 'react-native'
import { connect } from "react-redux";
import Home from "../../components/Home/Home";

//Call Action And Get Home Page Data && Page Home Page 
import * as actionCreatores from '../../action';
import Categories from "./../../components/Home/Categories";
import Hotdeals from "./../../components/Home/NewArrivals";
import Featured from "./../../components/Home/Featured";
import Banner from "./../../components/Home/Banner";
import Slider from "./../../components/Home/Slider";

class HomeScreen extends Component {
    constructor(props) {
        super(props);
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
                        // return <BestSellers key = {"featuredproducts" + i} featuredProducts={home_Data.products} title = {home_Data.title} />;
                        // return <Text key = {i}>featuredproducts</Text>
                    case "featuredcategories":
                        return <Categories key = {"featuredcategories" + i} categories={home_Data.categories} />;
                        
                    case "specialcategories":
                        return <Categories key = {"specialcategories" + i} categories={home_Data.categories} />;
                        
                    case "oneimagebanner":
                        return <Banner key = {"oneimagebanner" + i} dataBanner={home_Data.bannerimage} title = {home_Data.title} />;
                        // return <Text key = {i}>oneimagebanner</Text>

                    case "twoimagebanner":
                        // return <ImageBanner key = {"oneimagebanner" + i} content={homeSection} />;
                        return <Text key = {i}>twoimagebanner</Text>
                    default:
                        console.log("new section with name : " + home_Data.SectionCodeName);
                    // return <Text>{homeSection.SectionCodeName } Should Be Build</Text>
                }

            })
        }
    }
    render() {
        return (
            <ScrollView style={{marginBottom: 15}}>
                {this._renderHomePage()}
            </ScrollView>    
        );
    }
}
function mapStateToProps(state) {
    return {
        homeData: state.homeStore
    }
}
export default connect(mapStateToProps, actionCreatores)(HomeScreen);
