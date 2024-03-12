import {
  fetchStories,
  getLatestRelease,
  getLatestVersion,
} from "./fetchStories";
import * as FileSystem from "expo-file-system";
import { compareVersions } from "compare-versions";
import { warn } from "./utils";

export async function getStories(owner, languageCode) {
  if (!FileSystem.documentDirectory) {
    warn("No Filesystem detected");
    return fetchStories(owner, languageCode);
  }

  warn("Getting local stories");
  const localStories = await getLocalStories(owner, languageCode);

  if (!localStories) {
    warn("There are no local stories, downloading stories to filesystem");
    return await storeStories(owner, languageCode);
  }

  if (!localStories.stories) {
    warn(
      "Current object has an old structure, downloading new stories to filesystem"
    );
    return await storeStories(owner, languageCode);
  }

  const latestRelease = await getLatestRelease(owner, languageCode);

  if (!latestRelease) {
    warn("There is no internet, using local stories");
    return localStories;
  }

  const latestVersion = await getLatestVersion(
    owner,
    languageCode,
    latestRelease["tag_name"]
  );

  console.log({ latestVersion, currentVersion: localStories.version });

  if (compareVersions(latestVersion, localStories.version) === 1) {
    warn(
      "There is a new version on the server, downloading new version to filesystem"
    );
    return await storeStories(owner, languageCode);
  }
  warn("Latest version on system, loading stories from filesystem");
  return localStories;
}

async function getLocalStories(owner, languageCode) {
  const directoryName = "obs-study";
  const filename = `${owner}_${languageCode}_obs.json`;

  const dirUri = FileSystem.documentDirectory + directoryName;
  const fileUri = dirUri + "/" + filename;

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

  console.log({ dirUri });

  const doesUriExists = async (uri) =>
    (await FileSystem.getInfoAsync(uri)).exists;

  if (!(await doesUriExists(dirUri)))
    await FileSystem.makeDirectoryAsync(dirUri, {
      intermediates: true,
    }).catch((e) => console.log(e));

  warn("Storing stories in file system");
  await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(stories)).catch(
    (e) => console.log(e)
  );

  console.log(
    "FILE_URI_COM ==>",
    await FileSystem.getContentUriAsync(fileUri).catch((e) => console.log(e)),
    fileUri
  );

  const storedStory = await FileSystem.readAsStringAsync(fileUri)
    .then((content) => {
      return JSON.parse(content);
    })
    .catch((e) => console.log(e));
  if (storedStory) {
    return storedStory;
  } else {
    warn("No stored story found.");
    return stories;
  }
}
