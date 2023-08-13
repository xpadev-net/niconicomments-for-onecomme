import "vite/modulepreload-polyfill";

import NiconiComments from "@xpadev-net/niconicomments";
import type { FormattedComment } from "@xpadev-net/niconicomments";
import "./style.css";
import { Comments, CommonData } from "@/@types/comments";
import { ImageComment } from "@/niconicomments/ImageComment";
import { initConfig } from "@/utils/config";
import { applyCommands } from "@/utils/command";
import { info } from "@/utils/logger";

const JSON_PATH = "../../comment.json";
const LIMIT = 1000;

const init = async () => {
  const rootElement = document.getElementById("app") as HTMLDivElement;
  if (!rootElement) {
    info("fail to get root element");
    return;
  }
  rootElement.innerHTML = `<canvas id="canvas" width="1920" height="1080"></canvas>`;
  await initConfig;
  await window.OneSDK.ready();
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) {
    info("fail to get canvas");
    return;
  }
  window.OneSDK.setup({ jsonPath: JSON_PATH, commentLimit: LIMIT });
  const nico = new NiconiComments(canvas, [], {
    format: "formatted",
    config: {
      commentPlugins: [{ class: ImageComment, condition: () => true }],
    },
  });
  const startTime = performance.now();
  setInterval(() => {
    nico.drawCanvas(Math.floor((performance.now() - startTime) / 10));
  }, 10);
  const processedComments: string[] = [];
  const commentHandler = (comments: Comments) => {
    const filter = comments.filter(
      (comment) => !processedComments.includes(comment.data.id)
    );
    try {
      const formattedComments: FormattedComment[] = filter.map(
        (comment: CommonData) => {
          processedComments.push(comment.data.id);
          const commands = applyCommands(comment);
          return {
            content: comment.data.comment,
            date: Math.floor(comment.data.timestamp / 1000),
            date_usec: Number(comment.data.timestamp.toString().slice(-3)),
            id: processedComments.length,
            layer: 0,
            mail: commands,
            owner: comment.data.isOwner,
            premium: true,
            user_id: -1,
            vpos: Math.floor((performance.now() - startTime) / 10) + 200,
          } as FormattedComment;
        }
      );
      nico.addComments(...formattedComments);
    } catch (e) {
      info(e);
    }
  };
  window.OneSDK.subscribe({
    action: "comments",
    callback: commentHandler,
  });
  window.OneSDK.connect();
};
window.onload = init;
