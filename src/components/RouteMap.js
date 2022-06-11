import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
  
const RouteMap = ({  destination }) => {
  const initRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
  return (
    <View style={[styles.mapContainer]}>
      <MapView
        // provider={PROVIDER_GOOGLE}
        style={styles.map}
        region = {initRegion}
      >
        <Marker coordinate={destination} />
      </MapView>
    </View>
  );
};

export default RouteMap;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 4,
  },
});
