export type Comments = CommonData[];

interface CommonData {    //
  id: string              // 視聴枠を識別するためのID
  service: ServiceType    // 配信サイト識別子
  name: string            // わんコメで視聴枠につけた任意の名前
  url: string             // 視聴URL
  data: BaseComment | YouTubeComment | TwicasComment | TwitchComment | ShowRoomComment | BiliBiliComment | MixchComment | MirrativComment | TwitterComment// コメントの共通情報 + 配信サイトごとの追加情報
}

type BaseComment = {
  id: string              // コメントID
  userId: string          // 配信サイトでのユーザー識別ID(匿名の場合もあるため保障されない）
  liveId: string          // [4.0-]配信識別子
  name: string            // ユーザー名
  isFirstTime: boolean    // 接続開始していから最初のコメントかどうか
  isOwner: boolean        // [3.2-]配信者自身かどうか
  displayName?: string    // 表示ユーザー名（わんコメで文字数カットされたユーザー名）
  hasGift: boolean        // ギフトデータをもっているかどうか
  profileImage: string    // プロフィールアイコンURL（名前アイコンに置き換えられることがある）
  originalProfileImage: string // オリジナルのプロフィールアイコンURLの
  badges: BaseBadge[]     // バッジ情報（Listenersのものと同じ）
  timestamp: number       // コメント投稿されたタイムスタンプ（ms）
  comment: string         // コメント本文（HTMLはエスケープ・画像はimgタグになっている）
}
type YouTubeComment = BaseComment & {
  paidText?: string                  // スパチャの金額文字列
  price?: number                     // [3.2-] スパチャの金額（数字のみ
  unit?: string                      // [3.2-] スパチャの通貨単位（¥や$など）
  isModerator?: boolean              // [3.2-] モデレーターかどうか
  colors?: {                         // スパチャに定義されている色情報
    headerBackgroundColor: string;   // それぞれrgba(255,255,255,1)の形で格納
    headerTextColor: string;
    bodyBackgroundColor: string;
    bodyTextColor: string;
    authorNameTextColor: string;
    timestampColor: string;
  }
}
type TwicasComment = BaseComment & {
  item?: {                           // ギフト情報
    name: string;                    // ギフト名
    image: string;                   // ギフト画像URL
    detailImage: string;             // ギフトの詳細画像URL
    effectCommand: string;           // ギフトのエフェクトコマンド
    showsSenderInfo: boolean;        // ギフト情報の表示フラグ？
  }
  price?: number                     // [3.2-] ギフトの価格
  screenName: string                 // [4.0-] ユーザーID (@から始まる名前部分
}
type TwitchComment = BaseComment & {
  bits?: string                      // Cheerされたときの文字列
  price?: number                     // Cheerされたときの数字
  turbo: string;                     // ?
  flags: string;                     // ?
  mod: string;                       // ?
  subscriber: "0" | "1";             // サブスクライバーかどうか
  isModerator: boolean               // [3.2-] モデレーターかどうか
  screenName: string                 // [4.0-] ユーザーID（ユーザー名）
}
type ShowRoomComment = BaseResponse & {
  at?: number     // ?
  d?: number      // ?
  u?: number      // ?
  ua?: number     // ?
  gt?: number     // ?
  g?: number      // ギフトID
  h?: number      // ?
  n?: number      // ギフトの個数
  price?: number  // ギフトの価格
  gift?: GiftData // ギフトのデータ
  giftId?: string // ギフト集計用ID
  countId?: string // カウントコメント管理用ID
  commentVisible?: boolean // 表示コメントかどうか（フリーギフトを表示しない制御
}
type BiliBiliComment = BaseResponse & {
  gift?: {
    id: number;
    name: string;
    price: number;
    type: number;
    coin_type: string;
    bag_gift: number;
    effect: number;
    corner_mark: string;
    corner_background: string;
    broadcast: number;
    draw: number;
    stay_time: number;
    animation_frame_num: number;
    desc: string;
    rule: string;
    rights: string;
    privilege_required: number;
    count_map: CountMap[];
    img_basic: string;
    img_dynamic: string;
    frame_animation: string;
    gif: string;
    webp: string;
    full_sc_web: string;
    full_sc_horizontal: string;
    full_sc_vertical: string;
    full_sc_horizontal_svga: string;
    full_sc_vertical_svga: string;
    bullet_head: string;
    bullet_tail: string;
    limit_interval: number;
    bind_ruid: number;
    bind_roomid: number;
    gift_type: number;
    combo_resources_id: number;
    max_send_limit: number;
    weight: number;
    goods_id: number;
    has_imaged_gift: number;
    left_corner_text: string;
    left_corner_background: string;
    gift_banner?: any;
    diy_count_map: number;
    effect_id: number;
  }
  giftData?: {
    action: string;
    batch_combo_id: string;
    batch_combo_send?: any;
    beatId: string;
    biz_source: string;
    blind_gift?: any;
    broadcast_id: number;
    coin_type: string;
    combo_resources_id: number;
    combo_send?: any;
    combo_stay_time: number;
    combo_total_coin: number;
    crit_prob: number;
    demarcation: number;
    discount_price: number;
    dmscore: number;
    draw: number;
    effect: number;
    effect_block: number;
    face: string;
    float_sc_resource_id: number;
    giftId: number;
    giftName: string;
    giftType: number;
    gold: number;
    guard_level: number;
    is_first: boolean;
    is_special_batch: number;
    magnification: number;
    medal_info: MedalInfo;
    name_color: string;
    num: number;
    original_gift_name: string;
    price: number;
    rcost: number;
    remain: number;
    rnd: string;
    send_master?: any;
    silver: number;
    super: number;
    super_batch_gift_num: number;
    super_gift_num: number;
    svga_block: number;
    tag_image: string;
    tid: string;
    timestamp: number;
    top_list?: any;
    total_coin: number;
    uid: number;
    uname: string;
  }
  infoData?: any[] // 省略
}

type MixchComment = BaseResponse & {
  user?: User | null    // ユーザー情報  
  gift?: GiftResource   // ギフト情報  
  giftData?: any        // ギフト詳細データ  
  price?: number        // ポイント  
}  
type MirrativComment = BaseResponse & {
  isModerator: boolean      // モデレーターかどうか
  commentVisible?: boolean  // コメントの表示制御（フリーギフトの非表示に使用
  price?: number            // ギフトのポイント
}
type TwitterComment = BaseResponse & {
  screenName: string    // ユーザー名
}