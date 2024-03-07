import { Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export function ButtonBack({ label, onPress, style }) {
  return (
    <Pressable onPress={onPress}>
      <AntDesign name="left" size={18} color="#25292e" />
      <Text style={style}>{label}</Text>
    </Pressable>
  );
}
