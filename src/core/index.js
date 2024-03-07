import JSZipUtils from "jszip-utils";
import JSZip from "jszip";

export default async function getStories(_url) {
  let objStories = {};
  const data = await JSZipUtils?.getBinaryContent(_url);
  var zip = new JSZip();
  const response = await zip.loadAsync(data);
  let allStories = {};
  let version = "";
  for (const key in zip.files) {
    if (Object.hasOwnProperty.call(zip.files, key)) {
      if (key.match("/manifest")) {
        const yaml = await zip.files[key].async("string");
        var textarea = yaml.replace(/(\r\n|\n|\r)/gm, ",");

        var yamlArr = textarea.split(",");
        for (i = 0; i < yamlArr.length; i++) {
          if (yamlArr[i].includes("version") === true) {
            version = yamlArr[i];
            start_position = version.indexOf("'");
            end_position = version.lastIndexOf("'");
          }
        }
        let versionFinal = version.substring(start_position[end_position]);
      }

      if (key.match(/\/content\/\d/gm)) {
        const md = await zip.files[key].async("string");

        const name = key.slice(-5, -3);

        let _markdown = md.replaceAll("\u200B", "").split(/\n\s*\n\s*/);
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

        let textosArr = [];
        textosArr = _markdown;

        allStories[name] = { title, link, textosArr };
      }
    }
  }
  objStories["stories"] = { version, allStories };
  return objStories;
}
