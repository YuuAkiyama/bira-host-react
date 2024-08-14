import { getApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  type FirebaseStorage,
  deleteObject,
} from "firebase/storage";
import { BUCKET_NAME } from "./firebase";

export function NewStorage(): Storage {
  const app = getApp();
  const storage = getStorage(app, BUCKET_NAME);
  return new Storage(storage);
}

class Storage {
  private delegate: FirebaseStorage;

  constructor(delegate: FirebaseStorage) {
    this.delegate = delegate;
  }

  async upload(file: File, path: string): Promise<string> {
    const uploadRef = ref(this.delegate, path);

    const result = await uploadBytes(uploadRef, file, {
      cacheControl: "public,max-age=604800" /** 1週間 */,
      // contentDisposition: 'attachment'
    });
    return result.metadata.fullPath;
  }

  async getDownloadURL(path: string): Promise<string> {
    const url = await getDownloadURL(ref(this.delegate, path));
    return url;
  }

  async delete(path: string): Promise<void> {
    const objectRef = ref(this.delegate, path);
    await deleteObject(objectRef);
  }
}
