import { getApp } from 'firebase/app'
import {
  doc,
  Firestore,
  addDoc,
  getDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  orderBy
} from 'firebase/firestore'
import { biraFromDoc, type Bira } from './model'

const COLLECTION_PATH = 'image'

export function NewBiraRepository(): BiraRepository {
  const app = getApp()
  const firestore = getFirestore(app)
  return new BiraRepository(firestore)
}

// NOTE: 実装(infraレイヤー)もここに書く(インターフェースと実装を分けて書くのはもう少し複雑になってきてからにする)
// NOTE: 現状そこまで複雑な操作セットが発生していないので、 serviceレイヤーも設けていない。
class BiraRepository {
  private delegate: Firestore

  constructor(delegate: Firestore) {
    this.delegate = delegate
  }

  async add(data: Omit<Bira, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(this.delegate, COLLECTION_PATH), data)
    console.log(docRef.id, docRef.path)
    return docRef.id
  }

  async get(id: string): Promise<Bira | null> {
    const docRef = doc(this.delegate, COLLECTION_PATH, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return biraFromDoc(docSnap.id, data)
    }

    console.log('ドキュメントが見つかりませんでした')
    return null
  }

  // TODO: エラーの返され方を確認する
  // @link https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja#update-data
  async updateDate(id: string, date: string): Promise<void> {
    const docRef = doc(this.delegate, COLLECTION_PATH, id)
    await updateDoc(docRef, { date })
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(this.delegate, COLLECTION_PATH, id)
    await deleteDoc(docRef)
  }

  // TODO: ページ分割
  // TODO: ネットワークエラーの扱い方(SDKがキャッシュとかうまいこと使うので状況を調べきれてない)
  // NOTE: 検索要件が増えてきたら、model.tsにSearchParamsとして型を設けて整理する
  async list(dateAfter: string): Promise<Bira[]> {
    const q = query(
      collection(this.delegate, COLLECTION_PATH),
      where('date', '>=', dateAfter),
      orderBy('date', 'asc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => biraFromDoc(doc.id, doc.data()))
  }
}
