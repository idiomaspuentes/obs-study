import JSZipUtils from "jszip-utils";
import JSZip from "jszip";
import { parse } from "yaml";

export const fetchStories = async (owner, languageCode) => {
  console.log("Loading stories from internet");
  const latestRelease = await getLatestRelease(owner, languageCode);
  const latestVersion = await getLatestVersion(
    owner,
    languageCode,
    latestRelease["tag_name"]
  );

  const storiesUrl = latestRelease["zipball_url"];
  const result = { stories: {}, version: latestVersion };
  const obsFiles = await getZipFiles(storiesUrl);

  for (const fileName in obsFiles) {
    if (Object.hasOwnProperty.call(obsFiles, fileName)) {
      if (fileName.match(/\/content\/\d/gm)) {
        const name = fileName.slice(-5, -3);
        result.stories[name] = getStoryFromString(
          await obsFiles[fileName].async("string")
        );
      }
    }
  }
  return result;
};

export const getLatestRelease = async (owner, languageCode) => {
  const latestRelease = await (
    await fetch(
      `https://git.door43.org/api/v1/repos/${owner}/${languageCode}_obs/releases/latest`
    )
  ).json();
  return latestRelease;
};

export const getLatestVersion = async (owner, languageCode, tagName) => {
  const latestManifest = await (
    await fetch(
      `https://git.door43.org/api/v1/repos/${owner}/${languageCode}_obs/raw/manifest.yaml?ref=${tagName}`
    )
  ).text();

  const latestVersion = getVersionFromYamlManifest(latestManifest);

  return latestVersion;
};

const getZipFiles = async (url) => {
  const data = await JSZipUtils?.getBinaryContent(url);
  var zip = new JSZip();
  await zip.loadAsync(data);
  return zip.files;
};

const getVersionFromYamlManifest = (yaml) => {
  const manifest = parse(yaml);
  return manifest["dublin_core"]?.version;
};

const getStoryFromString = (obsString) => {
  let _markdown = obsString.replaceAll("\u200B", "").split(/\n\s*\n\s*/);
  const title = _markdown.shift().trim().slice(1);
  let link = _markdown.pop().trim().slice(1, -1);
  if (link === "") {
    link = _markdown.pop().trim().slice(1, -1);
  }
  for (i = 0; i < _markdown.length; i++) {
    if (_markdown[i].includes("[OBS Image]") === true) {
      _markdown.splice(i, 1);
    }
  }
  return { title, link, frames: _markdown };
};
