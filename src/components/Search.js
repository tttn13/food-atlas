import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { elevation } from "../common/styles";
import { useState } from "react"

export default function Search({setTerm}) {
  const [input, setInput] = useState("")
  
  return (
    <View style={[styles.container, styles.elevation]}>
      <FontAwesome name="search" size={25} />
      <TextInput 
      style={styles.input} 
      placeholder="Restaurants, food..." 
      value={input}
      onChangeText={(text) => {
        setInput(text)}
      }
      onEndEditing={() => {
        if (input) setTerm(input) 
        setInput("")
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 5,
    marginHorizontal: 25,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 40,
  },
  elevation,
  input: {
    fontWeight: "400",
    fontSize: 20,
    marginLeft: 10,
  },
});
