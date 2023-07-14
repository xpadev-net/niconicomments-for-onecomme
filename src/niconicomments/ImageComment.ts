import NiconiComments, {
  Context2D,
  FormattedComment,
  Canvas,
} from "@xpadev-net/niconicomments";
import { decodeSpecialChars } from "@/utils/decodeSpecialChars";
import { removeHTMLTag, replaceUserMap } from "@/utils/replace";

type Image = {
  pos: number;
  url: string;
};

class ImageComment extends NiconiComments.internal.comments.HTML5Comment {
  private readonly images: Image[];
  private readonly raw: string;
  constructor(comment: FormattedComment, context: Context2D) {
    const images: Image[] = [];
    let match;
    while ((match = RegExp(/<img.*?src="(.*?)".*?>/i).exec(comment.content))) {
      images.push({
        pos: comment.content.indexOf("<img"),
        url: match[1],
      });
      comment.content = comment.content.replace(
        /<img.*?src="(.*?)".*?>/i,
        "\u2003"
      );
    }
    comment.content = decodeSpecialChars(
      removeHTMLTag(replaceUserMap(comment.content))
    );
    const raw = comment.content;
    super(comment, context);
    this.images = images;
    this.raw = raw;
  }

  override _generateTextImage(): Canvas {
    const image = super._generateTextImage();
    if (this.images.length > 0) {
      const context = image.getContext("2d");
      if (!context) return image;
      const space = context.measureText("\u2003");
      for (const image of this.images) {
        const img = new Image();
        img.onload = () => {
          const leftSpace = context.measureText(this.raw.slice(0, image.pos));
          const scale = Math.min(
            space.width / img.naturalWidth,
            this.comment.fontSize / img.naturalHeight
          );
          const width = img.naturalWidth * scale;
          const height = img.naturalHeight * scale;
          const paddingLeft = (space.width - width) / 2;
          const paddingTop = (this.comment.fontSize - height) / 2;
          context?.drawImage(
            img,
            0,
            0,
            img.naturalWidth,
            img.naturalHeight,
            leftSpace.width + paddingLeft,
            paddingTop,
            width,
            height
          );
        };
        img.src = image.url;
      }
    }
    return image;
  }
}

export { ImageComment };
