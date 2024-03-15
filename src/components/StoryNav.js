import { Picker } from "@react-native-picker/picker";

export function StoryNav({ selectedStory, stories, onSelect }) {
  return (
    <Picker selectedValue={selectedStory} onValueChange={onSelect} style={{marginTop: "30%"}} multiline={true} numberOfLines={3}>
      {stories.map((title, key) => {
        return <Picker.Item label={title} value={key + 1} key={key + 1} style={{ fontSize: 28 }}/>;
      })}
    </Picker>
  );
}
