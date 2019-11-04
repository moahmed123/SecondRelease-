import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image
} from "react-native";
import Strings from '../../ExpandStores/LocalizedStrings';
import styles from "./styles";

export default class OrderCard extends Component {
    getTotalPrice = products => {
        const pricesArray = [];

        products.map(product => {
            pricesArray.push(product.price);
        });

        let totalPrice = 0;

        if (pricesArray.length) {
            totalPrice = pricesArray
                .reduce((accumulator, currentValue) => accumulator + currentValue)
                .toFixed(2);
        }

        return totalPrice;
    };

    renderProductItem = item => (
        <View style={styles.productContainer}>
            <View style={styles.productImageContainer}>
                <Image
                    source={{ uri: item.photo }}
                    style={styles.productImage}
                    resizeMode='cover' />
            </View>
            <View style={styles.productDescriptionContainer}>
                <Text style={styles.productDescription}>{item.name}</Text>
            </View>
        </View>
    );

    renderCardFooter = order => (
        <View style={styles.footerContainer}>
            <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPrice}>
                  {Strings.formatString(Strings.components.orderCard.totalPrice, this.getTotalPrice(order.shopertino_products))}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => this.props.onReOrder(order)}
                style={styles.actionContainer}>
                <Text style={styles.action}>{Strings.components.orderCard.reorder}</Text>
            </TouchableOpacity>
            <View style={styles.blankContainer} />
        </View>
    );

    render() {
        const { cardConainerStyle, order } = this.props;
        // const options = { month: "short", day: "numeric" };
        // const orderedDate = new Date(order.createdAt.seconds * 1000);
        // const formattedDate = orderedDate.toLocaleDateString("eng-ENG", options);

        return (
            <View style={[styles.OrderCardConainer, cardConainerStyle]}>
                {/* <ImageBackground
                    source={{ uri: order.shopertino_products[0].photo }}
                    style={styles.imageBackgroundContainer}
                    imageStyle={styles.imageBackground}
                    resizeMode='cover'>
                    <View style={styles.orderStatusContainer}>
                        <View style={styles.statusContainer}>
                            <Text style={styles.status}>{"Order Placed"}</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.date}>{`Ordered on ${formattedDate}`}</Text>
                        </View>
                    </View>
                </ImageBackground> */}
                {/* {order.map((item, index) => (
                    <View key={item.id}>
                        {this.renderProductItem(item)}
                        {order.shopertino_products.length - 1 == index &&
                            this.renderCardFooter(order)}
                    </View>
                ))} */}
                <View style={styles.productContainer}>
                    <View style={styles.productDescriptionContainer}>
                        <Text style={styles.productDescription}>{order.name}</Text>
                    </View>
                    <View style={styles.productDescriptionContainer}>
                        <Text style={styles.productDescription}>{order.products}</Text>
                    </View>
                    <View style={styles.productDescriptionContainer}>
                        <Text style={styles.productDescription}>{order.status}</Text>
                    </View>
                    <View style={styles.productDescriptionContainer}>
                        <Text style={styles.productDescription}>{order.total}</Text>
                    </View>

                </View>
            </View>
        );
    }
}

OrderCard.propTypes = {
    onReOrder: PropTypes.func,
    cardConainerStyle: PropTypes.object,
    order: PropTypes.object
};

{
    /* <View style={styles.footerContainer}>
    <View style={styles.priceContainer}>
      <Text style={styles.price}>Total: $462.90</Text>
    </View>
    <TouchableOpacity style={styles.actionContainer}>
      <Text style={styles.action}>REORDER</Text>
    </TouchableOpacity>
    <View style={styles.blankContainer} />
  </View> */
}
