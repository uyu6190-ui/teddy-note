// Googleログイン関連
import {
  GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export const loginGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);
// コールバックでログイン状態を監視(戻り値は解除関数)
export const watchAuth = (cb) => onAuthStateChanged(auth, cb);

// Firebaseのエラーを日本語にする
export const jpAuthError = (e) => {
  const code = (e && e.code) || "";
  const map = {
    "auth/popup-closed-by-user": "ログイン画面が閉じられました。もう一度お試しください。",
    "auth/cancelled-popup-request": "ログイン処理が中断されました。もう一度お試しください。",
    "auth/popup-blocked": "ポップアップがブロックされました。ブラウザの設定を確認してください。",
    "auth/network-request-failed": "ネットワークエラーです。接続を確認してください。",
    "auth/unauthorized-domain": "このドメインは許可されていません。Firebaseコンソールの「承認済みドメイン」を確認してください。",
    "auth/operation-not-allowed": "Googleログインが有効化されていません。Firebaseコンソールで有効にしてください。",
  };
  return map[code] || `ログインに失敗しました(${code || "不明なエラー"})`;
};
