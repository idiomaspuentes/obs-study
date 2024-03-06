import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import getStories from "./src/core";
import { useEffect, useState } from "react";
import { shareAsync } from "expo";
import * as FileSystem from "expo-file-system";

import { OBSContextProvider, useObsNav, useObs } from "./GlobalState";
import { ButtonBack } from "./src/components/ButtonBack";
import { ButtonNext } from "./src/components/ButtonNext";
import { StoryNav } from "./src/components/StoryNav";
import { pad } from "./src/core/utils";

const _url = "https://git.door43.org/es-419_gl/xsu_obs/archive/master.zip";

function Test() {
  const { reference, goTo, goNext, goPrev } = useObsNav();
  const { source, setSrc } = useObs();

  useEffect(() => {
    setSrc(_url);
  }, [_url]);

  function download() {
    console.log(source.stories);
    console.log("obs", source.stories, JSON.stringify(source.stories));
    const blob = new Blob([JSON.stringify(source.stories)], {
      type: "application/json",
    });
    //saveAs(blob, "obs.json");
    saveFile(source.stories, "obs.json", "application/json");
  }

  async function saveFile(uri, filename, mimetype) {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  }

  // console.log(
  //   { source },
  //   source?.stories?.allStories
  //     ? Object.values(source?.stories?.allStories)
  //     : "no existe source"
  // );
  console.log(source);

  console.log(source ? Object.keys(source.stories.allStories) : null);

  return source ? (
    <>
      <StoryNav
        stories={Object.keys(source.stories?.allStories).map(
          (stringKey, key) => source.stories.allStories[pad(key + 1)].title
        )}
      ></StoryNav>
      <Text>{`story: ${reference.story} frame: ${reference.frame}`}</Text>
      <Pressable style={styles.button} onPress={download}>
        <Text>Guardar</Text>
      </Pressable>
      <ButtonBack
        label={"Atras"}
        style={{ color: "red" }}
        onPress={goPrev}
      ></ButtonBack>
      <ButtonNext label={"Siguiente"} onPress={goNext}></ButtonNext>
    </>
  ) : null;
}

function Navegacion() {}

export default function App() {
  return (
    <OBSContextProvider>
      <View style={styles.container}>
        <Test></Test>
        <StatusBar style="auto" />
      </View>
    </OBSContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
