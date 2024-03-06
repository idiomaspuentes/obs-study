import { Picker } from "@react-native-picker/picker";

export function StoryNav({ stories, onSelect }) {
  return (
    <Picker onValueChange={onSelect}>
      {stories.map((title, key) => {
        return <Picker.Item label={title} value={key + 1} key={key + 1} />;
      })}
    </Picker>
  );
}
