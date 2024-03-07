import { useEffect, useState } from "react";
import { Asset, useAssets } from "expo-asset";
function pad(num) {
  return String(num).padStart(2, "0");
}

const images = require.context("../../assets/obs-images", true, /\.jpg$/);
const imageSources = images.keys().reduce((sources, key) => {
  sources[key] = images(key);
  return sources;
}, {});

export function getImage({ reference }) {
  console.log({ imageSources });
  return imageSources[
    `./obs-en-${pad(reference.story)}-${pad(reference.frame)}.jpg`
  ];
}

export function useObsImage({ reference }) {
  const [image, setImage] = useState(null);
  const uri = `./assets/obs-images/obs-en-${pad(reference.story)}-${pad(
    reference.frame
  )}.jpg`;
  useEffect(() => {
    const asset = Asset.fromURI(uri);
    console.log({ asset });
    asset
      .downloadAsync()
      .then((d) => {
        console.log({ d });
        setImage(d);
      })
      .catch(() => setImage(getImage({ reference })));
  }, [uri]);

  return image;
}
