import { getApp } from "firebase/app";
import {
  Firestore,
  getFirestore,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { adminFromDoc, type Admin } from "./model";

const COLLECTION_PATH = "admin";

export function NewAdminRepository(): AdminRepository {
  const app = getApp();
  const firestore = getFirestore(app);
  return new AdminRepository(firestore);
}

// NOTE: 実装(infraレイヤー)もここに書く(インターフェースと実装を分けて書くのはもう少し複雑になってきてからにする)
// NOTE: 現状そこまで複雑な操作セットが発生していないので、 serviceレイヤーも設けていない。
class AdminRepository {
  private delegate: Firestore;

  constructor(delegate: Firestore) {
    this.delegate = delegate;
  }

  // TODO: ページ分割
  // TODO: ネットワークエラーの扱い方(SDKがキャッシュとかうまいこと使うので状況を調べきれてない)
  // NOTE: 検索要件が増えてきたら、model.tsにSearchParamsとして型を設けて整理する
  async list(): Promise<Admin[]> {
    const q = query(collection(this.delegate, COLLECTION_PATH));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => adminFromDoc(doc.id, doc.data()));
  }
}
