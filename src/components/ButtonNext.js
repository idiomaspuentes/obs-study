import { Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export function ButtonNext({ label, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Text>{label}</Text>
      <AntDesign name="right" size={18} color="#25292e" />
    </Pressable>
  );
}
