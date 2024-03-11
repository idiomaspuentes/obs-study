import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useObsNav } from "../../GlobalState";
import { ButtonBack } from "./ButtonBack";
import { ButtonNext } from "./ButtonNext";

export default function FrameNav() {
  const { reference, goNext, goPrev } = useObsNav();

  return (
    <View style={styles.container}>
      <ButtonBack
        label={""}
        style={{ ...styles.backButton }}
        onPress={goPrev}
      ></ButtonBack>
      <Text style={styles.reference}>
        {"OBS"} {`${reference.story}:${reference.frame}`}
      </Text>
      <ButtonNext
        label={""}
        style={{ ...styles.nextButton }}
        onPress={goNext}
      ></ButtonNext>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#0c0c0c",
    color: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    width: "70%",
  },
  reference: {
    alignSelf: "center",
    color: "#fff",
  },
  backButton: {
    verticalAlign: "middle",
    color: "#fff",
  },
  nextButton: {
    verticalAlign: "middle",
    color: "#fff",
  },
});
