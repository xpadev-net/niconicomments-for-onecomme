import NiconiComments, { formattedComment } from "@xpadev-net/niconicomments";
import "./style.css";
import { CommonData } from "@/@types/comments";

const JSON_PATH = "../../comment.json";
const LIMIT = 1000;

const info = (all: unknown) => {
  const dom = document.createElement("div");
  dom.innerHTML = JSON.stringify(all);
  dom.classList.add("info");
  document.getElementById("app")?.append(dom);
  setTimeout(() => dom.remove(), 10000);
};

const init = async () => {
  const rootElement = document.getElementById("app") as HTMLDivElement;
  if (!rootElement) {
    throw new Error("fail to get root element");
  }
  rootElement.innerHTML = `<canvas id="canvas" width="1920" height="1080"></canvas>`;
  await window.OneSDK.ready();
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) throw new Error("fail to get canvas element");
  window.OneSDK.setup({ jsonPath: JSON_PATH, commentLimit: LIMIT });
  const nico = new NiconiComments(canvas, [], { format: "formatted" });
  const startTime = performance.now();
  setInterval(() => {
    nico.drawCanvas(Math.floor((performance.now() - startTime) / 10));
  }, 10);
  const processedComments: string[] = [];
  window.OneSDK.subscribe({
    action: "comments",
    callback: (comments) => {
      const filter = comments.filter(
        (comment) => !processedComments.includes(comment.data.id)
      );
      try {
        const formattedComments: formattedComment[] = filter.map(
          (comment: CommonData) => {
            processedComments.push(comment.data.id);
            return {
              content: comment.data.comment,
              date: Math.floor(comment.data.timestamp / 1000),
              date_usec: Number(comment.data.timestamp.toString().slice(-3)),
              id: processedComments.length,
              layer: 0,
              mail: ["184"],
              owner: comment.data.isOwner,
              premium: false,
              user_id: -1,
              vpos: Math.floor((performance.now() - startTime) / 10) + 200,
            } as formattedComment;
          }
        );
        nico.addComments(...formattedComments);
      } catch (e) {
        info(e);
      }
    },
  });
  window.OneSDK.connect();
};
window.onload = init;
