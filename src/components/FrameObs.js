import { Text, Image, StyleSheet, View, ScrollView } from "react-native";

export default function FrameObs({ text, image }) {
  return (
    <View style={styles.frameContainer}>
        {image ? <Image source={image} style={styles.image} /> : null}
        <View style={{ flex: 0, marginVertical: 20 }}>
          <View
            style={{ flexDirection: 'column', height: "100%", width: 350, paddingBottom: 215, paddingLeft: 10 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Text
                style={{
                  fontSize: 25,
                  color: 'black'
                }}>
                {text}
              </Text>
            </ScrollView>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frameContainer: { 
   flex: 1,
   margin: 10,
   flexWrap: "wrap",
   flexDirection: "row",
  },
  text: {
    fontSize: 25,
    paddingBottom: 20,
    flexShrink: 1,
  },
  imageContainer: {
    justifyContent: "center",
    minWidth: 320,
    minHeight: 440,
    color: "#fff",
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  image: {
    resizeMode: 'contain',
    height: "38%",
    width: "100%",
    paddingBottom: 0,
  },
});
