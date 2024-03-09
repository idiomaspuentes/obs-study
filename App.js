import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { OBSContextProvider, useObsNav, useObs } from "./GlobalState";

// import { StoryNav } from "./src/components/StoryNav";
import { pad } from "./src/core/utils";
import FrameObs from "./src/components/FrameObs";
import { useObsImage } from "./src/hooks/useObsImage";
import FrameNav from "./src/components/FrameNav";

function Test() {
  const { reference, goTo } = useObsNav();
  const image = useObsImage({ reference });
  const { source, setSrc } = useObs();

  const getFrameTextFromRef = (reference) => {
    const story = source.stories[pad(reference.story)];
    const frame = story.frames[reference.frame - 1];
    return frame;
  };

  useEffect(() => {
    setSrc();
  }, []);

  return source ? (
    <View style={styles.storyContainer}>
      {/* <StoryNav
        selectedStory={reference.story}
        stories={Object.keys(source.stories).map(
          (stringKey, key) => source.stories[pad(key + 1)].title
        )}
        onSelect={goTo}
      ></StoryNav> */}
      <FrameObs text={getFrameTextFromRef(reference)} image={image}></FrameObs>
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
