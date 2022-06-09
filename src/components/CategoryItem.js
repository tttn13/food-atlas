import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../assets/colors/colors";
import { elevation } from "../common/styles";
import CustomText from "./CustomText";

export default function CategoryItem({
  name,
  imageUrl,
  index,
  active,
  handlePress,
}) {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          styles.container,
          styles.elevation,
          index === 0 ? { marginLeft: 25 } : { marginLeft: 10 },
          active
            ? { backgroundColor: colors.buttonColor }
            : { backgroundColor: "white" },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={imageUrl} style={styles.image} />
        </View>
        
        <CustomText textStyle="bold" style={{fontSize: 15}}>{name}</CustomText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 100,
    borderRadius: 50,
    marginVertical: 15,
    marginHorizontal: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  elevation,
  image: {
    width: 35,
    height: 35,
  },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginBottom: 5,
  },
  
});
