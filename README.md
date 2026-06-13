# teddy note 🐶 (Firebase版)

カードノートアプリ teddy note の Firebase 連携版です。

- **Googleでログイン** → データはFirestoreに保存され、どの端末からでも同じノートを開けます。画像はFirebase Storageに保存されます
- **ログインなしで使用** → データはブラウザ(localStorage)にのみ保存されます

## 1. Firebaseコンソールでの準備(初回のみ)

https://console.firebase.google.com/ で対象プロジェクトを開き:

1. **Authentication → Sign-in method → Google を有効化**
2. **Firestore Database → データベースを作成**(本番モードでOK)
   - 「ルール」タブに `firestore.rules` の内容を貼り付けて公開
3. **Storage → 始める**
   - 「ルール」タブに `storage.rules` の内容を貼り付けて公開
   - ※Storageの利用にはBlaze(従量課金)プランが必要な場合があります。
     その場合でも画像は自動で端末内形式(dataURL)にフォールバックして動作します
4. **プロジェクトの設定 → 全般 → マイアプリ** で構成値を確認

## 2. 設定ファイル

`.env` の以下2項目をコンソールの値で埋めてください(他は入力済み):

```
VITE_FB_MESSAGING_SENDER_ID=...
VITE_FB_APP_ID=...
```

## 3. 起動

```bash
npm install
npm run dev
```

表示されたURL(通常 http://localhost:5173)を開きます。

公開する場合は `npm run build` で `dist/` を生成し、Firebase Hostingなどに配置します。
ログインが「unauthorized-domain」エラーになる場合は、Authentication → 設定 → 承認済みドメイン に配信先ドメインを追加してください。

## 動作の仕組み

| 項目 | ログインあり | ログインなし |
|---|---|---|
| ノートデータ | Firestore `users/{uid}/data/main`(JSON 1ドキュメント) | localStorage |
| 画像 | Storage `users/{uid}/images/`(URLのみ保存) | dataURLで埋め込み |
| チュートリアル既読 | localStorage | localStorage |

## 注意

- ログインなし⇔ログインありのデータは自動では引き継がれません
- カード削除時、Storage上の画像ファイルは削除されません(資料箱・共有でコピーが参照を共有しているため)。不要画像はコンソールから削除できます

## トラブルシューティング

| 症状 | 対処 |
|---|---|
| Googleログインのポップアップが開かない | ブラウザのポップアップブロックを解除 |
| auth/operation-not-allowed | AuthenticationでGoogleを有効化 |
| auth/unauthorized-domain | 承認済みドメインに追加 |
| 保存に失敗しました | Firestoreルールが公開済みか確認 |
| 画像アップロードに失敗 | Storage未設定でも自動フォールバックで動作します |
