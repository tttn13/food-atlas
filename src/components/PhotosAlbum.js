import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

export default function PhotosAlbum({ photosData }) {
  const dimensions = Dimensions.get("window");
  const imageHeight = Math.round((dimensions.width * 9) / 25);
  const imageWidth = dimensions.width/2;
  return (
      <FlatList
        data={photosData}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return (
              <View style={styles.imageWrapper}> 
                <Image
                style={{ height: imageHeight, width: imageWidth }}
                source={{ uri: item }}
                resizeMode="cover"
                />
            </View>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
  );
}
const styles = StyleSheet.create({
    imageWrapper: {
      paddingRight: 20
    }
})