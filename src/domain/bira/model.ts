import type { DocumentData } from "firebase/firestore";

export interface Bira {
  id: string;
  name: string;
  url: string;
  date: string;
}

export function biraFromDoc(id: string, doc: DocumentData): Bira {
  return {
    id: id,
    name: doc.name,
    url: doc.url,
    date: doc.date,
  };
}
