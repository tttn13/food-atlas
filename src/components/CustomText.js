import {
  Text,
  StyleSheet,
} from 'react-native';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";

export default function CustomText(props) {
  const { textStyle } = props
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });
  if (!fontsLoaded) {
    return <CustomText textStyle="bold">Loading </CustomText>;
  }
  let defaultStyle = {}
  if (textStyle == 'regular') {
    defaultStyle = styles.regular
  } else if (textStyle == 'medium') {
    defaultStyle = styles.medium
  } else if (textStyle == 'semiBold') {
    defaultStyle = styles.semiBold
  }else if (textStyle == 'bold') {
    defaultStyle = styles.bold
  }
  return (
    <Text style={[defaultStyle, props.style]}>
    {props?.children}
    </Text>
  );
}
const styles = StyleSheet.create({
  regular: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 15
  },
  medium: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 15
  },
  semiBold: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 18
  },
  bold: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18
  },
});

