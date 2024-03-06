import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { saveAs } from "file-saver";
import getStories from "./src/core";
import { useEffect, useState } from "react";
import { FileSystem, shareAsync } from 'expo';

const _url = "https://git.door43.org/es-419_gl/xsu_obs/archive/master.zip";
export default function App() {
  const [obs, setObs] = useState();

  useEffect(() => {
    getStories(_url).then((data) => setObs(data));
  }, []);

  function download() {
    console.log("obs", obs.stories, JSON.stringify(obs.stories));
    const blob = new Blob([JSON.stringify(obs.stories)], {
      type: "application/json",
    });
    //saveAs(blob, "obs.json");
    saveFile(obs.stories, "obs.json", "application/json");
  }

  async function saveFile(uri, filename, mimetype) {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
  
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch(e => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  }

  
  
  return obs ? (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Pressable onPress={download}>
        <Text>Guardar</Text>  </Pressable>
      <StatusBar style="auto" />
    </View>
    
    

   // <button onClick={() => saveFile(obs.stories, "obs.json", "application/json")}> save </button>

  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
