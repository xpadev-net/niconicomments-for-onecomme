import NiconiComments, {
  Context2D,
  FormattedComment,
} from "@xpadev-net/niconicomments";

class ImageComment extends NiconiComments.internal.comments.HTML5Comment {
  constructor(comment: FormattedComment, context: Context2D) {
    super(comment, context);
  }
}

export { ImageComment };
