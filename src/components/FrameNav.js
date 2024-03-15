import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useObsNav } from "../../GlobalState";
import { ButtonBack } from "./ButtonBack";
import { ButtonNext } from "./ButtonNext";

export default function FrameNav() {
  const { reference, goNext, goPrev } = useObsNav();

  return (
    <View>
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
    flex: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "#0c0c0c",
    color: "#fff",
    width: "100%",
    height: 70,
    padding: 5,
    margin: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  reference: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 20,
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
