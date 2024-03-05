import { useState } from "react";
import {Asset} from 'expo-asset';
function pad(num){
    return String(num).padStart(2,'0');
}
export function useObsImage({reference}){
    const [image,setImage] = useState(null);
    const uri = `./assets/obs-images/obs-en-${pad(reference.story)}-${pad(reference.frame)}.jpg`;
    const asset = Asset.fromURI(uri);
    asset.downloadAsync().then((d)=> setImage(d));
    console.log('asdf')
    return image;
}