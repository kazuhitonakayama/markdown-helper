# GitHub Markdown Helper

GitHubのissueやPRのコメント欄に、便利なMarkdownスニペットボタンを追加するChrome拡張機能

![markdown-helper](https://github.com/user-attachments/assets/bff33ae9-1400-411a-9830-e08604994e63)


## 機能

コメントツールバーに以下のボタンを追加します:

- 📋 **Details/Summary**: 折りたたみ可能なブロックを挿入
- 📊 **Table**: マークダウンテーブルを挿入
- 💡 **Note**: GitHub Flavored Markdownのノートブロックを挿入
- ⚠️ **Warning**: GitHub Flavored Markdownの警告ブロックを挿入

## インストール方法

### 開発版としてインストール

1. このリポジトリをクローンまたはダウンロード
2. Chromeで `chrome://extensions/` を開く
3. 右上の「デベロッパーモード」をON
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. このディレクトリを選択

## 対応サイト

- GitHub.com
- GitHub Enterprise Server (検証済み: v3.19.1)
- その他のGitHub Enterpriseインスタンス

## 使い方

1. GitHubのissueまたはPRページを開く
2. コメント欄をクリックすると、ツールバーにボタンが表示される
3. 挿入したいスニペットのボタンをクリック
4. テンプレートが挿入されるので、内容を編集

## 技術スタック

- Vanilla JavaScript
- Chrome Extension Manifest V3
- CSS3

## ライセンス

MIT
