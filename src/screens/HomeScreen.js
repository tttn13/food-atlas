import { useRef, useMemo, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CustomText from "../components/CustomText"
import Header from "../components/Header";
import Search from "../components/Search";
import Categories from "../components/Categories";
import useRestaurants from "../hooks/useRestaurants";
import Restaurants from "../components/Restaurants";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";
import { AntDesign } from "@expo/vector-icons";
import { verticalStaticData, commonCategories } from "../common/data";
import { sortData } from "../../utils";

export default function HomeScreen() {
  const [term, setTerm] = useState("Burger");
  const [{ data, region, loading }, searchRestaurants] = useRestaurants(term);
  const [currData, setCurrData] = useState(data ? data : []);
  const bottomSheetModalRef = useRef(null);
  const [sorts, setSorts] = useState(null);
  const snapPoints = useMemo(() => ["30%"], []);
  const openModal = () => {
    bottomSheetModalRef.current?.present();
  };

  useEffect(() => {
    searchRestaurants(term);
  }, [term]);

  useEffect(() => {
    setCurrData(data);
  }, [data]);

  useEffect(() => {
    if (data && sorts) {
      const sorted = sortData(data,sorts,currData)
      setCurrData(sorted);
    }
  }, [data,sorts]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaView>
            <Header />
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              style={styles.bottomSheet}
            >
              <View style={styles.contentContainer}>
                <View style={styles.modalHeaderWrapper}>
                  <CustomText textStyle="bold"> Sort results by </CustomText>
                  <TouchableOpacity
                    onPress={() => {
                      setSorts(null);
                      bottomSheetModalRef.current?.dismiss();
                    }}
                  >
                    <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>

                <BouncyCheckboxGroup
                  data={verticalStaticData}
                  style={{ flexDirection: "column" }}
                  onChange={(selectedItem: ICheckboxButton) => {
                    setSorts(selectedItem);
                  }}
                />
              </View>
            </BottomSheetModal>

            <Search setTerm={setTerm} />
            <Categories
              categories={commonCategories}
              setTerm={setTerm}
              term={term}
            />
            {data && (
              <Restaurants
                data={data}
                region={region}
                loading={loading}
                openModal={openModal}
              />
            )}
            <StatusBar hidden={true} />
          </SafeAreaView>
        </ScrollView>
      </View>
    </BottomSheetModalProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(253,253,253)",
  },
  header1: {
    fontSize: 35,
    marginTop: 60,
    marginHorizontal: 25,
  },
  header2: {
    fontSize: 40,
    marginHorizontal: 25,
    fontWeight: "bold",
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalHeaderWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
