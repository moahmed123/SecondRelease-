import { StyleSheet ,Dimensions} from "react-native";
import AppStyles from "../../AppStyles";

const { width, height } = Dimensions.get("window");


const styles = StyleSheet.create({
    productContainer: {
        width: "95%",
        height: 0.11 * height,
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 5
      },
    productDescriptionContainer: {
        flex: 5,
        justifyContent: "center",
        alignItems: "flex-start"
      },
      productDescription: {
        color: AppStyles.colorSet.mainSubtextColor,
        fontFamily: AppStyles.fontFamily.semiBoldFont,
        paddingLeft: 10
      },
});

export default styles;
