import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { shareAsync } from "expo";
import * as FileSystem from "expo-file-system";
import { OBSContextProvider, useObsNav, useObs } from "./GlobalState";

import { StoryNav } from "./src/components/StoryNav";
import { pad } from "./src/core/utils";
import FrameObs from "./src/components/FrameObs";
import { useObsImage } from "./src/hooks/useObsImage";
import FrameNav from "./src/components/FrameNav";

const _url = "https://git.door43.org/es-419_gl/es-419_obs/archive/master.zip";

function Test() {
  const { reference, goTo } = useObsNav();
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

  function download() {
    const blob = new Blob([JSON.stringify(source.stories)], {
      type: "application/json",
    });

    saveFile(
      FileSystem.documentDirectory,
      "obs.json",
      "application/json",
      JSON.stringify(source.stories)
    );
  }

  async function readDirectory() {
    console.log("readDirectory,");
    const base64 = await FileSystem.readAsStringAsync(
      "content://com.android.externalstorage.documents/tree/primary/Download/Prueba/obs.json"
    );
    console.log("base64,", base64);
  }

  async function saveFile(uri, filename, mimetype, fileContent) {
    console.log("entro a saveFile");
    console.log("uri permissions ==>", FileSystem.documentDirectory + "obs");
    const props = await FileSystem.getInfoAsync(
      FileSystem.documentDirectory + "obs"
    );

    if (props.exists && props.isDirectory) {
      console.log("carpeta Obs ya existe");
      console.log("props", props);
      //return props;
    } else {
      console.log("CREAR carpeta Obs ");
      try {
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "obs",
          { intermediates: true }
        );
      } catch (e) {
        console.info("ERROR", e);
      }
      try {
        const isDir = await FileSystem.readDirectoryAsync(
          FileSystem.documentDirectory + "obs"
        );
        console.info("DIR", isDir);
      } catch (e) {
        console.info("ERROR", e);
      }
    }

    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(
          props.uri
        );

      if (permissions.granted) {
        console.log("entro a granted");
        console.log("permissions", permissions);

        const url_default = await FileSystem.getInfoAsync(props.uri);
        console.log("url_default", url_default.uri);
        console.log("permissions.directoryUri", permissions.directoryUri);

        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            console.log("emtro a uri");
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

  console.log({ image });

  return source ? (
    <View style={styles.storyContainer}>
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
      <FrameNav></FrameNav>
    </View>
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
  storyContainer: {},
  container: {
    flex: 0,
    flexWrap: "wrap",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
