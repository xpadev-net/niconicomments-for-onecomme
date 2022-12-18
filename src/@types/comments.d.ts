export type Comments = CommonData[];

export type CommonData = {
  //
  id: string; // 視聴枠を識別するためのID
  service: ServiceType; // 配信サイト識別子
  name: string; // わんコメで視聴枠につけた任意の名前
  url: string; // 視聴URL
  data: BaseComment; // コメントの共通情報 + 配信サイトごとの追加情報
};

type BaseComment = {
  id: string; // コメントID
  userId: string; // 配信サイトでのユーザー識別ID(匿名の場合もあるため保障されない）
  liveId: string; // [4.0-]配信識別子
  name: string; // ユーザー名
  isFirstTime: boolean; // 接続開始していから最初のコメントかどうか
  isOwner: boolean; // [3.2-]配信者自身かどうか
  displayName?: string; // 表示ユーザー名（わんコメで文字数カットされたユーザー名）
  hasGift: boolean; // ギフトデータをもっているかどうか
  profileImage: string; // プロフィールアイコンURL（名前アイコンに置き換えられることがある）
  originalProfileImage: string; // オリジナルのプロフィールアイコンURLの
  badges: BaseBadge[]; // バッジ情報（Listenersのものと同じ）
  timestamp: number; // コメント投稿されたタイムスタンプ（ms）
  comment: string; // コメント本文（HTMLはエスケープ・画像はimgタグになっている）
};
