import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { OBSContextProvider, useObsNav, useObs } from "./GlobalState";

import ObsNavigation from "./src/components/ObsNavigation";
import { pad } from "./src/core/utils";
import FrameObs from "./src/components/FrameObs";
import { useObsImage } from "./src/hooks/useObsImage";
import FrameNav from "./src/components/FrameNav";

import { I18nextProvider } from 'react-i18next'
import i18n from './src/constants/i18n'
import { BrowserDataProvider } from "./src/context/browser-data-context"
import { MediaPlayerProvider } from "./src/context/media-player-context"

function Test() {
  const { reference, goTo } = useObsNav();
  const [ isNavigatorOpen, setIsNavigatorOpen] = useState(true)
  const image = useObsImage({ reference });
  const { source, setSrc } = useObs();

  const getFrameTextFromRef = (reference) => {
    const story = source.stories[pad(reference.story)];
    const frame = story.frames[reference.frame - 1];
    return frame;
  };

  const handleSelect = (story,frame) => {
    goTo(story,frame)
    setIsNavigatorOpen(false)
  };

  useEffect(() => {
    setSrc();
  }, []);

  return (source && isNavigatorOpen) ? (
      <ObsNavigation
        selectedStory={reference.story}
        stories={
          Object.keys(source.stories).map(
            (stringKey, key) => source.stories[pad(key + 1)].title
          )
        }
        onSelect={handleSelect}
        onExitNavigation={() => console.log("onExitNavigation")}
        // onStartPlay={() => console.log("onExitNavigation")}
      />
    ) : source ? (
      <View style={styles.storyContainer}>
        <Text 
          style={styles.subHeaderTitle}
          onClick={()=>setIsNavigatorOpen(true)}
        >
          {"<"}
        </Text>
        <FrameObs text={getFrameTextFromRef(reference)} image={image}/>
        <FrameNav/>
      </View>
    ) : null
}

export default function App() {
  return (
    <I18nextProvider i18n={ i18n }>
      <OBSContextProvider>
        <BrowserDataProvider>
          <MediaPlayerProvider>
              <Test
              />
              <StatusBar style="auto" />
          </MediaPlayerProvider>
        </BrowserDataProvider>
      </OBSContextProvider>
    </I18nextProvider>
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
  subHeaderTitle: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '700',
    color: '#1d1d1d',
  },
});
