import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import CustomText from "./CustomText";

function RestaurantItem({ restaurant, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Restaurant", { id: restaurant.id })}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: restaurant.image_url }} />
        <View style={styles.infoContainer}>
        <CustomText textStyle="bold" style={{ marginBottom: 4 }}>{restaurant.name}</CustomText>
          <View style={styles.info}>
            <CustomText textStyle="medium" style={styles.rating}>{restaurant.rating} stars</CustomText>
            <CustomText style={styles.money}>{restaurant.price}</CustomText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    height: 100,
    borderRadius: 500,
    shadowOffset: { width: 1, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    elevation: 3,
    backgroundColor: "white",
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 400,
    marginLeft: 10,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    marginBottom: 4,
  },
  info: {
    fontWeight: "bold",
    flexDirection: "row",
  },
  rating: {
    paddingRight: 5,
  },
  money: {
    color: "gold",
  },
});
export default withNavigation(RestaurantItem);
