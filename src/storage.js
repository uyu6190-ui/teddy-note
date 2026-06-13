// 画像の保存先を自動で切り替える:
//  - Googleログイン中 → Firebase Storage にアップロードしてURLを返す
//  - ログインなし     → dataURL(端末内のlocalStorageに収まる形式)を返す
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth } from "./firebase";

const readAsDataURL = (file) => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(r.result);
  r.onerror = rej;
  r.readAsDataURL(file);
});

export async function fileToSrc(file) {
  const u = auth.currentUser;
  if (!u) return readAsDataURL(file);
  try {
    const path = `users/${u.uid}/images/${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const r = ref(storage, path);
    await uploadBytes(r, file);
    return await getDownloadURL(r);
  } catch (e) {
    console.error("Storageへのアップロードに失敗したため、端末内形式で保存します", e);
    return readAsDataURL(file);
  }
}
