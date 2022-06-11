import {
  View,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import colors from "../assets/colors/colors";
import CustomText from "./CustomText";

function ReviewItem({ review }) {
  const url = review.user.image_url==null ? "https://cdn-icons-png.flaticon.com/512/747/747376.png" : review.user.image_url

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: url}} />
      <View style={styles.infoContainer}>
        
        <CustomText textStyle="semiBold" style={styles.header}>{review.user.name}</CustomText>
        <CustomText textStyle="regular" style={styles.content}>{review.text}</CustomText>
        <TouchableOpacity onPress={() => Linking.openURL(`${review.url}`)}>
          <CustomText textStyle="regular" style={styles.moreContent}>Read more</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    height: 100,
    shadowOffset: { width: -2, height: -4 },
    shadowRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    borderRadius: 500,
    elevation: 3,
    backgroundColor: "white",
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 400,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    marginBottom: 2,
  },
  content: {
    marginRight: 10,
  },
  moreContent: {
    color: "blue",
    fontSize: 10,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.lighterText,
  },
});
export default ReviewItem;
