import { Text, Image, StyleSheet, View, ScrollView } from "react-native";

export default function FrameObs({ text, image }) {
  return (
    <View>
        
        <View>
          <View
            style={{}}>
            <ScrollView contentContainerStyle=''>
             {image ? <Image styles={styles.image} source={image} /> : null}
              <Text styles={{ fontSize: 28 }} >
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
