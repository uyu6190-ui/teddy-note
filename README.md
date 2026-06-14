# onote

カードを無限キャンバスに置いて、テキスト・画像・PDF・手書きメモを整理できるノートアプリです。

- データはブラウザの `localStorage` に保存されます
- Google ログインや外部同期はこのプレビュー版では使いません
- Vite + React で動きます

## 起動

```bash
npm install
npm run dev
```

表示された URL、通常は `http://localhost:5173` を開きます。

## ビルド

```bash
npm run build
```

Vercel では Build Command が `npm run build`、Output Directory が `dist` です。
