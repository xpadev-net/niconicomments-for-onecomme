import { config } from "@/utils/config";

const removeHTMLTag = (input: string) => {
  return input.replace(/<.*?>/giu, "");
};

const replaceUserMap = (input: string) => {
  for (const regex of Object.keys(config.replace)) {
    const target = config.replace[regex];
    const re = new RegExp(regex, "gui");
    input = input.replace(re, target);
  }
  return input;
};

export { removeHTMLTag, replaceUserMap };
