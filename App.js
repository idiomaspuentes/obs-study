import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import getStories from "./src/core";
import { useEffect, useState } from "react";
import { shareAsync } from "expo";
import * as FileSystem from "expo-file-system";
import { OBSContextProvider, useObsNav, useObs } from "./GlobalState";
import { Platform } from "expo-modules-core";
import * as MediaLibrary from "expo-media-library";

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

    saveFile(FileSystem.documentDirectory , "obs.json", "application/json", JSON.stringify(source.stories));
  }

  async function readDirectory() {
    console.log("readDirectory,");
    const base64 = await FileSystem.readAsStringAsync("content://com.android.providers.downloads.documents/document");
    console.log("base64,", base64);
  }

  async function saveFile(uri, filename, mimetype,fileContent) {
    console.log("entro a saveFile");
    if (Platform.OS === "android") {
      console.log("entro a android");
      console.log("mimetype", mimetype);
      const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        console.log("entro a granted");
       

        await FileSystem.StorageAccessFramework.createFileAsync(
      
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            console.log("emtro a uri")
            await FileSystem.writeAsStringAsync(uri, fileContent, {
              encoding: FileSystem.EncodingType.UTF8,
            });
          })
          .catch((e) => console.log(e));
      } else {
        console.log("entro a else");
        shareAsync(uri);
      }
    } else {
      console.log("entro a else2");
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
      <Pressable style={styles.button} onPress={readDirectory}>
      <Text>leer</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={goNext}>
        <Text style={styles.text}>NEXT</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={goPrev}>
        <Text style={styles.text}>PREV</Text>
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
