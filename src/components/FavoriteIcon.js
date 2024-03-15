import { View } from "react-native";

import { Icon } from "react-native-elements";
import useFavorite from "../hooks/useFavorite";

export default function FavoriteIcon () {
const {favorite,addFavorite,removeFavorite} = useFavorite();

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
