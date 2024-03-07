import { useEffect, useState } from "react";
import { Asset, AssetMetadata } from "expo-asset";
function pad(num) {
  return String(num).padStart(2, "0");
}
export function useObsImage({ reference }) {
  const [image, setImage] = useState(null);
  const uri = `./assets/obs-images/obs-en-${pad(reference.story)}-${pad(
    reference.frame
  )}.jpg`;

  console.log({ uri, AssetMetadata, Asset });
  useEffect(() => {
    const asset = Asset.fromURI(uri);
    console.log({ asset });
    asset
      .downloadAsync()
      .then((d) => {
        console.log({ d });
        setImage(d);
      })
      .catch((e) => console.log({ e }));
  }, [uri]);

  return image;
}
