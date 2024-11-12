# ビラホスト
PDFをアップロード、管理するSPAアプリ。

# 開発に必要なツール
- make
- Node.js
- v20.16.0で開発(適宜アプデ)
- Firebase CLI

# インフラ構成

- Firebase Hosting: SPAアプリを配信
- Firebase Authentication: 管理者ユーザーの管理
- Cloud Storage for Firebase: PDFの保管、配信
- Firestore: PDFの保管パス管理、管理者ユーザーのID管理

# 環境ごとの設定
- `bira-host-ts`でプロジェクト全体検索をして出てくる箇所を、対象のホスト、ストレージに書き換える。

# 開発で使うコマンド

```sh
# 依存パッケージインストール
npm i

# Firebaseにcliでログイン
firebase login

# Firebaseプロジェクトの選択
firebase use <プロジェクト名>

# 開発モードで起動
make dev

# ビルド
make build

# デプロイ
make deploy

# ビルドしてデプロイ
make build-deploy

# Firestore, Cloud Storageのルールのデプロイ
make deploy-rules
# firestore.rules, storage.rulesで、PDFアップロード・削除が出来るユーザーを限定している.
# request.auth.uidはFirebase AuthenticationのユーザーのUID.
########################################

# Cloud StorageのCORS設定のデプロイ
make cors
# ローカル開発中はcors.jsonのoriginに"*"を追加しておくとlocalhostその他からCloud Storage（PDF）にアクセスできるようになる。
########################################
```