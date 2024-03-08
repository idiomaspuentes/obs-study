import {
  fetchStories,
  getLatestRelease,
  getLatestVersion,
} from "./fetchStories";
import * as FileSystem from "expo-file-system";
import { compareVersions } from "compare-versions";

export async function getStories(owner, languageCode) {
  if (!FileSystem.documentDirectory) return fetchStories(owner, languageCode);

  const localStories = await getLocalStories(owner, languageCode);

  if (!localStories) {
    console.log("There are no local stories");
    return await storeStories(owner, languageCode);
  }

  if (!localStories.stories) {
    console.log("Current object has an old structure");
    return await storeStories(owner, languageCode);
  }

  const latestRelease = await getLatestRelease(owner, languageCode);

  if (!latestRelease) {
    console.log("There is no internet");
    return localStories;
  }

  const latestVersion = await getLatestVersion(
    owner,
    languageCode,
    latestRelease["tag_name"]
  );

  console.log({ latestVersion, currentVersion: localStories.version });

  if (compareVersions(latestVersion, localStories.version) === 1) {
    console.log("There is a new version on the server");
    return await storeStories(owner, languageCode);
  }
  console.log("Latest version on system");
  return localStories;
}

async function getLocalStories(owner, languageCode) {
  const directoryName = "obs-study";
  const filename = `${owner}_${languageCode}_obs.json`;

  const dirUri = FileSystem.documentDirectory + directoryName;
  const fileUri = dirUri + "/" + filename;

  console.log(
    "FILE_URI_COM ==>",
    await FileSystem.getContentUriAsync(fileUri),
    fileUri
  );

  const storedStory = await FileSystem.readAsStringAsync(fileUri)
    .then((content) => {
      return typeof content === "string" ? JSON.parse(content) : undefined;
    })
    .catch(() => undefined);

  return storedStory;
}

async function storeStories(owner, languageCode) {
  const stories = await fetchStories(owner, languageCode);
  if (!fetchStories)
    throw new Error("No internet available to fetch and store stories");
  const directoryName = "obs-study";
  const filename = `${owner}_${languageCode}_obs.json`;

  const dirUri = FileSystem.documentDirectory + directoryName;
  const fileUri = dirUri + "/" + filename;

  const doesUriExists = async (uri) =>
    (await FileSystem.getInfoAsync(uri)).exists;

  if (!doesUriExists(dirUri))
    await FileSystem.makeDirectoryAsync(dirUri, {
      intermediates: true,
    });

  console.log("Storing stories in file system");
  await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(stories));

  const storedStory = await FileSystem.readAsStringAsync(fileUri).then(
    (content) => {
      return JSON.parse(content);
    }
  );
  if (storedStory) {
    return storedStory;
  } else {
    throw new Error("No stored story found.");
  }
}
