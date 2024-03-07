import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { OBSContextProvider,  useObsNav, useObs } from './GlobalState';
import {Picker} from '@react-native-picker/picker';
import { useEffect } from 'react';

function Test() {
  const { reference, goTo, goNext, goPrev } = useObsNav();
  const { source, setSrc } = useObs();
  const _url = "https://git.door43.org/es-419_gl/xsu_obs/archive/master.zip";

  useEffect(() => {
    setSrc(_url);
  },[_url]);

  console.log(source);

  return source?<>
      <Text>{`story: ${reference.story} frame: ${reference.frame}`}</Text>
      <Pressable style={styles.button} onPress={goNext}>
          <Text style={styles.text}>NEXT</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={goPrev}>
          <Text style={styles.text}>PREV</Text>
      </Pressable>
      <Picker
      selectedValue={reference.story}
      onValueChange={goTo}>
        <Picker.Item label="1" value={1}/>
        <Picker.Item label="2" value={2}/>
      </Picker>
</>:null;
};

export default function App() {
  return (
    <OBSContextProvider>
      <View style={styles.container}>
        <Test></Test>
        <StatusBar style="auto" />
      </View>
    </OBSContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
