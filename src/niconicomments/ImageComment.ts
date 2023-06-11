import NiconiComments, {
  Context2D,
  FormattedComment,
  Canvas,
} from "@xpadev-net/niconicomments";

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
      for (const image of this.images) {
        const img = new Image();
        img.onload = () => {
          const width = context.measureText(this.raw.slice(0, image.pos));
          context?.drawImage(img, width.width, 0);
        };
        img.src = image.url;
      }
    }
    return image;
  }
}

export { ImageComment };
