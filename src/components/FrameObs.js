import { Text, Image, StyleSheet, View } from "react-native";

export default function FrameObs({ text, image }) {
  return (
    <View style={styles.frameContainer}>
      {image ? <Image source={image} /> : null}
      <View style={{ width: "60%" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ paddingLeft: 20, paddingBottom: 110, fontSize: 25 }}>{text}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frameContainer: { flex: 10, padding: 0, justifyContent: "center" },
  text: {
    flex: 1,
    fontSize: 25,
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
    color: "#fff",
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
