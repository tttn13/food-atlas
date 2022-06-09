import { View, StyleSheet } from "react-native";
import CustomText from "./CustomText";

export default function Header() {
  return (
    <View style={styles.container}>
      <CustomText textStyle="semiBold" style={{ fontSize: 35 }}>Grab your</CustomText>
      <CustomText textStyle="bold" style={{ fontSize: 40 }}>delicous meal!</CustomText>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 25,
  },
});
