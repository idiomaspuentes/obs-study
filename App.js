import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import JSZipUtils from "jszip-utils";
import JSZip from "jszip";
import GetStories from "./src/core";



const _url = "https://git.door43.org/es-419_gl/xsu_obs/archive/master.zip";
export default function App() {
  console.log(GetStories(_url));
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
