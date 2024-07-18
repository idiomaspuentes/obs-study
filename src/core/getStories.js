import {
  fetchStories,
  getLatestRelease,
  getLatestVersion,
} from "./fetchStories";
import * as FileSystem from "expo-file-system";
import { compareVersions } from "compare-versions";
import { warnTranslate } from "./utils";
import i18n from '../constants/i18n'

export async function getStories(owner, languageCode) {
  if (!FileSystem.documentDirectory) {
    warnTranslate("noFS");
    return fetchStories(owner, languageCode);
  }

  warnTranslate("gettingLocalStories");
  const localStories = await getLocalStories(owner, languageCode);

  if (!localStories) {
    warnTranslate("noLocalDownloading");
    return await storeStories(owner, languageCode);
  }

  if (!localStories.stories) {
    warnTranslate("oldDownloadingNew");
    return await storeStories(owner, languageCode);
  }

  const latestRelease = await getLatestRelease(owner, languageCode);

  if (!latestRelease) {
    warnTranslate("noInternetUsingLocal");
    return localStories;
  }

  const latestVersion = await getLatestVersion(
    owner,
    languageCode,
    latestRelease["tag_name"]
  );

  console.log({ latestVersion, currentVersion: localStories.version });

  if (compareVersions(latestVersion, localStories.version) === 1) {
    warnTranslate("newVersionDetected");
    return await storeStories(owner, languageCode);
  }
  warnTranslate("latestVersionIsLocal");
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
    throw new Error(i18n.t("noInternet"));
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

  warnTranslate("storingStoriesOnFS");
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
    warnTranslate("noStoredStories");
    return stories;
  }
}
