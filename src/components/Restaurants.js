import { StyleSheet, View, ActivityIndicator } from "react-native";
import RestaurantItem from "./RetaurantItem";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import CustomText from "./CustomText";

export default function Restaurants({ data, region, loading, openModal }) {
  if (loading)
    return <ActivityIndicator size="large" marginVertical={30} />;
   
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <CustomText textStyle="bold" style={{fontSize: 20, paddingBottom: 10}} >Top Restaurants</CustomText>
        <Ionicons
          name="filter"
          size={24}
          color={colors.textLight}
          onPress={openModal}
        />
      </View>

      {data.map((item, idx) => (
        <RestaurantItem key={idx} restaurant={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    marginVertical: 15,
    flex: 1,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "red",
  },
});
