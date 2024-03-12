import { useState } from "react";
import { View } from "react-native";
import { useObsNav } from "../../GlobalState";
import { Icon } from "react-native-elements";

export default function FrameNav() {
  const [favorite, setFav] = useState(false);
  const { reference} = useObsNav();
  const addFavorite = () => {
    console.log("addFavorite", reference);
    setFav(true);
  }
  const removeFavorite = () => {
    console.log("removeFavorite",reference);
    setFav(false);
  }

  return (
    <View >
      <Icon
            type="material-community"
            name={favorite ? "heart" : "heart-outline"}
            onPress={favorite ? removeFavorite : addFavorite}
            color={favorite ? "red" : "black"}
            size={30}
            underlayColor={"transparent"}
          />
    </View>
  );
};
