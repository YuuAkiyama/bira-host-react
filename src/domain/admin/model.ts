import type { DocumentData } from "firebase/firestore";

export interface Admin {
  id: string;
  userUid: string;
}

export function adminFromDoc(id: string, doc: DocumentData): Admin {
  return {
    id: id,
    userUid: doc.userUid,
  };
}
