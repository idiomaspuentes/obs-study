import { Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export function ButtonNext({ label, onPress, style }) {
  return (
    <Pressable onPress={onPress}>
      {label ? <Text style={style}>{label}</Text> : null}
      <AntDesign
        name="right"
        size={18}
        color={style ? style.color : "#25292e"}
      />
    </Pressable>
  );
}
