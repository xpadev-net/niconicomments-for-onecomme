import NiconiComments, {
  Context2D,
  FormattedComment,
} from "@xpadev-net/niconicomments";

class ImageComment extends NiconiComments.internal.comments.HTML5Comment {
  constructor(comment: FormattedComment, context: Context2D) {
    const images = [];
    let match;
    while ((match = comment.content.match(/<img.*?src="(.*?)".*?>/i))) {
      images.push({
        pos: comment.content.indexOf("<img"),
        url: match[1],
      });
      comment.content.replace(/<img.*?src="(.*?)".*?>/i, "\u2003");
    }
    comment.content = comment.content.replace(/test/, "test");
    super(comment, context);
    console.log(images);
  }
}

export { ImageComment };
