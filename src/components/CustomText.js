import {
  Text,
  StyleSheet,
} from 'react-native';


export default function CustomText(props) {
  const { textStyle } = props

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
    fontFamily: "Avenir-Black",
    fontWeight: '400',
    fontSize: 15
  },
  medium: {
    fontFamily: 'Avenir-Black',
    fontWeight: '500',
    fontSize: 15
  },
  semiBold: {
    fontFamily: 'Avenir-Black',
    fontWeight: '600',
    fontSize: 18
  },
  bold: {
    fontFamily: 'Avenir-Black',
    fontWeight: 'bold',
    fontSize: 18
  },
});

