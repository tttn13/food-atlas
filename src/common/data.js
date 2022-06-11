import colors from "../assets/colors/colors";

const styles = {
  textStyle: {
    textDecorationLine: "none",
    fontWeight: "500",
  },
  verticalStyle: { marginTop: 16 },
};

export const verticalStaticData = [
  {
    id: 0,
    text: "Popular",
    fillColor: colors.buttonColor,
    unfillColor: colors.white,
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
  },
  {
    id: 1,
    text: "Price (low-high)",
    fillColor: colors.buttonColor,
    unfillColor: colors.white,
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
  },
  {
    id: 2,
    text: "Price (high-low)",
    fillColor: colors.buttonColor,
    unfillColor: colors.white,
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
  },
  {
    id: 3,
    text: "Rating",
    fillColor: colors.buttonColor,
    unfillColor: colors.white,
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
  },
];

export const noAvar = {
  imageUrl: require("../assets/images/noAvatar.png")
}

export const commonCategories = [
  {
    name: "Burger",
    imageUrl: require("../assets/images/burger.png"),
  },
  {
    name: "Pizza",
    imageUrl: require("../assets/images/pizza.png"),
  },
  {
    name: "Pasta",
    imageUrl: require("../assets/images/pasta.png"),
  },
  {
    name: "Steak",
    imageUrl: require("../assets/images/steak.png"),
  },
  {
    name: "Dessert",
    imageUrl: require("../assets/images/cake.png"),
  },
  {
    name: "Drinks",
    imageUrl: require("../assets/images/smoothies.png"),
  },
];
