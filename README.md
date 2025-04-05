# RefineChat　– Chrome Extension for Chatwork × ChatGPT
## 概要
Chatwork上のメッセージ入力をOpenAI APIでリアルタイムに要約・校正できるChrome拡張機能。

## 主な機能
- Chatworkの入力欄のテキストをリアルタイムで取得
- GPTによる要約・校正（OpenAI API使用）
- 文章を編集・確認してから、Chatworkの入力欄に反映
- モーダルUIで一画面完結（テキスト入力欄の左下に常時表示）

## セットアップ
1. リポジトリをクローン
```bash
git clone https://github.com/yourusername/chat-refine.git
cd chat-refine
```

2. 依存パッケージをインストール
```bash
npm install
```

3. 環境変数の設定
```bash
cp .env.example .env
```
`.env`ファイルを開き、`OPENAI_API_KEY`に自分のOpenAI APIキーを設定。

4. ビルド
```bash
npm run build
```

5. Chrome拡張機能としてインストール
- Chromeで`chrome://extensions`を開く
- 「デベロッパーモード」をオンにする
- 「パッケージ化されていない拡張機能を読み込む」をクリックし、`dist`ディレクトリを選択

## 開発
```bash
npm run watch
```

## セキュリティに関する注意
- `.env`ファイルには機密情報が含まれるため、絶対にGitリポジトリにコミットしないこと。
- `.env`ファイルは`.gitignore`に含まれていますが、誤ってコミットしないよう注意すること。
- APIキーは定期的に更新すること。
