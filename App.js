import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import getStories from "./src/core";
import { useEffect, useState } from "react";
import { shareAsync } from "expo";
import { OBSContextProvider, useObsNav, useObs } from "./GlobalState";
import * as FileSystem from 'expo-file-system';
import { Platform } from "expo-modules-core";
import * as MediaLibrary from "expo-media-library";

const _url = "https://git.door43.org/es-419_gl/xsu_obs/archive/master.zip";

function Test() {
  const { reference, goTo, goNext, goPrev } = useObsNav();
  const { source, setSrc } = useObs();

  
  useEffect(() => {
    setSrc(_url);
  }, [_url]);
  
  
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

  console.log(source);

  return source ? (
    <>
      <Text>{`story: ${reference.story} frame: ${reference.frame}`}</Text>
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
