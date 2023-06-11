# niconicomments for onecomme


niconicommentsを使ってコメントを表示する配信者向けツールです

## 注意事項
- なにか損害が発生しても一切責任を負いません
- 特許を侵害しないように作成していますが、心配な方は使用しないことをおすすめします  
なんのこっちゃという方は以下のリンクを御覧ください  
  https://github.com/xpadev-net/niconicomments/blob/develop/ABOUT_PATENT.md
- 基本的にニコニコ動画との互換性を重視して作成しているため現状設定項目はありません  
要望などあれば検討しますので作者までご連絡ください

## 特徴
- ニコニコ動画との互換性が高いです  
※ニコニコ生放送との互換性は検証していません

## 使い方
- リリースから最新版のzip(niconicomments_for_onecomme-バージョン.zip)をダウンロード
- zipを解凍
- わんコメ右上の三点リーダーからフォルダを開く
- 開いたフォルダーに解凍したzipフォルダーを放り込む
- テンプレをOBSに追加

## コンフィグ

フォルダー内にあるconfig.jsonを変更してください  
### 使用できるコマンドについて
使用できるコマンドはすべてニコニコ動画の仕様に準拠しています    
一部独自実装のコマンドについては[niconicommentsのドキュメント](https://xpadev-net.github.io/niconicomments/#commands)を参照してください

### commands

指定したフィールドが特定の値の場合にコマンドを適用することが出来ます  
フィールドの仕様は わんコメ公式の技術ドキュメント [Commentの構造](https://onecomme.com/docs/developer/comment-json) を参照してください    
`commands`内に各条件を配列として書き込んでください

データ構造は以下のとおりです
```json
{
  "condition": { //適用する条件
    "object": "isFirstTime", //コメントのどのフィールドを参照するかを指定してください
    "value": true //参照したフィールドが指定された値の場合コマンドが適用されます
  },
  "content": "big red" //適用したいコマンド(スペース区切り)
}
```

### defaultCommand
すべてのコメントにデフォルトで適用されるコマンドを指定します

### 例: 接続開始後最初のコメントの場合、red bigを適用する
```json
{
  "commands": [
    {
      "condition": {
        "object": "isFirstTime",
        "value": true
      },
      "content": "big red"
    }
  ],
  "defaultCommand": ""
}
```


## スペシャルサンクス
[Aka Diffusion](https://github.com/aka7774) さんの[フォーク](https://github.com/aka7774/niconicomments-for-onecomme)から絵文字とHTMLの対応を取り込ませていただきました