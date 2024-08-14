import type { DocumentData } from "firebase/firestore";

export interface User {
  id: string;
  userUid: string;
}

export function adminFromDoc(id: string, doc: DocumentData): User {
  return {
    id: id,
    userUid: doc.userUid,
  };
}
