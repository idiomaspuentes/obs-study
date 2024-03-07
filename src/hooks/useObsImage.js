import { useEffect, useState } from "react";
import { Asset } from "expo-asset";
function pad(num) {
  return String(num).padStart(2, "0");
}

const images = require.context("../../assets/obs-images", true, /\.jpg$/);
const imageSources = images.keys().reduce((sources, key) => {
  sources[key] = images(key);
  return sources;
}, {});

export function getImage({ reference }) {
  return imageSources[
    `./obs-en-${pad(reference.story)}-${pad(reference.frame)}.jpg`
  ];
}

export function useObsImage({ reference }) {
  const [image, setImage] = useState(getImage({ reference }));
  const uri = `./assets/obs-images/obs-en-${pad(reference.story)}-${pad(
    reference.frame
  )}.jpg`;
  useEffect(() => {
    const asset = Asset.fromURI(uri);
    asset
      .downloadAsync()
      .then((d) => {
        setImage(d);
      })
      .catch(() => {
        setImage(getImage({ reference }));
      });
  }, [uri]);

  return image;
}
