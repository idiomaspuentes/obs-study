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
import FrameObs from "./src/components/FrameObs";
import { useObsImage } from "./src/hooks/useObsImage";

const _url = "https://git.door43.org/es-419_gl/es-419_obs/archive/master.zip";

function Test() {
  const { reference, goTo, goNext, goPrev } = useObsNav();
  const image = useObsImage({ reference });
  const { source, setSrc } = useObs();

  const getFrameTextFromRef = (reference) => {
    const story = source.stories.allStories[pad(reference.story)];
    const frame = story.textosArr[reference.frame - 1];
    return frame;
  };

  useEffect(() => {
    setSrc(_url);
  }, [_url]);

  console.log({ source });

  function download() {
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

  return source ? (
    <>
      <StoryNav
        selectedStory={reference.story}
        stories={Object.keys(source.stories?.allStories).map(
          (stringKey, key) => source.stories.allStories[pad(key + 1)].title
        )}
        onSelect={goTo}
      ></StoryNav>
      <FrameObs text={getFrameTextFromRef(reference)} image={image}></FrameObs>
      <Pressable style={styles.button} onPress={download}>
        <Text>Guardar</Text>
      </Pressable>
      <ButtonBack
        label={"Atras"}
        style={{ color: "red" }}
        onPress={goPrev}
      ></ButtonBack>
      <Text>{`story: ${reference.story} frame: ${reference.frame}`}</Text>
      <ButtonNext label={"Siguiente"} onPress={goNext}></ButtonNext>
    </>
  ) : null;
}

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
