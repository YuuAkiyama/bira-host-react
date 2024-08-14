import { NewAdminRepository } from "../domain/admin/repository";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  type User,
  type Unsubscribe,
} from "firebase/auth";

// https://firebase.google.com/docs/auth/web/google-signin?hl=ja#web-modular-api_4

export function listenAuthStateChange(
  callback: (userOrNull: User | null) => void,
): Unsubscribe {
  const auth = getAuth();
  return auth.onAuthStateChanged(callback);
}

export async function login(): Promise<User> {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const userCred = await signInWithPopup(auth, provider);
  const user = userCred.user;
  return user;
}

export async function logout(): Promise<null> {
  const auth = getAuth();
  await signOut(auth);
  return null;
}

export async function isAdmin(userUid: string): Promise<boolean> {
  const api = NewAdminRepository();
  const adminList = await api.list();
  return adminList.findIndex((admin) => admin.userUid === userUid) !== -1;
}
