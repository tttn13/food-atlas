import { useRef, useMemo, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Button,
  Linking,
  Share,
  ActivityIndicator,
  StatusBar
} from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import * as Clipboard from "expo-clipboard";
import useRestaurant from "../hooks/useRestaurant";
import Reviews from "../components/Reviews";
import {
  Ionicons,
  AntDesign,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  Fontisto,
  Octicons,
} from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import PhotosAlbum from "../components/PhotosAlbum";
import RouteMap from "../components/RouteMap";
import { buildQuery, checkClosed, convertTime, formatUrl } from "../../utils";
import CustomText from "../components/CustomText";

export default function RestaurantScreen({ navigation }) {
  const id = navigation.getParam("id");
  const [{ data, loading, error }, searchRestaurant, reviews, fetchReviews] =
    useRestaurant();
  const [favorite, setFavorite] = useState(false);
  const [photoLayout, setPhotoLayout] = useState(null);
  const [infoLayout, setInfoLayout] = useState(null);
  const [reviewLayout, setReviewLayout] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [moreAmenities, setMoreAmenities] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef2 = useRef(null);
  const ref = useRef();
  const snapPoints = useMemo(() => ["18%"], []);
  const snapPoints2 = useMemo(() => ["25%"], []);
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(data?.url);
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  const restaurantRating =
    data?.rating.toString().length == 1
      ? [data?.rating.toString()]
      : data?.rating.toString().split(".");

  const renderStars = (ratings, shape) => {
    if (shape == "full") {
      const firstHalf = parseInt(ratings[0]);
      return [...Array(firstHalf)].map((e, i) => (
        <Fontisto key={i} name="star" size={18} color={colors.buttonColor} />
      ));
    } else {
      const secondHalf = ratings.length > 1 ? ratings[1] : null;
      if (secondHalf) {
        return (
          <Fontisto name="star-half" size={18} color={colors.buttonColor} />
        );
      }
    }
  };

  const scrollHandler = (layout) => {
    ref.current?.scrollTo({
      x: layout.x,
      y: layout.y,
      animated: true,
    });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: data?.name,
        url: formatUrl(data?.url),
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleQuestion = (answer) => {
    setAnswered(true);
  };

  const openGoogleMapApp = () => {
    const place = {
      name: buildQuery(data?.name),
      city: buildQuery(data?.location.city),
      state: buildQuery(data?.location.state),
      country: buildQuery(data?.location.country),
    };
    const queryTerm = `${place?.name}%2C+${place?.city}%2C+${place?.state}%2C+${place?.country}`;
    const url = "https://www.google.com/maps/search/?api=1&query=" + queryTerm;
    Linking.openURL(`${url}`);
  };

  const renderCategory = (cate) => {
    const slicedCate = cate.slice(0, 3);
    let comma = "";
    return slicedCate.map((i, idx) => {
      idx !== slicedCate.length - 1 ? (comma = ", ") : (comma = "");
      return (
        <CustomText textStyle='medium' key={idx}>
          {i.title}
          {comma}
        </CustomText>
      );
    });
  };

  useEffect(() => {
    searchRestaurant(id);
    fetchReviews(id);
  }, [id]);

  useEffect(() => {
    let timer = setTimeout(() => setToastVisible(false), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [toastVisible]);
  
  if (!data || loading || error) {
    return (<ActivityIndicator
      visible={loading}
      textContent={"Loading..."}
      textStyle={{ color: colors.textLight }}
    />)
  }
  return (
    <RootSiblingParent>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            ref={ref}
          >
            <SafeAreaView>
              <ImageBackground
                source={{uri: `${data?.image_url}`}}
                resizeMode="cover"
                style={styles.imageBackground}
              >
                <View style={styles.headerWrapper}>
                  <View style={styles.headerTop}>
                    <View style={styles.headerLeft}>
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather
                          name="chevron-left"
                          size={24}
                          color={colors.white}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.headerRight}>
                      <TouchableOpacity onPress={() => setFavorite(!favorite)}>
                        {favorite ? (
                          <MaterialIcons
                            name="favorite"
                            size={24}
                            color="red"
                          />
                        ) : (
                          <MaterialIcons
                            name="favorite-outline"
                            size={24}
                            color="white"
                          />
                        )}
                      </TouchableOpacity>

                      <TouchableOpacity onPress={onShare}>
                        <Feather name="share" size={24} color="white" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => bottomSheetModalRef.current?.present()}
                      >
                        <Feather
                          name="more-horizontal"
                          size={24}
                          color="white"
                        />
                      </TouchableOpacity>

                      <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={0}
                        snapPoints={snapPoints}
                        style={styles.bottomSheet}
                      >
                        <TouchableOpacity style={styles.moreInfoOption}>
                          <Button
                            title="Favorite Business"
                            onPress={() => setFavorite(!favorite)}
                          />
                          <View style={styles.divider} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Button
                            style={styles.moreInfoOption}
                            title="Share Business"
                            onPress={onShare}
                          />
                          <View style={styles.divider} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Button
                            style={styles.moreInfoOption}
                            title="Cancel"
                            onPress={() => bottomSheetModalRef.current?.dismiss()}
                          />
                        </TouchableOpacity>
                      </BottomSheetModal>
                    </View>
                  </View>

                  <View style={styles.bottom}>
                    {data && (
                      <CustomText textStyle='bold' style={styles.headerText}>{data.name} </CustomText>
                    )}
                    <View style={styles.rating}>
                      <TouchableOpacity
                        style={{flexDirection: "row"}}
                        onPress={() => scrollHandler(reviewLayout)}
                      >
                        {restaurantRating &&
                          renderStars(restaurantRating, "full")}
                        {restaurantRating &&
                          renderStars(restaurantRating, "half")}
                        <CustomText textStyle='medium' style={{ color: "white", paddingLeft: 5 }}>
                          {data?.review_count ? data.review_count : ""}{" "}
                        </CustomText>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => scrollHandler(photoLayout)}
                      >
                        <CustomText textStyle='regular' style={{ color: "white" }}>
                          See all {data?.photos.length} photos
                        </CustomText>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ImageBackground>

              <View style={styles.restaurantInfoWrapper}>
                <View style={styles.restaurantInfo}>
                  <View style={styles.infoLine}>
                    <CustomText textStyle='medium'>{data?.price ? data.price + " • " : ""}</CustomText>
                    {data && renderCategory(data?.categories)}
                  </View>
                  <View style={styles.infoLine}>
                    {data && (
                      <CustomText
                      textStyle='medium'
                        style={{
                          color: `${
                            checkClosed(data?.hours[0].open) === "Open"
                              ? "green"
                              : "red"
                          }`,
                        }}
                      >
                        {checkClosed(data?.hours[0].open)}
                      </CustomText>
                    )}

                    {data && <CustomText textStyle='regular'> {convertTime(data?.hours[0].open)}</CustomText>}
                  </View>
                </View>

                {!data?.is_claimed && (
                  <TouchableOpacity style={styles.claimButtonWrapper}>
                    <Button title="Claim this business" />
                  </TouchableOpacity>
                )}

                <View style={styles.settings}>
                  <View style={styles.iconTitle}>
                    <TouchableOpacity
                      style={styles.iconWrapper}
                      onPress={() => {
                        Linking.openURL(`tel:${data?.display_phone}`);
                      }}
                    >
                      <Feather name="phone-call" size={24} color="black" />
                    </TouchableOpacity>
                    <CustomText textStyle='medium' style={styles.iconSubtitle}> Call </CustomText>
                  </View>

                  <View style={styles.iconTitle}>
                    <TouchableOpacity
                      style={styles.iconWrapper}
                      onPress={() => openGoogleMapApp()}
                    >
                      <Feather name="map" size={24} color="black" />
                    </TouchableOpacity>
                    <CustomText textStyle='medium' style={styles.iconSubtitle}> View map </CustomText>
                  </View>

                  <View style={styles.iconTitle}>
                    <TouchableOpacity
                      style={styles.iconWrapper}
                      onPress={() => Linking.openURL(`${data?.url}`)}
                    >
                      <Octicons name="link-external" size={24} color="black" />
                    </TouchableOpacity>
                    <CustomText textStyle='medium' style={styles.iconSubtitle}>Website</CustomText>
                  </View>

                  <View style={styles.iconTitle}>
                    <TouchableOpacity
                      style={styles.iconWrapper}
                      onPress={() => scrollHandler(infoLayout)}
                    >
                      <Feather name="info" size={24} color="black" />
                    </TouchableOpacity>
                    <CustomText textStyle='medium' style={styles.iconSubtitle}>More info</CustomText>
                  </View>
                </View>
              </View>

              <View style={styles.sectionWrapper}>
                {data && (
                  <View style={styles.mapWrapperTop}>
                    <RouteMap destination={data.coordinates} />
                  </View>
                )}

                <View style={styles.mapWrapperBottom}>
                  <View style={styles.tripInfoWrapper}>
                    <View style={styles.tripInfoSection}>
                      {data && (
                        <CustomText textStyle='medium' style={{paddingVertical: 10}}>
                          {data?.location.display_address.join(", ")}
                        </CustomText>
                      )}
                    </View>
                    <View style={styles.divider} />
                  </View>

                  <View style={styles.tripInfoWrapper}>
                    <TouchableOpacity
                      style={styles.tripInfoSection}
                      onPress={() => openGoogleMapApp()}
                    >
                      <CustomText textStyle='medium'>Get Directions</CustomText>
                      <MaterialIcons
                        name="directions"
                        size={30}
                        color={colors.textDark}
                      />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                  </View>

                  <View style={styles.tripInfoWrapper}>
                    <TouchableOpacity
                      style={styles.tripInfoSection}
                      onPress={() => {
                        Linking.openURL(`tel:${data?.display_phone}`);
                      }}
                    >
                      <View>
                        <CustomText textStyle='medium'>Call</CustomText>
                        <CustomText textStyle='regular' style={[styles.lightText, {paddingVertical: 5}]}>
                          {data?.display_phone}
                        </CustomText>
                      </View>
                      <Feather name="phone-call" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {!data?.is_claimed && (
                <View style={[styles.tripInfoSection, styles.sectionWrapper]}>
                  <View>
                    <CustomText textStyle='medium'>Do you work at this business?</CustomText>
                    <CustomText textStyle='medium' style={styles.lightText}>
                      Claim this business now
                    </CustomText>
                  </View>
                  <Feather name="check-circle" size={24} color="black" />
                </View>
              )}

              <View
                style={[styles.sectionWrapper]}
                onLayout={(event) => {
                  event.target.measure((x, y) => {
                    setInfoLayout({
                      x: x,
                      y: y,
                    });
                  });
                }}
              >
                <View>
                  <CustomText textStyle='bold' style={styles.sectionHeaderText}>Info</CustomText>
                </View>

                <View>
                  <View>
                    {data && (
                      <TouchableOpacity
                        style={styles.tripInfoSection}
                        onPress={() => Linking.openURL(`${data?.url}`)}
                      >
                        <CustomText textStyle='medium'>{formatUrl(data?.url)}</CustomText>
                        <Feather name="external-link" size={20} color="black" />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.divider} />
                </View>

                <View style={styles.sectionContent}>
                  <View style={styles.amenitiesItem}>
                    <Ionicons name="people-outline" size={24} color="black" />
                    <CustomText textStyle='medium'> Good for Groups</CustomText>
                  </View>

                  <View style={styles.amenitiesItem}>
                    <MaterialIcons name="stroller" size={24} color="black" />
                    <CustomText textStyle='medium'> Good for Kids</CustomText>
                  </View>

                  <View style={styles.amenitiesItem}>
                    <MaterialCommunityIcons
                      name="umbrella-outline"
                      size={24}
                      color="black"
                    />
                    <CustomText textStyle='medium'> Outdoor Seating</CustomText>
                  </View>
                  <View style={styles.amenitiesItem}>
                    <MaterialIcons
                      name="delivery-dining"
                      size={24}
                      color="black"
                    />
                    <CustomText textStyle='medium'> Delivery </CustomText>
                  </View>
                  {moreAmenities ? (
                    <>
                      <View style={styles.amenitiesItem}>
                        <MaterialCommunityIcons
                          name="food-takeout-box-outline"
                          size={24}
                          color="black"
                        />
                        <CustomText textStyle='medium'> Takeout</CustomText>
                      </View>

                      <View style={styles.amenitiesItem}>
                        <Feather name="check" size={24} color="black" />
                        <CustomText textStyle='medium'> Accepts Credit/Debit Cards </CustomText>
                      </View>
                      <View style={styles.amenitiesItem}>
                      <Feather name="wifi" size={24} color="black" />
                        <CustomText textStyle='medium'> Wi-Fi </CustomText>
                      </View>

                      <TouchableOpacity style={styles.claimButtonWrapper}>
                        <Button
                          title="Less info"
                          color={colors.textDark}
                          onPress={() => setMoreAmenities(!moreAmenities)}
                        >
                          </Button>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity style={styles.claimButtonWrapper}>
                      <Button
                        title="More info"
                        color={colors.textDark}
                        onPress={() => setMoreAmenities(!moreAmenities)}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={[styles.sectionWrapper]}>
                <View style={styles.sectionHeader}>
                  <CustomText textStyle='bold' style={styles.sectionHeaderText}>
                    Update the coummunity
                  </CustomText>
                  <TouchableOpacity
                    onPress={() => bottomSheetModalRef2.current?.present()}
                  >
                    <Feather name="info" size={24} color="black" />
                  </TouchableOpacity>

                  <BottomSheetModal
                    ref={bottomSheetModalRef2}
                    index={0}
                    snapPoints={snapPoints2}
                    style={styles.bottomSheet2}
                  >
                    <View style={styles.bottomSheet2Item}>
                      <CustomText textStyle='bold' style={styles.sectionHeaderText}>
                        Familiar with this business?
                      </CustomText>
                    </View>
                    <View style={styles.bottomSheet2Item}>
                      <CustomText textStyle='regular'>
                        The FoodAtlas community relies on experts like you to
                        help keep business info up-to-date.
                      </CustomText>
                    </View>
                    <TouchableOpacity
                      style={[styles.bottomSheet2Item, styles.gotItBtn]}
                    >
                      <Button
                        color="white"
                        title="Got it"
                        onPress={() => bottomSheetModalRef2.current?.dismiss()}
                      />
                    </TouchableOpacity>
                  </BottomSheetModal>
                </View>
                <View style={styles.questionnaire}>
                  <CustomText textStyle='medium'>Is this place hipster?</CustomText>
                  {answered && (
                    <View style={styles.afterAnswer}>
                      <CustomText textStyle='medium'>Thanks for your input </CustomText>
                      <MaterialIcons name="favorite" size={24} color="red" />
                    </View>
                  )}
                  {!answered && (
                    <View style={styles.answers}>
                      <TouchableOpacity style={styles.answer}>
                        <Button
                          title="Yes"
                          color={colors.textDark}
                          onPress={() => handleQuestion("yes")}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.answer}>
                        <Button
                        color={colors.textDark}
                          title="No"
                          onPress={() => handleQuestion("no")}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.answer}>
                        <Button
                        color={colors.textDark}
                          title="Not Sure"
                          onPress={() => handleQuestion("maybe")}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>

              <View
                style={[styles.sectionWrapper]}
                onLayout={(event) => {
                  event.target.measure((x, y, width, height, pageX, pageY) => {
                    setPhotoLayout({
                      x: x,
                      y: y,
                    });
                  });
                }}
              >
                <View style={styles.sectionHeader}>
                  <CustomText textStyle='bold' style={styles.sectionHeaderText}>Photos</CustomText>
                  <AntDesign name="arrowright" size={24} color="black" />
                </View>

                {data?.photos && (
                  <View style={styles.sectionContent}>
                    <PhotosAlbum photosData={data?.photos} />
                  </View>
                )}
              </View>

              <View style={[styles.sectionWrapper]}>
                <View style={styles.sectionHeader}>
                  <CustomText textStyle='bold' style={styles.sectionHeaderText}>
                    Share this Business
                  </CustomText>
                </View>
                <View style={[styles.sectionContent, styles.shareOptions]}>
                  <TouchableOpacity
                    style={styles.shareOption}
                    onPress={() =>
                      Linking.openURL(`sms:&body=${formatUrl(data?.url)}?`)
                    }
                  >
                    <AntDesign name="message1" size={24} color="black" />
                    <CustomText textStyle='regular' style={styles.shareIconTitle}>Messages</CustomText>
                  </TouchableOpacity>
                  <View style={styles.verticalDivider} />

                  <TouchableOpacity
                    style={styles.shareOption}
                    onPress={() => {
                      copyToClipboard();
                      setToastVisible(true);
                    }}
                  >
                    <AntDesign name="copy1" size={24} color="black" />
                    <CustomText textStyle='regular' style={styles.shareIconTitle}>Copy Link</CustomText>
                  </TouchableOpacity>
                  <Toast position={0} visible={toastVisible} animation={true}>
                    Copied to Clipboard!
                  </Toast>

                  <View style={styles.verticalDivider} />

                  <TouchableOpacity
                    style={styles.shareOption}
                    onPress={onShare}
                  >
                    <Feather name="more-horizontal" size={24} color="black" />
                    <CustomText textStyle='regular' style={styles.shareIconTitle}>More</CustomText>
                  </TouchableOpacity>
                </View>
              </View>

              {reviews.reviews ? (
                <View
                  style={[styles.sectionWrapper]}
                  onLayout={(event) => {
                    event.target.measure((x, y) => {
                      setReviewLayout({
                        x: x,
                        y: y,
                      });
                    });
                  }}
                >
                  <Reviews data={reviews.reviews} loading={reviews.loading} />
                </View>
              ) : (
                <ActivityIndicator
                  visible={loading}
                  textContent={"Loading..."}
                  textStyle={{ color: colors.textLight }}
                />
              )}

              {!data?.is_claimed && (
                <View style={[styles.sectionWrapper]}>
                  <View style={styles.sectionHeader}>
                    <CustomText textStyle='bold' style={styles.sectionHeaderText}>
                      Do you work at this business?
                    </CustomText>
                  </View>
                  <View style={styles.sectionContent}>
                    <CustomText textStyle='medium' style={styles.lightText}>
                      Claim your business page to respond to reviews and
                      messages
                    </CustomText>
                    <TouchableOpacity style={styles.claimButtonWrapper}>
                      <Button title="Claim this business" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <StatusBar hidden={true} />
            </SafeAreaView>
          </ScrollView>
        </View>
      </BottomSheetModalProvider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
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
  headerWrapper: {
    height: 230,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  imageBackground: {
    flex: 1,
    blurRadius: 90,
  },
  headerTop: {
    flexDirection: "row",
  },
  headerText: {
    color: "white",
    fontSize: 30,
    paddingVertical: 10,
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "25%",
  },
  rating: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mapWrapperTop: {},
  restaurantInfoWrapper: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "white",
  },
  infoLine: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  settings: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
  },
  iconTitle: {
    justifyItems: "center",
    alignItems: "center",
  },
  claimButtonWrapper: {
    marginVertical: 15,
    borderWidth: 1.3,
    borderColor: colors.textLight,
    borderRadius: 6,
  },
  iconWrapper: {
    backgroundColor: "#e1e0e0",
    padding: 8,
    borderRadius: 50,
  },
  iconSubtitle: {
    paddingTop: 15,
  },
  sectionWrapper: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  sectionHeaderText: {
    fontSize: 20,
  },
  tripInfoSection: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.lighterText,
  },
  lightText: {
    color: colors.lighterText,
  },
  sectionContent: {
    paddingVertical: 10,
  },
  amenitiesItem: {
    flexDirection: "row",
    justifyItems: "flex-start",
    paddingVertical: 5,
    alignItems: "center",
  },
  answers: {
    paddingVertical: 10,
    flexDirection: "row",
  },
  answer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1.3,
    borderColor: colors.textLight,
    borderRadius: 6,
  },
  shareOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  shareOption: {
    alignItems: "center",
  },
  shareIconTitle: {
    paddingVertical: 10,
  },
  verticalDivider: {
    borderRightWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#EDEDED",
  },
  afterAnswer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  bottomSheet2: {
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheet2Item: {
    marginVertical: 10,
  },
  gotItBtn: {
    backgroundColor: "red",
    borderRadius: 6,
  },
});
