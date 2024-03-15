import AsyncStorage from "@react-native-async-storage/async-storage";
import { useObsNav } from "../../GlobalState";
import { useState,useEffect } from "react";

export default function useFavorite(){

const { reference } = useObsNav();
const [favorite,setFavorite] = useState(false); 

    useEffect(() => {
      getLikeFrame(reference)?.then((result) => {
        setFavorite(result);
      });
    }, [reference]);
  
    const getLikeFrame = async (referenceFrame) => {
      let validateLike = false;
      const storageData = await AsyncStorage.getItem(KEY_FRAME+referenceFrame.story+referenceFrame.frame);
      if (storageData !== null) {
        validateLike = true;
      }
      return validateLike;
      //const storageAllData = await AsyncStorage.getAllKeys();
    };
  
  
    const KEY_FRAME = "favoriteFrame-"; 
  
    const addFavorite = async() => {
      const addF = await AsyncStorage.setItem(KEY_FRAME+reference.story+reference.frame,JSON.stringify(reference));
      if (addF !== null) {
        setFavorite(true);
      }
    }
  
    const removeFavorite = async () => {
     
      const storageData = await  AsyncStorage.removeItem(KEY_FRAME+reference.story+reference.frame);
      if (storageData == null) {
        setFavorite(false);
      }
      //const storageData = await AsyncStorage.getItem(KEY_FRAME+reference.story+reference.frame);
      const storageAllData = await AsyncStorage.getAllKeys();
      console.log("storageAllData", storageAllData);
    }

    return {favorite,addFavorite,removeFavorite};
}