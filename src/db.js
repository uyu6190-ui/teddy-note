// Firestoreへの保存/読込
// 配列の入れ子(手書きの座標など)はFirestoreに直接保存できないため、
// JSON文字列1本にして users/{uid}/data/main に保存します。
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function loadUserData(uid) {
  const snap = await getDoc(doc(db, "users", uid, "data", "main"));
  if (!snap.exists()) return null;
  const j = snap.data().json;
  return j ? JSON.parse(j) : null;
}

export async function saveUserData(uid, data) {
  await setDoc(doc(db, "users", uid, "data", "main"), {
    json: JSON.stringify(data),
    updatedAt: Date.now(),
  });
}
