import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import getStories from "./src/core";
import { useEffect, useState } from "react";
import { FileSystem, shareAsync } from "expo";
import { OBSContextProvider, useObsNav, useObs } from "./GlobalState";

const _url = "https://git.door43.org/es-419_gl/xsu_obs/archive/master.zip";

function Test() {
  const { reference, goTo, goNext, goPrev } = useObsNav();
  const { source, setSrc } = useObs();

  
  useEffect(() => {
    setSrc(_url);
  }, [_url]);
  
  
  function download() {
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

  console.log(source);

  return source ? (
    <>
      <Text>{`story: ${reference.story} frame: ${reference.frame}`}</Text>
      <Pressable style={styles.button} onPress={download}>
      <Text>Guardar</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={goNext}>
        <Text style={styles.text}>NEXT</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={goPrev}>
        <Text style={styles.text}>PREV</Text>
      </Pressable>
    </>
  ) : null;
}

export default function App() {
  const [obs, setObs] = useState();

  useEffect(() => {
    getStories(_url).then((data) => setObs(data));
  }, []);


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
