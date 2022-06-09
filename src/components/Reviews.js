import {
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import CustomText from "./CustomText";
import ReviewItem from "./ReviewItem";

export default function Reviews({ data, loading }) {
  if (loading)
    return <ActivityIndicator size="large" marginVertical={30} />;

  return (
    <View style={styles.container}>
      <CustomText textStyle="bold" style={styles.header}>Recomended Reviews</CustomText>
      {data && data.map((item, idx) => <ReviewItem key={idx} review={item} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },
});
