import React, { useState, useRef, useEffect } from "react";

/* ============================================================
   onote 🐶 — カードノートアプリ (Artifactプレビュー版)
   - 無限キャンバス × カード(テキスト/画像/PDF)
   - カード内の文字・画像も「子カード」: 移動/拡縮/接続/複製/
     削除/外に出して独立カード化 がすべて可能
   - 連結チェーンの1枚目をダブルタップでまとめ/展開
   - 資料箱(全ノート共有) / 共有(他ノートへ送信)
   ============================================================ */

const LOGO_SRC = "data:image/jpeg;base64,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";
const ICON_TEXT = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCABgAGADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3GiiigAooooAKKKKACiiigAooooAKKKKACiiigAori9R+KPhXT7ye1mvJXkhYq5jhZhuHUA0kPxV8HS4zqhjz/fgcY/SgDtaK5VviN4PVN39vWpGM8bifyxUa/EzwcxI/tuEY7lHA/lQB11FctD8RvB87qsevWuW6E7gPzI4rcsdW03UFDWN/a3AP/PKZW/kaALtFFFABRRRQAUUUUAc1eeAvC97eT3d1o8Ek05zITkAn1wD1qnc/C/wfcR7DpCx4GA0crqf512NFAHBp8IvB6spNnO2BjBuG5ql4p+GfhSz8O6nd22nbJobV3jJnfCsFJz1r0msHx5KIPBmsyFQ2LSQYPuMUAeT/AAp+H2geJNAuLvUlnadLpkHlylQF2jjH41tX/wAELXcX0nWZ4D1CzRhsfiCK1vgQp/4QqR9u1WvJMe/CjP8An0r0agDxdPhh41tm8u28TL5Q5H+kyryOnGOK9L8G6VqekaQLfWdQa+uS5beSTtHpk8n/AOvW7RQAUUUUAFFFFABRRRQAVyfxUuGtvAOruq7i0QQ/QsAf0rrK4r4xNt+H2ogOVLGMAD+L5xxQBH8FkZfAFmzfxySsB6Dcf8K7muN+EClfh9pee4c/+PtXZUAFFFFABRRRQAUUUUAFFFFABXEfGVXb4f6gEOPmjLcZ43iu3rmPiZateeBdXiRXZvJ3gIMklSD/AEoArfCMg/D7ScZ4Rxz/AL7V2FcX8Ho5I/AOnrKjKd0hAbrjea7SgAooooAKKKKACiiigAooooAKOvWiigBAAAAAAB2FLRRQAUUUUAFFFFAH/9k=";
const ICON_IMG = "data:image/jpeg;base64,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";
const ICON_CAM = "data:image/jpeg;base64,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";
const ICON_PDF = "data:image/jpeg;base64,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";
const ICON_BOX = "data:image/jpeg;base64,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";
const ICON_PEN = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCABgAGADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3GiiigAooooAKKKKACiikJABJIAHUmgBaK8tuLF/H/iya/N3Kvh6w/wBGjjR2Vbp+dzgqR0OMHnpV/wCFmtX11d6vos9wb2z02Ux2123LFQxAUt3OO/tQB6HRRRQAUUUUAFFFFABRRRQAVw/jfUbnVr6Pwjozsk06h9RuV6W8HcZ/vN0FbXjHxB/YGliS3iFxqFw4hs7bPMsh6fgOprI0PT4PCmjXd/q90r3c7G51C6Y/ec9h7DoBTSAreLNRHhrRLPRdAtg19eD7LYwL/DxgufpnP1rofBfhu38LaDBp0GGkA3zy45kkPU1zfw9ik8RareeMNQhZQxNvpiP/AMs4R1YD1Y9/avQaGwCiiikAUUUUAFFFFABUN3cw2drLc3UixwxKXd26ACpq4nXpD4q1k6JCWGl2EivqEg6TOOViHt3NAEHhy3l1/Vn8V6pCyZBj0yCT/ljD/fx/eb+VYmqi6+IviI6RYgp4f06YfbbjOBM46qvr6frWv8RNYurGystG0ZlTUtTlEEW3rGnQsPT0rqPCXh+38M6JDptsxkK5aSVusjnqabEa0MUcEKQwoqRxqFRVGAoHQCn0UUhhRRRQAUUUUAFFFV9QvbfTrOW7vJBHBEu5mNAGN4x1iewtIbLTCp1W/fyrZTzt/vOfYCqJk03wV4caW7mIhi+aSRuXnkPX6kmm+HraS8urnxDqURS5uSRbrJ1ggHQexPU1gpazfEbXbed4TH4X02Vijseb2UcZA/ujnn61Wwib4Y6LLqdxceL9djdr65kP2RZc/uY/9kdvT8K9JpFVUUKgCqowAOgFLUjCiiigAooooAKKKKACvM/GPigP43stDvFhj0a3mje5uHJx5pUsqMegHQ16Fqt/b6Xp1xf3kixwQRl3ZjgcV5nYbb7w+dKW3W71/XpPtl3vjDraI5+VmJ4G1MbR1zQBf1O/m8ZayPDvh/UBHpywebqV9bkMdrcLEh6AnnJ9K73TNPttK0+3sLGMRW1ugjjQdgKp+GvDmmeGtP8Asek2yxKTukf+KVsfeY+ta1ABRRRQAUUUUAFFFFABRRRQB5r8Y4NS14aV4X0eJmlvJDNK7AiNUTpuPpk5/AV1XgjwxD4V0OGxVxNckBri4xzI/wDgOgFdBRQAUUUUAFFFFABRRRQAUUUUAf/Z";
const ICON_UNDO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCABgAGADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3GiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorN8Rar/Ymi3eoi2kuTAhYQx/ec9hXG+H/AIvaDqC7NWD6XPnGJMuh/wCBAcfjQB6JRVbT7+z1K3Fxp9zFcwno8Thh+lWaACiivLfE3i3W9e1yfw54RTaFyklyvDZH3sN0Uds0AekXeo2NkCby8t4AOvmyqv8AM1hz+P8Awpby+VJrdtuxn5dzD8wMVx+nfBq3lQTa/qlxNcty4hPH/fTAk1uxfCfwlGuDZzvx1adv6UAXR8SfB5/5jcP/AH7f/wCJqvN8U/B8TY/tQv7pC5H8qj/4VP4Rxj7DN/3/AG/xqZfhf4OC4OkBvczyZ/8AQqAFh+KHg6UZ/thE9nicf0qaX4keEY4y51qJh6Kjk/yqnP8ACnwfMQRprx47JO/P5mnJ8K/CKEH+z3YDsZ3wf1oAfH8UPB0ignV1XPZoXyP0rmfEer/C3Xy8t86tOes1vC6SH8QOfxrpW+Fvg9jn+ytv0nk/xqLUPAHgrS9Oub6fSUWK3iaRyZ5OgGf71AHl3gzUG0r4gw2Hgq+uLywuXUSR3KFfl75HsP4q+ia8X+A+kxT6pq+urCsaZ8qFBkhdx3HBPoMD8a9ooAZNuET7PvbTj615v8FVjNtq0jhftZuAHP8AFj/9ea9LryvW9H1nwRrV1rvh5PO06Y7p4cZ2ZOSCPTPQjpQB6pRXLeHfHmi61aiSS5is5x9+GdwuPoTwRXRQ3dtPjybiGTPTY4OfyoAnooooAKKKKACvJfi3d67q2t2nhTTYmS0ughdwpxISe57KMc161RQBjeEvD9t4Y0K30y1+byxmSTGDI56sf89MVs0UUAFIQGBBAIPBBpaKAON1v4baBqkrTRxyWUjdfs5AUn12kVV0j4aW2l30FzDqly3lOG2lACcds13lFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9k=";
const ICON_REDO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCABgAGADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3GiiigAooooAKKKKACiiigAooooAKKKKACiiquo6lZaXbm41G7htoRxvlcKKALVFeceIPi/odhiPR431WbPIjyij8SOfwFdzomof2tpNpf+RJB9ojDmKQYZD3BoAvUUUUAFFFFABRRRQAUUUUAIc4OOtfOfiS/XWfH11a+Or+5tbW1dljhtkLYAPAXsMjnNfRteJfHDS4LLxLpOuywLNBKNk0ZyAxQ5wcc8g/pQBseHNa+F/h8o+nuiTjpNPC7yD8SOPwro5Pij4OjUkasGx2WF8/yplt8O/BV/aQ3UOlI0U0YdGE8nIIyP4qenwu8HKc/wBk5+s8n+NAE8fxH8IvGH/tqFQezI4P8qgm+KPg6ID/AInCvnskTn+lRv8ACrwi5P8AxL5AD2E7cfrRB8KfB8Oc6a0mf+ek78fkaAHQ/FPwfKcf2ps93hcf0qwfiT4PH/Mbh/79v/8AE1C3wu8HMu0aSF91nkz/AOhVD/wqfwjj/jxm/wC/7f40Aadv4+8KXMvlRa3bbv8Aayo/MgCty01CyvQDZ3dvOD0MUob+RrjpvhN4SkUhbSeMkdUnbj86wdR+Dcduvn+HdVuIblOVWZsA/wDAlAIoA9YorzHwl4v1nTNdi8NeLU/eHCRXB+8WP3cnowPrXp1ABWF408NW/irQptOnISQ/NDKRny3HQ/0Psa3aKAPKvg9qGuWd/eeGNVidrexVvLdlP7shsbQe4PUV6rRRQAUUUUAFFFFABRUE17awZ8+5hjx13yAY/Oua8S+PtG0W1LQXEd9ctwkUDg/iSOAKAOd+MSot5oMsIX7Z5+Fx94jK4/WvTh0ry7w5omseLddtvEfiRPKtYcPbwEY3YORgdh3yeteo0AFFFFABRRRQAUUUUAFFFFAHAal8MbbUbqaebVbkeY5bAQEjPvV/Q/hzoOkyrM0T3kq/dNyQwB9QMYrsKKAADAwKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Z";
const ICON_SHARE = "data:image/jpeg;base64,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";

/* ---- テーマ(白・黒・グレー・薄水色) ---- */
const CANVAS_BG = "#43464c";      // キャンバス: 暗いグレー(格子なし)
const SURFACE = "#ffffff";
const INK = "#3f4750";
const SUBTLE = "#9aa3ae";
const BORDER = "#e4e8ed";
const ACCENT = "#a7c9db";
const ACCENT_DEEP = "#6f9cb5";
const ACCENT_SOFT = "#e3eef5";
const EDITOR_BG = "#eef1f4";
const CARD_DEFAULT = "#ffffff";
const PANEL = "#ffffff";
const LIGHT_TXT = "#d9dde2";      // 暗いキャンバス上の文字
const SERIF = "Georgia, 'Times New Roman', 'Hiragino Mincho ProN', serif";

// テキストカード用フォント
const FONT_OPTIONS = [
  { id: "sans",   label: "ゴシック", css: "'Hiragino Sans','Noto Sans JP',sans-serif" },
  { id: "mincho", label: "明朝",     css: "'Hiragino Mincho ProN','Yu Mincho',serif" },
  { id: "round",  label: "丸文字",   css: "'Hiragino Maru Gothic ProN','Yu Gothic',sans-serif" },
  { id: "serif",  label: "セリフ",   css: "Georgia,'Times New Roman',serif" },
];
const fontCss = (id) => (FONT_OPTIONS.find((f) => f.id === id) || FONT_OPTIONS[0]).css;

// リッチテキストの描画(部分ごとに色・フォントが違う場合)
function RichText({ runs, text, baseColor, baseFont }) {
  if (runs && runs.length) {
    return runs.map((r, i) => (
      <span key={i} style={{
        color: r.color || baseColor, fontFamily: r.font ? fontCss(r.font) : undefined,
      }}>{r.text}</span>
    ));
  }
  return text;
}
// runs ⇄ プレーン文字列
const runsToText = (runs) => (runs || []).map((r) => r.text).join("");

const isDarkColor = (hex) => {
  if (!hex || hex === "transparent" || hex[0] !== "#") return false;
  const m = hex.slice(1);
  if (m.length < 6) return false;
  const r = parseInt(m.slice(0, 2), 16), g = parseInt(m.slice(2, 4), 16), b = parseInt(m.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b < 140;
};

let _seq = 1;
const uid = () => "id" + _seq++ + "_" + Date.now().toString(36);

const defaultNoteName = () => {
  const d = new Date();
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日${d.getHours()}時のノート`;
};

const STAGE_W = 800;
const STAGE_H = 600;

/* カード = 唯一のデータ構造。parentIdがあれば他カードの中の子カード */
const newCard = (type, x, y, extra = {}) => ({
  id: uid(),
  type,                 // text | image | pdf | web
  parentId: null,
  x, y,
  w: type === "text" ? 230 : 240,
  h: type === "text" ? 160 : 170,
  color: null,          // テキストカード背景色
  text: null,           // 文字内容(子テキストカード等)
  textColor: "#3f4750",
  fontSize: 46,
  src: null,            // 画像
  fileName: null,       // PDF
  url: null,
  strokes: [],          // 手書き {id,color,width,points}
  pinned: false,
  tags: [],
  next: null,           // 接続先(矢印は1枚から1本・同じ親同士のみ)
  collapsed: false,
  ...extra,
});

/* ---------- 接続チェーン ---------- */
const buildIncoming = (cards) => {
  const inc = {};
  cards.forEach((c) => { if (c.next) inc[c.next] = c.id; });
  return inc;
};
const chainFrom = (cards, headId) => {
  const map = Object.fromEntries(cards.map((c) => [c.id, c]));
  const out = [];
  let cur = headId;
  const seen = new Set();
  while (cur && map[cur] && !seen.has(cur)) {
    seen.add(cur);
    out.push(map[cur]);
    cur = map[cur].next;
  }
  return out;
};

/* ---------- バンドル(親+子)操作 ---------- */
const childrenOf = (cards, id) => cards.filter((c) => c.parentId === id);
const collectBundle = (cards, rootId) => {
  const root = cards.find((c) => c.id === rootId);
  return root ? [root, ...childrenOf(cards, rootId)] : [];
};
const cloneBundle = (bundle, pos) => {
  const map = {};
  bundle.forEach((c) => { map[c.id] = uid(); });
  return bundle.map((c, i) => ({
    ...c,
    id: map[c.id],
    parentId: c.parentId ? (map[c.parentId] || null) : null,
    next: i === 0 ? null : (c.next && map[c.next] ? map[c.next] : null),
    collapsed: false,
    pinned: i === 0 ? false : c.pinned,
    ...(i === 0 && pos ? { x: pos[0], y: pos[1] } : {}),
    strokes: c.strokes.map((s) => ({ ...s, id: uid(), points: s.points.map((p) => [...p]) })),
    tags: [...c.tags],
  }));
};

/* ---------- 旧データ形式からの移行 ---------- */
const migrateCard = (c) => {
  const base = {
    ...newCard(c.type || "text", c.x || 0, c.y || 0),
    ...c,
    parentId: c.parentId || null,
    text: typeof c.text === "string" ? c.text : null,
    strokes: c.strokes || [],
    tags: c.tags || [],
  };
  const kids = [];
  (c.texts || []).forEach((t) => {
    kids.push({
      ...newCard("text", t.x, t.y, { parentId: base.id }),
      w: 320, h: t.size * 1.6 + 20, color: "transparent",
      text: t.text, textColor: t.color || INK, fontSize: t.size || 44,
    });
  });
  (c.images || []).forEach((im) => {
    kids.push({
      ...newCard("image", im.x, im.y, { parentId: base.id }),
      w: im.w, h: im.h, src: im.src,
    });
  });
  delete base.texts;
  delete base.images;
  return [base, ...kids];
};

/* ============================================================
   カード描画(キャンバスのサムネ / 閲覧 / 編集の共通ステージ)
   子カードは親の800x600座標系の中で描画される
   ============================================================ */
// 鉛筆風のざらざらフィルタ(SVG)。idはユニークに
function PencilDefs({ id }) {
  return (
    <defs>
      <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  );
}
// 1本のストローク描画(鉛筆=ざらつき+半透明の二重描き)
function Stroke({ s }) {
  const pts = s.points.map((p) => p.join(",")).join(" ");
  const kind = s.kind || (s.pencil ? "pencil" : "pen"); // 旧データ互換
  if (kind === "pencil") {
    const fid = "pcl_" + s.id;
    return (
      <g>
        <PencilDefs id={fid} />
        <polyline points={pts} fill="none" stroke={s.color} strokeWidth={s.width}
          strokeLinecap="round" strokeLinejoin="round" opacity="0.55" filter={`url(#${fid})`} />
        <polyline points={pts} fill="none" stroke={s.color} strokeWidth={s.width * 0.6}
          strokeLinecap="round" strokeLinejoin="round" opacity="0.4" filter={`url(#${fid})`} />
      </g>
    );
  }
  if (kind === "marker") {
    // マーカー: 太め・30%不透明・四角い筆先で重ね塗りすると濃くなる
    return (
      <polyline points={pts} fill="none" stroke={s.color} strokeWidth={s.width}
        strokeLinecap="butt" strokeLinejoin="round" opacity="0.3" />
    );
  }
  return (
    <polyline points={pts} fill="none" stroke={s.color} strokeWidth={s.width}
      strokeLinecap="round" strokeLinejoin="round" />
  );
}

function ChildView({ ch }) {
  return (
    <div style={{
      position: "absolute", left: ch.x, top: ch.y, width: ch.w, height: ch.h,
      borderRadius: 10, overflow: "hidden",
      background: ch.type === "image" ? "#fff" : (!ch.color || ch.color === "transparent" ? "transparent" : ch.color),
    }}>
      {ch.type === "image" && ch.src && (
        <img src={ch.src} alt="" draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      )}
      {(typeof ch.text === "string" && ch.text !== "" || (ch.runs && ch.runs.length)) && (
        <div style={{
          fontSize: ch.fontSize || 44, color: ch.textColor || INK, fontWeight: 700,
          whiteSpace: "pre-wrap", lineHeight: 1.3, padding: 6,
          fontFamily: fontCss(ch.font),
          writingMode: ch.vertical ? "vertical-rl" : "horizontal-tb",
        }}><RichText runs={ch.runs} text={ch.text} baseColor={ch.textColor || INK} baseFont={ch.font} /></div>
      )}
      {ch.strokes.length > 0 && (
        <svg viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} width="100%" height="100%" preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0 }}>
          {ch.strokes.map((s) => <Stroke key={s.id} s={s} />)}
        </svg>
      )}
    </div>
  );
}

function CardStage({ card, subCards = [], w, h, hint = false }) {
  const sx = w / STAGE_W, sy = h / STAGE_H;
  const hasColor = card.color && card.color !== "transparent";
  const bg =
    card.type === "text" ? (card.color === "transparent" ? "transparent" : (card.color || CARD_DEFAULT)) :
    card.type === "web" ? "#eef6ee" :
    hasColor ? card.color : "#ffffff"; // 画像/PDFは色を縁(下地)として表示
  const dark = card.type === "text" && isDarkColor(card.color);
  const empty = !card.text && card.strokes.length === 0 && subCards.length === 0;
  const frame = hasColor && (card.type === "image" || card.type === "pdf"); // 縁取り表示
  return (
    <div style={{ width: w, height: h, overflow: "hidden", position: "relative", background: bg }}>
      <div style={{
        width: STAGE_W, height: STAGE_H, position: "relative",
        transform: `scale(${sx}, ${sy})`, transformOrigin: "0 0", pointerEvents: "none",
      }}>
        {hint && card.type === "text" && empty && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 44,
            color: card.color === "transparent" ? "rgba(154,163,174,0.85)" : dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.26)",
            fontWeight: 600,
          }}>ダブルタップで編集</div>
        )}
        {card.type === "image" && card.src && (
          <img src={card.src} alt="" draggable={false}
            style={{ position: "absolute", inset: frame ? 18 : 0, width: frame ? "auto" : STAGE_W, height: frame ? "auto" : STAGE_H, objectFit: "cover" }} />
        )}
        {card.type === "pdf" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ fontSize: 120 }}>📄</div>
            <div style={{ fontSize: 36, color: "#c0392b", fontWeight: 700, padding: "0 40px", textAlign: "center", wordBreak: "break-all" }}>
              {card.fileName || "PDFファイル"}
            </div>
          </div>
        )}
        {card.type === "web" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ fontSize: 110 }}>🌐</div>
            <div style={{ fontSize: 32, color: "#2c7a2c", padding: "0 40px", textAlign: "center", wordBreak: "break-all" }}>{card.url}</div>
          </div>
        )}
        {/* カード自身の文字(子から独立したテキストカードなど) */}
        {(typeof card.text === "string" && card.text !== "" || (card.runs && card.runs.length)) && (
          <div style={{
            position: "absolute", inset: 0, padding: 34,
            fontSize: card.fontSize || 46, color: card.textColor || (dark ? "#fff" : INK),
            fontWeight: 700, whiteSpace: "pre-wrap", lineHeight: 1.3,
            fontFamily: fontCss(card.font),
            writingMode: card.vertical ? "vertical-rl" : "horizontal-tb",
          }}><RichText runs={card.runs} text={card.text} baseColor={card.textColor || (dark ? "#fff" : INK)} baseFont={card.font} /></div>
        )}
        {/* 子カード */}
        {subCards.map((ch) => <ChildView key={ch.id} ch={ch} />)}
        {/* 手書き */}
        <svg width={STAGE_W} height={STAGE_H} style={{ position: "absolute", inset: 0 }}>
          {card.strokes.map((s) => <Stroke key={s.id} s={s} />)}
        </svg>
      </div>
    </div>
  );
}

/* ---------- チュートリアル ---------- */
const TutStyle = () => (
  <style>{`
    @keyframes tutpulse {
      0%, 100% { box-shadow: 0 0 0 4px rgba(111,156,181,0.5); }
      50% { box-shadow: 0 0 0 11px rgba(111,156,181,0.1); }
    }
    .tut-glow {
      animation: tutpulse 1.5s ease-in-out infinite;
      outline: 2.5px solid #6f9cb5 !important;
      outline-offset: 2px;
      position: relative;
      z-index: 60;
    }
  `}</style>
);

function TutBubble({ no, title, desc, onSkip, style, btn }) {
  return (
    <div style={{
      position: "fixed", left: "50%", transform: "translateX(-50%)", zIndex: 500,
      background: "#fff", borderRadius: 16, boxShadow: "0 12px 36px rgba(20,24,30,0.4)",
      padding: "12px 16px", width: 264, boxSizing: "border-box", ...style,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ background: ACCENT_DEEP, color: "#fff", borderRadius: 10, fontSize: 10, fontWeight: 800, padding: "2px 8px", flexShrink: 0, letterSpacing: 1 }}>
          {no ? `STEP ${no}/5` : "🎉"}
        </span>
        <span style={{ fontWeight: 700, fontSize: 13, color: INK }}>{title}</span>
      </div>
      <div style={{ fontSize: 11.5, color: "#5a6470", lineHeight: 1.75, marginTop: 6 }}>{desc}</div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10, marginTop: 8 }}>
        {btn}
        {onSkip && (
          <button onClick={onSkip} style={{ border: "none", background: "none", color: SUBTLE, fontSize: 11, cursor: "pointer" }}>
            チュートリアルをスキップ
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- 共通ダイアログ・トースト ---------- */
function PromptDialog({ title, initial = "", onOk, onClose }) {
  const [v, setV] = useState(initial);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(40,44,50,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 18, width: 300, overflow: "hidden", boxShadow: "0 14px 50px rgba(30,35,42,0.4)" }}>
        <div style={{ padding: "18px 18px 6px", textAlign: "center", fontWeight: 700, fontSize: 15, color: INK }}>{title}</div>
        <div style={{ padding: "8px 18px 16px" }}>
          <input autoFocus value={v} onChange={(e) => setV(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && v.trim()) { onOk(v.trim()); onClose(); } }}
            style={{ width: "100%", boxSizing: "border-box", padding: "9px 11px", border: `1px solid #ccd4dc`, borderRadius: 10, fontSize: 14 }} />
        </div>
        <div style={{ display: "flex", borderTop: `1px solid ${BORDER}` }}>
          <button onClick={onClose} style={{ flex: 1, padding: 13, border: "none", background: "none", color: ACCENT_DEEP, fontSize: 15, cursor: "pointer", borderRight: `1px solid ${BORDER}` }}>キャンセル</button>
          <button onClick={() => { if (v.trim()) { onOk(v.trim()); onClose(); } }}
            style={{ flex: 1, padding: 13, border: "none", background: "none", color: ACCENT_DEEP, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>OK</button>
        </div>
      </div>
    </div>
  );
}

function ConfirmDialog({ message, onOk, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(40,44,50,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 18, width: 280, overflow: "hidden", boxShadow: "0 14px 50px rgba(30,35,42,0.4)" }}>
        <div style={{ padding: "20px 18px 16px", textAlign: "center", fontSize: 14, color: INK }}>{message}</div>
        <div style={{ display: "flex", borderTop: `1px solid ${BORDER}` }}>
          <button onClick={onClose} style={{ flex: 1, padding: 13, border: "none", background: "none", color: ACCENT_DEEP, fontSize: 15, cursor: "pointer", borderRight: `1px solid ${BORDER}` }}>キャンセル</button>
          <button onClick={() => { onOk(); onClose(); }}
            style={{ flex: 1, padding: 13, border: "none", background: "none", color: "#d04030", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>OK</button>
        </div>
      </div>
    </div>
  );
}

// リッチテキスト編集: 範囲選択して色・フォントを部分適用できる contentEditable
// 値は runs [{text,color?,font?}] で保持。onApplyで現在の選択範囲に属性を当てる
function RichEditable({ initialRuns, initialText, baseColor, baseFont, fontSize, style, registerApply }) {
  const ref = React.useRef(null);
  const runsRef = React.useRef(
    (initialRuns && initialRuns.length) ? initialRuns.map((r) => ({ ...r }))
      : [{ text: initialText || "" }]
  );

  // runs から DOM(spanの集合)を構築
  const render = () => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";
    runsRef.current.forEach((r) => {
      const span = document.createElement("span");
      span.textContent = r.text;
      if (r.color) span.style.color = r.color;
      if (r.font) span.style.fontFamily = fontCss(r.font);
      span.dataset.color = r.color || "";
      span.dataset.font = r.font || "";
      el.appendChild(span);
    });
    if (!runsRef.current.length || runsRef.current.every((r) => !r.text)) {
      el.innerHTML = "";
    }
  };

  React.useEffect(() => { render(); /* 初回のみ */ }, []);

  // DOM → runs(各テキストノードを runs 化)。文字ごとの属性を集約
  const readChars = () => {
    const el = ref.current;
    const chars = [];
    el.childNodes.forEach((node) => {
      const color = node.dataset ? node.dataset.color : "";
      const font = node.dataset ? node.dataset.font : "";
      const txt = node.textContent || "";
      for (const c of txt) chars.push({ ch: c, color, font });
    });
    return chars;
  };
  const charsToRuns = (chars) => {
    const runs = [];
    chars.forEach((c) => {
      const last = runs[runs.length - 1];
      if (last && (last.color || "") === (c.color || "") && (last.font || "") === (c.font || "")) {
        last.text += c.ch;
      } else {
        runs.push({ text: c.ch, color: c.color || undefined, font: c.font || undefined });
      }
    });
    return runs;
  };

  // 現在の選択範囲(文字インデックス)を取得
  const getSelRange = () => {
    const el = ref.current;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    const range = sel.getRangeAt(0);
    if (!el.contains(range.startContainer)) return null;
    const idxOf = (container, offset) => {
      let count = 0, found = -1;
      const walk = (node) => {
        if (found >= 0) return;
        if (node.nodeType === 3) {
          if (node === container) { found = count + offset; return; }
          count += node.textContent.length;
        } else {
          node.childNodes.forEach(walk);
        }
      };
      el.childNodes.forEach(walk);
      return found < 0 ? count : found;
    };
    const a = idxOf(range.startContainer, range.startOffset);
    const b = idxOf(range.endContainer, range.endOffset);
    return [Math.min(a, b), Math.max(a, b)];
  };

  // 選択範囲に属性を適用
  const apply = (attr) => {
    const sel = getSelRange();
    const chars = readChars();
    if (!sel || sel[0] === sel[1]) return false; // 範囲未選択
    for (let i = sel[0]; i < sel[1] && i < chars.length; i++) {
      if (attr.color !== undefined) chars[i].color = attr.color;
      if (attr.font !== undefined) chars[i].font = attr.font;
    }
    runsRef.current = charsToRuns(chars);
    render();
    return true;
  };

  // 現在のrunsを返す(確定時に親が読む)
  const getRuns = () => {
    const chars = readChars();
    return charsToRuns(chars);
  };

  React.useEffect(() => {
    if (registerApply) registerApply({ apply, getRuns });
  });

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      data-empty-text="テキストを入力"
      onInput={() => { runsRef.current = getRuns(); }}
      style={{
        ...style,
        outline: "none", whiteSpace: "pre-wrap", cursor: "text",
        color: baseColor, fontFamily: fontCss(baseFont), fontSize,
      }}
    />
  );
}

const Toast = ({ msg }) => !msg ? null : (
  <div style={{
    position: "fixed", bottom: 100, left: "50%", transform: "translateX(-50%)", zIndex: 300,
    background: "rgba(63,71,80,0.94)", color: "#fff", padding: "10px 20px", borderRadius: 20,
    fontSize: 13, boxShadow: "0 4px 16px rgba(0,0,0,0.4)", maxWidth: "85%", textAlign: "center",
  }}>{msg}</div>
);

/* ============================================================
   カードエディタ(全画面)
   - 子カード: 選択/ドラッグ移動/角で拡縮/右の○から接続/
     長押しで複製・削除/タップで文字編集/ダブルタップで開く/
     ステージの外へドラッグ → 独立カードとして外に出す
   ============================================================ */
function CardEditor({ cardId, cards, patchCard, addCards, removeDeep, detachChild, pushEdit, depth, onClose, showToast, onUndo = () => {}, onRedo = () => {}, chainIds = null, onNavigate = () => {} }) {
  const card = cards.find((c) => c.id === cardId);
  const kids = childrenOf(cards, cardId);
  const isChild = card && card.parentId != null;

  const [mode, setMode] = useState("move"); // move | pen
  const [penColor, setPenColor] = useState("#3f4750");
  const [penWidth, setPenWidth] = useState(6);
  const [penType, setPenType] = useState("pen"); // pen | pencil | marker
  const [penOpen, setPenOpen] = useState(false); // ペン設定パネル
  const PEN_WIDTHS = [2, 4, 6, 10, 16];          // 5段階の太さ
  const [lassoPath, setLassoPath] = useState(null);     // 範囲選択の軌跡(フリーハンド)
  const [selStrokeIds, setSelStrokeIds] = useState([]); // 選択済みストロークID
  const lassoRef = useRef(null);     // 矩形ドラッグ中
  const strokeDrag = useRef(null);   // 選択ストロークの移動
  const strokeResize = useRef(null); // 選択ストロークの拡大縮小
  const [selected, setSelected] = useState(null);   // 子カードid
  const [inlineEdit, setInlineEdit] = useState(null); // {id, value} 子テキスト編集
  const [selfEdit, setSelfEdit] = useState(null);     // {value} このカード自身の文字編集
  const [childMenu, setChildMenu] = useState(null);   // {id, vx, vy}
  const [connectLine, setConnectLine] = useState(null);
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [zoom, setZoom] = useState(1); // カード編集時のズーム倍率
  const stageBox = useRef(null);
  const scrollBox = useRef(null);
  const pointers = useRef(new Map());   // 現在触れている指
  const pinch = useRef(null);           // {dist, zoom} 2本指ピンチ中
  const barRef = useRef(null);
  const [barH, setBarH] = useState(58);
  const swipeRef = useRef(null);
  const richApi = useRef(null);
  const drawing = useRef(null);
  const dragChild = useRef(null);
  const resizeChild = useRef(null);
  const baseResize = useRef(null);
  const connRef = useRef(null);
  const longPress = useRef(null);
  const tapRef = useRef({ t: 0, id: null });
  const imgInput = useRef(null);

  useEffect(() => {
    const f = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  const barWatch = `${penOpen}|${mode}|${selected}|${inlineEdit && inlineEdit.id}`;
  useEffect(() => {
    // ツールバー(複数段)の合計高さを毎回測ってステージ計算に反映
    const root = barRef.current && barRef.current.parentElement;
    if (root) {
      let h = 0;
      [...root.children].forEach((c) => { if (c !== scrollBox.current) h += c.offsetHeight; });
      setBarH(h);
    } else if (barRef.current) {
      setBarH(barRef.current.offsetHeight);
    }
  }, [vp.w, vp.h, card && card.text, isChild, barWatch]);

  if (!card) return null;

  const baseS = Math.min((vp.w - 20) / STAGE_W, (vp.h - barH - 20) / STAGE_H);
  const s = baseS * zoom;
  const dispW = STAGE_W * s, dispH = STAGE_H * s;

  const toStage = (e) => {
    const r = stageBox.current.getBoundingClientRect();
    return [(e.clientX - r.left) / s, (e.clientY - r.top) / s];
  };
  const hitChild = (x, y) => [...kids].reverse().find((ch) =>
    x >= ch.x && x <= ch.x + ch.w && y >= ch.y && y <= ch.y + ch.h);

  /* ---- 範囲選択(手書きストローク) ---- */
  const strokeBBox = (ids) => {
    const ss = card.strokes.filter((s) => ids.includes(s.id));
    if (!ss.length) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    ss.forEach((s) => s.points.forEach(([px, py]) => {
      minX = Math.min(minX, px); minY = Math.min(minY, py);
      maxX = Math.max(maxX, px); maxY = Math.max(maxY, py);
    }));
    return { minX, minY, maxX, maxY };
  };
  const selBBox = strokeBBox(selStrokeIds);
  const transformSelected = (fn) => {
    patchCard(card.id, { strokes: card.strokes.map((s) =>
      selStrokeIds.includes(s.id) ? { ...s, points: s.points.map(fn) } : s) });
  };

  // 上部の色選択: ペン色に加えて、
  //  - このカード自身がテキストカードなら card.textColor を変更
  //  - 子テキストをインライン編集中ならその子の textColor を変更
  //  - 子テキストを選択中ならその子の textColor を変更
  const applyColor = (c) => {
    setPenColor(c);
    // インライン編集中で範囲選択があれば、その部分だけ色変更
    if (inlineEdit && richApi.current && richApi.current.apply({ color: c })) return;
    if (typeof card.text === "string") {
      patchCard(card.id, { textColor: c });
    } else if (inlineEdit) {
      patchCard(inlineEdit.id, { textColor: c });
    } else if (selected) {
      const sel = cards.find((x) => x.id === selected);
      if (sel && typeof sel.text === "string") patchCard(sel.id, { textColor: c });
    }
  };

  const commitInline = () => {
    if (!inlineEdit) return;
    const runs = richApi.current ? richApi.current.getRuns() : null;
    const plain = runsToText(runs).replace(/\s+$/, "");
    if (plain === "") removeDeep(inlineEdit.id);
    else {
      const simple = runs && runs.length === 1 && !runs[0].color && !runs[0].font;
      patchCard(inlineEdit.id, simple ? { text: plain, runs: null } : { text: plain, runs });
    }
    setInlineEdit(null);
  };
  const commitSelf = () => {
    if (!selfEdit) return;
    patchCard(card.id, { text: selfEdit.value });
    setSelfEdit(null);
  };

  /* ---- ステージ操作 ---- */
  const dist2 = () => {
    const ps = [...pointers.current.values()];
    return Math.hypot(ps[0].x - ps[1].x, ps[0].y - ps[1].y);
  };
  const center2 = () => {
    const ps = [...pointers.current.values()];
    return { x: (ps[0].x + ps[1].x) / 2, y: (ps[0].y + ps[1].y) / 2 };
  };
  const down = (e) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      // 2本指: ピンチズーム開始。進行中の描画・ドラッグを取り消す
      clearTimeout(longPress.current);
      if (drawing.current) { patchCard(card.id, { strokes: card.strokes.filter((st) => st.id !== drawing.current.id) }); drawing.current = null; }
      dragChild.current = null;
      resizeChild.current = null;
      pinch.current = { dist: dist2(), zoom, center: center2() };
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
      return;
    }
    if (pointers.current.size > 2) return;
    if (inlineEdit) { commitInline(); return; }
    if (selfEdit) { commitSelf(); return; }
    setChildMenu(null);
    const [x, y] = toStage(e);
    if (mode === "pen") {
      drawing.current = { id: uid(), color: penColor, kind: penType,
        width: penType === "marker" ? Math.max(penWidth * 2.4, 16) : penWidth, points: [[x, y]] };
      patchCard(card.id, { strokes: [...card.strokes, drawing.current] });
      e.currentTarget.setPointerCapture(e.pointerId);
      return;
    }
    if (mode === "select") {
      // すでに選択があり、その範囲内を押したら移動開始
      if (selBBox && x >= selBBox.minX - 12 && x <= selBBox.maxX + 12 && y >= selBBox.minY - 12 && y <= selBBox.maxY + 12) {
        strokeDrag.current = { sx: x, sy: y };
      } else {
        // 新しく矩形選択を開始
        setSelStrokeIds([]);
        lassoRef.current = { pts: [[x, y]] };
        setLassoPath([[x, y]]);
      }
      e.currentTarget.setPointerCapture(e.pointerId);
      return;
    }
    const ch = hitChild(x, y);
    if (ch) {
      setSelected(ch.id);
      dragChild.current = { id: ch.id, dx: x - ch.x, dy: y - ch.y, moved: false, sx: e.clientX, sy: e.clientY };
      e.currentTarget.setPointerCapture(e.pointerId);
      longPress.current = setTimeout(() => {
        if (dragChild.current && !dragChild.current.moved) {
          setChildMenu({ id: ch.id, vx: e.clientX, vy: e.clientY });
          dragChild.current = null;
        }
      }, 550);
    } else {
      setSelected(null);
      // チェーンの一部なら、空き場所からの横スワイプで前後カードへ移動できるよう開始点を記録
      if (mode === "move" && chainIds && chainIds.length >= 2) {
        swipeRef.current = { sx: e.clientX, sy: e.clientY };
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
      }
    }
  };
  const move = (e) => {
    if (pointers.current.has(e.pointerId)) pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch.current && pointers.current.size >= 2) {
      // ズーム(指の間隔)
      const d = dist2();
      if (pinch.current.dist > 0) {
        const next = Math.min(3, Math.max(0.5, pinch.current.zoom * (d / pinch.current.dist)));
        setZoom(Math.round(next * 100) / 100);
      }
      // パン(2本指の中心の移動ぶんだけスクロール)
      const c = center2();
      if (pinch.current.center && scrollBox.current) {
        scrollBox.current.scrollLeft -= c.x - pinch.current.center.x;
        scrollBox.current.scrollTop -= c.y - pinch.current.center.y;
      }
      pinch.current.center = c;
      return;
    }
    if (lassoRef.current) {
      const [x, y] = toStage(e);
      lassoRef.current.pts.push([x, y]);
      setLassoPath([...lassoRef.current.pts]);
      return;
    }
    if (strokeDrag.current) {
      const [x, y] = toStage(e);
      const dx = x - strokeDrag.current.sx, dy = y - strokeDrag.current.sy;
      strokeDrag.current.sx = x; strokeDrag.current.sy = y;
      transformSelected(([px, py]) => [px + dx, py + dy]);
      return;
    }
    if (strokeResize.current) {
      const [x, y] = toStage(e);
      const br = strokeResize.current;
      const sx = (x - br.ax) / (br.bx - br.ax || 1);
      const sy = (y - br.ay) / (br.by - br.ay || 1);
      const k = Math.max(0.1, Math.min(sx, sy)); // 縦横比維持
      transformSelected(([px, py]) => [br.ax + (px - br.ax) * (k / br.lastK), br.ay + (py - br.ay) * (k / br.lastK)]);
      br.lastK = k;
      return;
    }
    if (drawing.current) {
      const [x, y] = toStage(e);
      drawing.current.points.push([x, y]);
      patchCard(card.id, { strokes: card.strokes.map((st) => (st.id === drawing.current.id ? { ...drawing.current, points: [...drawing.current.points] } : st)) });
      return;
    }
    if (resizeChild.current) {
      const [x, y] = toStage(e);
      const ch = cards.find((c) => c.id === resizeChild.current.id);
      if (ch) {
        const nw = Math.max(60, x - ch.x), nh = Math.max(50, y - ch.y);
        const patch = { w: nw, h: nh };
        // テキストカードは高さの拡大率に合わせて文字サイズも拡大縮小
        if (typeof ch.text === "string" && ch.h > 0) {
          patch.fontSize = Math.max(10, Math.round((ch.fontSize || 46) * (nh / ch.h)));
        }
        patchCard(ch.id, patch);
      }
      return;
    }
    if (dragChild.current) {
      const d = dragChild.current;
      if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < 7) return;
      d.moved = true;
      clearTimeout(longPress.current);
      const dch = cards.find((c) => c.id === d.id);
      if (dch && dch.pinned) return; // ピン留め中は移動しない
      const [x, y] = toStage(e);
      patchCard(d.id, { x: x - d.dx, y: y - d.dy });
    }
  };
  const up = (e) => {
    pointers.current.delete(e.pointerId);
    if (pinch.current) {
      if (pointers.current.size < 2) pinch.current = null;
      return; // ピンチの指離しはタップ扱いしない
    }
    // 横スワイプでチェーンの前後カードへ移動
    if (swipeRef.current) {
      const dx = e.clientX - swipeRef.current.sx;
      const dy = e.clientY - swipeRef.current.sy;
      swipeRef.current = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && chainIds) {
        const idx = chainIds.indexOf(cardId);
        if (dx < 0 && idx < chainIds.length - 1) { onNavigate(chainIds[idx + 1]); return; }
        if (dx > 0 && idx > 0) { onNavigate(chainIds[idx - 1]); return; }
      }
    }
    // 範囲選択の確定(フリーハンドで囲んだ内側)
    if (lassoRef.current) {
      const poly = lassoRef.current.pts;
      lassoRef.current = null;
      setLassoPath(null);
      if (poly && poly.length >= 3) {
        const inPoly = (px, py) => {
          let inside = false;
          for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
            if (((yi > py) !== (yj > py)) && (px < ((xj - xi) * (py - yi)) / (yj - yi) + xi)) inside = !inside;
          }
          return inside;
        };
        const sel = card.strokes.filter((st) => {
          const n = st.points.filter(([px, py]) => inPoly(px, py)).length;
          return n > 0 && n >= st.points.length * 0.5;
        }).map((st) => st.id);
        setSelStrokeIds(sel);
        if (!sel.length) showToast("手書きの線をぐるっと囲ってね");
      }
      return;
    }
    if (strokeDrag.current) { strokeDrag.current = null; return; }
    if (strokeResize.current) { strokeResize.current = null; return; }
    clearTimeout(longPress.current);
    drawing.current = null;
    resizeChild.current = null;
    const d = dragChild.current;
    dragChild.current = null;
    if (!d) return;
    const ch = cards.find((c) => c.id === d.id);
    if (!ch) return;
    if (d.moved) {
      // 中心がステージの外 → 独立カードとして外に出す
      const cx = ch.x + ch.w / 2, cy = ch.y + ch.h / 2;
      if (cx < 0 || cx > STAGE_W || cy < 0 || cy > STAGE_H) {
        detachChild(ch.id);
        setSelected(null);
        showToast("カードを外に出しました(キャンバスに独立カードとして置かれます)");
      }
      return;
    }
    // タップ: ダブルタップ→開く / テキスト子はシングルで文字編集
    const now = Date.now();
    if (tapRef.current.id === ch.id && now - tapRef.current.t < 320) {
      tapRef.current = { t: 0, id: null };
      pushEdit(ch.id);
    } else {
      tapRef.current = { t: now, id: ch.id };
      if (typeof ch.text === "string") {
        const target = ch.id;
        setTimeout(() => {
          if (tapRef.current.id === target) setInlineEdit({ id: target, value: cards.find((c) => c.id === target)?.text || "" });
        }, 330);
      }
    }
  };

  /* ---- 子カードの接続 ---- */
  const connDown = (ch) => (e) => {
    e.stopPropagation();
    connRef.current = { fromId: ch.id };
    const [x, y] = toStage(e);
    setConnectLine({ x, y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const connMove = () => (e) => {
    if (!connRef.current) return;
    const [x, y] = toStage(e);
    setConnectLine({ x, y });
  };
  const connUp = () => (e) => {
    if (!connRef.current) return;
    const from = cards.find((c) => c.id === connRef.current.fromId);
    const [x, y] = toStage(e);
    const target = hitChild(x, y);
    connRef.current = null;
    setConnectLine(null);
    if (!target || !from || target.id === from.id) return;
    if (from.next) { showToast("1枚のカードから出せる接続は1本までです"); return; }
    if (buildIncoming(kids)[target.id]) { showToast("そのカードにはすでに接続が入っています"); return; }
    if (chainFrom(kids, target.id).some((c) => c.id === from.id)) { showToast("循環する接続はできません"); return; }
    patchCard(from.id, { next: target.id });
  };

  const addChildText = () => {
    const ch = {
      ...newCard("text", STAGE_W / 2 - 170, STAGE_H / 2 - 70, { parentId: card.id }),
      w: 340, h: 140, color: "transparent", text: "", textColor: penColor, fontSize: 46,
    };
    addCards([ch]);
    setMode("move");
    setSelected(ch.id);
    setInlineEdit({ id: ch.id, value: "" });
  };
  const addChildImage = (file) => {
    const rd = new FileReader();
    rd.onload = () => {
      addCards([{ ...newCard("image", STAGE_W / 2 - 160, STAGE_H / 2 - 110, { parentId: card.id }), w: 320, h: 220, src: rd.result }]);
    };
    rd.readAsDataURL(file);
  };

  const Tool = ({ active, onClick, children, title }) => (
    <button onClick={onClick} title={title} style={{
      width: 40, height: 40, borderRadius: 20, fontSize: 17, cursor: "pointer",
      border: active ? `1.5px solid ${ACCENT_DEEP}` : `1px solid ${BORDER}`,
      background: active ? ACCENT_SOFT : "#fff", color: INK,
      boxShadow: "0 2px 6px rgba(150,165,182,0.2)", flexShrink: 0,
    }}>{children}</button>
  );

  const selectedCh = selected ? kids.find((k) => k.id === selected) : null;
  const inc = buildIncoming(kids);
  // テキスト編集対象: 自身がテキストカード or テキスト子を選択中 or インライン編集中
  const textTarget =
    (inlineEdit && kids.find((k) => k.id === inlineEdit.id)) ||
    (selectedCh && typeof selectedCh.text === "string" ? selectedCh : null) ||
    (typeof card.text === "string" ? card : null);
  const patchText = (patch) => { if (textTarget) patchCard(textTarget.id, patch); };

  return (
    <div style={{ position: "fixed", inset: 0, background: EDITOR_BG, zIndex: 100 + depth, display: "flex", flexDirection: "column" }}>
      <div ref={barRef} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 7, padding: "8px 10px", flexShrink: 0, background: EDITOR_BG, borderBottom: `1px solid ${BORDER}`, rowGap: 7 }}>
        <Tool onClick={onClose} title="戻る">←</Tool>
        {depth > 1 && <span style={{ fontSize: 10, color: SUBTLE, flexShrink: 0 }}>親カードへ</span>}
        <Tool active={mode === "move"} onClick={() => { setMode("move"); setSelStrokeIds([]); setLassoPath(null); }} title="選択/移動">👆🏻</Tool>
        {chainIds && chainIds.length >= 2 && (() => {
          const idx = chainIds.indexOf(cardId);
          return (
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0, background: ACCENT_SOFT, borderRadius: 14, padding: "0 4px" }}>
              <button onClick={() => idx > 0 && onNavigate(chainIds[idx - 1])} disabled={idx <= 0}
                title="前のカード" style={{ width: 30, height: 36, border: "none", background: "none", color: idx > 0 ? ACCENT_DEEP : "#c3cad2", fontSize: 18, cursor: idx > 0 ? "pointer" : "default" }}>‹</button>
              <span style={{ fontSize: 11, color: ACCENT_DEEP, fontWeight: 700, minWidth: 30, textAlign: "center" }}>{idx + 1}/{chainIds.length}</span>
              <button onClick={() => idx < chainIds.length - 1 && onNavigate(chainIds[idx + 1])} disabled={idx >= chainIds.length - 1}
                title="次のカード" style={{ width: 30, height: 36, border: "none", background: "none", color: idx < chainIds.length - 1 ? ACCENT_DEEP : "#c3cad2", fontSize: 18, cursor: idx < chainIds.length - 1 ? "pointer" : "default" }}>›</button>
            </div>
          );
        })()}
        <Tool active={mode === "pen"} onClick={() => { setMode("pen"); setSelected(null); setSelStrokeIds([]); }} title="ペン"><img src={ICON_PEN} alt="ペン" draggable={false} style={{ width: 21, height: 21, objectFit: "contain", verticalAlign: "middle" }} /></Tool>
        <Tool active={mode === "select"} onClick={() => { setMode("select"); setSelected(null); setPenOpen(false); }} title="範囲選択(手書きを囲って移動・拡大)">⬚</Tool>
        {!isChild && <Tool onClick={addChildText} title="テキストを追加"><img src={ICON_TEXT} alt="あ" draggable={false} style={{ width: 21, height: 21, objectFit: "contain", verticalAlign: "middle" }} /></Tool>}
        {!isChild && <Tool onClick={() => imgInput.current.click()} title="画像を追加"><img src={ICON_IMG} alt="画像" draggable={false} style={{ width: 21, height: 21, objectFit: "contain", verticalAlign: "middle" }} /></Tool>}
        {typeof card.text === "string" && (
          <Tool onClick={() => setSelfEdit({ value: card.text || "" })} title="このカードの文字を編集">✎</Tool>
        )}
        {["#3f4750", "#9aa3ae", "#e3a8bd", "#8fb6cc", "#a99bd1", "#8fbfa4"].map((c) => (
          <button key={c} onClick={() => applyColor(c)} style={{
            width: 26, height: 26, borderRadius: 13, background: c, cursor: "pointer", flexShrink: 0,
            border: penColor === c ? `2.5px solid ${INK}` : "2.5px solid #fff",
            boxShadow: "0 0 0 1px #d4dae1",
          }} />
        ))}
        <label title="カスタム色" style={{
          width: 26, height: 26, borderRadius: 13, cursor: "pointer", flexShrink: 0, overflow: "hidden",
          position: "relative", boxShadow: "0 0 0 1px #d4dae1",
          border: !["#3f4750", "#9aa3ae", "#e3a8bd", "#8fb6cc", "#a99bd1", "#8fbfa4"].includes(penColor) ? `2.5px solid ${INK}` : "2.5px solid #fff",
          background: "conic-gradient(#e3a8bd, #f0d9a8, #8fbfa4, #8fb6cc, #a99bd1, #e3a8bd)",
        }}>
          <input type="color" value={penColor.length === 7 ? penColor : "#3f4750"}
            onChange={(e) => applyColor(e.target.value)}
            style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }} />
        </label>
        <Tool active={penOpen} onClick={() => setPenOpen((v) => !v)} title="ペンの太さ・種類">
          <span style={{ display: "inline-block", width: 20, height: Math.min(penWidth, 16), borderRadius: 8, background: penType === "pencil" ? "repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 4px)" : "currentColor", opacity: penType === "marker" ? 0.4 : 1, color: INK, verticalAlign: "middle" }} />
        </Tool>
        <Tool onClick={() => setZoom((z) => Math.max(0.5, Math.round((z - 0.25) * 100) / 100))} title="縮小">−</Tool>
        <button onClick={() => setZoom(1)} title="ズームを100%に戻す" style={{
          minWidth: 46, height: 40, borderRadius: 14, fontSize: 12, fontWeight: 700, cursor: "pointer",
          border: `1px solid ${BORDER}`, background: "#fff", color: zoom !== 1 ? ACCENT_DEEP : INK, flexShrink: 0,
        }}>{Math.round(zoom * 100)}%</button>
        <Tool onClick={() => setZoom((z) => Math.min(3, Math.round((z + 0.25) * 100) / 100))} title="拡大">＋</Tool>
        <Tool onClick={onUndo} title="ひとつ前に戻す"><img src={ICON_REDO} alt="undo" draggable={false} style={{ width: 21, height: 21, objectFit: "contain", verticalAlign: "middle" }} /></Tool>
        <Tool onClick={onRedo} title="戻す前に戻す"><img src={ICON_UNDO} alt="redo" draggable={false} style={{ width: 21, height: 21, objectFit: "contain", verticalAlign: "middle" }} /></Tool>
        <div style={{ flex: 1 }} />
        <button onClick={onClose} style={{ background: ACCENT_DEEP, border: "none", borderRadius: 16, padding: "6px 18px", fontWeight: 700, color: "#fff", cursor: "pointer", flexShrink: 0, boxShadow: "0 3px 10px rgba(111,156,181,0.4)" }}>完了</button>
      </div>

      {/* ペン設定パネル(5段階の太さ + 鉛筆風) */}
      {penOpen && mode === "pen" && (
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 14px", background: "#fff", borderBottom: `1px solid ${BORDER}`, flexWrap: "wrap", flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: SUBTLE, letterSpacing: 1 }}>太さ</span>
          {PEN_WIDTHS.map((w) => (
            <button key={w} onClick={() => setPenWidth(w)} title={`${w}px`} style={{
              width: 38, height: 34, borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              border: penWidth === w ? `2px solid ${ACCENT_DEEP}` : `1px solid ${BORDER}`, background: penWidth === w ? ACCENT_SOFT : "#fff",
            }}>
              <span style={{ width: 22, height: w, borderRadius: 6, background: INK, display: "inline-block" }} />
            </button>
          ))}
          <div style={{ width: 1, height: 26, background: BORDER }} />
          <span style={{ fontSize: 11, color: SUBTLE, letterSpacing: 1 }}>種類</span>
          {[["pen", "ペン"], ["pencil", "✏️ 鉛筆"], ["marker", "🖍 マーカー"]].map(([t, label]) => (
            <button key={t} onClick={() => setPenType(t)} style={{
              padding: "6px 12px", borderRadius: 12, fontSize: 12, cursor: "pointer",
              border: penType === t ? `2px solid ${ACCENT_DEEP}` : `1px solid ${BORDER}`,
              background: penType === t ? ACCENT_SOFT : "#fff", color: INK,
            }}>{label}</button>
          ))}
        </div>
      )}

      {/* テキスト設定バー(テキストカードが対象のとき表示: フォント / 文字サイズ / 縦書き横書き) */}
      {mode === "move" && textTarget && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", background: "#fff", borderBottom: `1px solid ${BORDER}`, flexWrap: "wrap", flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: SUBTLE, letterSpacing: 1 }}>あ</span>
          {FONT_OPTIONS.map((f) => (
            <button key={f.id} onClick={() => {
              if (inlineEdit && richApi.current && richApi.current.apply({ font: f.id })) return;
              patchText({ font: f.id });
            }} style={{
              padding: "5px 10px", borderRadius: 10, fontSize: 12, cursor: "pointer", fontFamily: f.css,
              border: (textTarget.font || "sans") === f.id ? `2px solid ${ACCENT_DEEP}` : `1px solid ${BORDER}`,
              background: (textTarget.font || "sans") === f.id ? ACCENT_SOFT : "#fff", color: INK,
            }}>{f.label}</button>
          ))}
          <div style={{ width: 1, height: 24, background: BORDER }} />
          <span style={{ fontSize: 11, color: SUBTLE, letterSpacing: 1 }}>サイズ</span>
          <button onClick={() => patchText({ fontSize: Math.max(16, (textTarget.fontSize || 46) - 6) })} style={{
            width: 32, height: 32, borderRadius: 10, border: `1px solid ${BORDER}`, background: "#fff", color: INK, fontSize: 16, cursor: "pointer",
          }}>−</button>
          <span style={{ fontSize: 12, color: INK, minWidth: 30, textAlign: "center" }}>{textTarget.fontSize || 46}</span>
          <button onClick={() => patchText({ fontSize: Math.min(160, (textTarget.fontSize || 46) + 6) })} style={{
            width: 32, height: 32, borderRadius: 10, border: `1px solid ${BORDER}`, background: "#fff", color: INK, fontSize: 16, cursor: "pointer",
          }}>＋</button>
          <div style={{ width: 1, height: 24, background: BORDER }} />
          <button onClick={() => patchText({ vertical: !textTarget.vertical })} style={{
            padding: "6px 12px", borderRadius: 10, fontSize: 12, cursor: "pointer",
            border: textTarget.vertical ? `2px solid ${ACCENT_DEEP}` : `1px solid ${BORDER}`,
            background: textTarget.vertical ? ACCENT_SOFT : "#fff", color: INK,
          }}>{textTarget.vertical ? "縦書き" : "横書き"}</button>
        </div>
      )}

      <div ref={scrollBox} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "auto" }}>
        <div style={{ margin: "auto", padding: 26, flexShrink: 0, position: "relative" }}>
        <div ref={stageBox}
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
          style={{ width: dispW, height: dispH, position: "relative", boxShadow: "0 14px 40px rgba(60,68,78,0.35)", borderRadius: 8, touchAction: "none", cursor: (mode === "pen" || mode === "select") ? "crosshair" : "default" }}>
          <CardStage
            card={card}
            subCards={inlineEdit ? kids.filter((k) => k.id !== inlineEdit.id) : kids}
            w={dispW} h={dispH}
          />

          {/* 子カード間の接続矢印 */}
          <svg width={dispW} height={dispH} viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <defs>
              <marker id="charrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <polygon points="0 0, 7 3.5, 0 7" fill={ACCENT_DEEP} />
              </marker>
            </defs>
            {kids.map((ch) => {
              if (!ch.next) return null;
              const t = kids.find((k) => k.id === ch.next);
              if (!t) return null;
              const x1 = ch.x + ch.w, y1 = ch.y + ch.h / 2, x2 = t.x - 6, y2 = t.y + t.h / 2;
              const mx = (x1 + x2) / 2;
              return <path key={"a" + ch.id} d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
                stroke={ACCENT_DEEP} strokeWidth="5" fill="none" markerEnd="url(#charrow)" opacity="0.85"
                strokeDasharray="0.5 13" strokeLinecap="round" />;
            })}
            {connectLine && selectedCh && (
              <line x1={selectedCh.x + selectedCh.w} y1={selectedCh.y + selectedCh.h / 2}
                x2={connectLine.x} y2={connectLine.y}
                stroke={ACCENT_DEEP} strokeWidth="5" strokeDasharray="10 8" markerEnd="url(#charrow)" />
            )}
          </svg>

          {/* 範囲選択(フリーハンドの軌跡) */}
          {lassoPath && lassoPath.length > 1 && (
            <svg width={dispW} height={dispH} viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} preserveAspectRatio="none"
              style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 }}>
              <polygon points={lassoPath.map((p) => p.join(",")).join(" ")}
                fill="rgba(167,201,219,0.18)" stroke={ACCENT_DEEP} strokeWidth="2.5"
                strokeDasharray="8 6" strokeLinejoin="round" />
            </svg>
          )}
          {/* 選択済みストロークの枠 + 操作ハンドル */}
          {mode === "select" && selBBox && selStrokeIds.length > 0 && (
            <>
              <div style={{
                position: "absolute", left: selBBox.minX * s - 6, top: selBBox.minY * s - 6,
                width: (selBBox.maxX - selBBox.minX) * s + 12, height: (selBBox.maxY - selBBox.minY) * s + 12,
                border: `1.5px solid ${ACCENT_DEEP}`, borderRadius: 6, pointerEvents: "none", zIndex: 5,
                background: "rgba(167,201,219,0.08)",
              }} />
              {/* 削除 */}
              <button onPointerDown={(e) => e.stopPropagation()}
                onClick={() => { patchCard(card.id, { strokes: card.strokes.filter((st) => !selStrokeIds.includes(st.id)) }); setSelStrokeIds([]); }}
                style={{
                  position: "absolute", left: selBBox.minX * s - 6 - 11, top: selBBox.minY * s - 6 - 11,
                  width: 24, height: 24, borderRadius: 12, border: "none", background: "#d04030", color: "#fff",
                  fontSize: 12, cursor: "pointer", zIndex: 7, boxShadow: "0 2px 6px rgba(60,68,78,0.4)",
                }}>🗑</button>
              {/* 拡大縮小(右下) */}
              <div
                onPointerDown={(e) => {
                  e.stopPropagation();
                  strokeResize.current = { ax: selBBox.minX, ay: selBBox.minY, bx: selBBox.maxX, by: selBBox.maxY, lastK: 1 };
                  try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
                }}
                onPointerMove={(e) => { if (strokeResize.current) move(e); }}
                onPointerUp={() => { strokeResize.current = null; }}
                style={{
                  position: "absolute", left: selBBox.maxX * s + 6 - 11, top: selBBox.maxY * s + 6 - 11,
                  width: 22, height: 22, borderRadius: 11, background: ACCENT_DEEP, border: "2px solid #fff",
                  cursor: "nwse-resize", touchAction: "none", zIndex: 7, boxShadow: "0 2px 6px rgba(60,68,78,0.4)",
                }} />
            </>
          )}

          {/* 選択中の子カード: 枠 + ハンドル */}
          {selectedCh && mode === "move" && (
            <>
              <div style={{
                position: "absolute", left: selectedCh.x * s, top: selectedCh.y * s,
                width: selectedCh.w * s, height: selectedCh.h * s,
                border: `1.5px dashed ${ACCENT_DEEP}`, borderRadius: 8, pointerEvents: "none", zIndex: 4,
              }} />
              {/* 接続(右辺中央の○) */}
              <div
                onPointerDown={connDown(selectedCh)} onPointerMove={connMove()} onPointerUp={connUp()} onPointerCancel={connUp()}
                style={{
                  position: "absolute", left: (selectedCh.x + selectedCh.w) * s - 9, top: (selectedCh.y + selectedCh.h / 2) * s - 11,
                  width: 22, height: 22, borderRadius: 11, background: "#fff", border: `2px solid ${ACCENT_DEEP}`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: ACCENT_DEEP,
                  cursor: "crosshair", zIndex: 6, touchAction: "none", boxShadow: "0 2px 6px rgba(60,68,78,0.3)",
                }}>⛓</div>
              {/* 接続解除(接続がある場合) */}
              {selectedCh.next && (
                <button onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => patchCard(selectedCh.id, { next: null })}
                  style={{
                    position: "absolute", left: (selectedCh.x + selectedCh.w) * s + 16, top: (selectedCh.y + selectedCh.h / 2) * s - 11,
                    height: 22, borderRadius: 11, border: `1px solid ${BORDER}`, background: "#fff", color: SUBTLE,
                    fontSize: 9, padding: "0 8px", cursor: "pointer", zIndex: 6,
                  }}>解除</button>
              )}
              {/* リサイズ(右下角・ピン留め中は非表示) */}
              {!selectedCh.pinned && (
                <div
                  onPointerDown={(e) => { e.stopPropagation(); resizeChild.current = { id: selectedCh.id }; e.currentTarget.setPointerCapture(e.pointerId); }}
                  onPointerMove={(e) => { if (resizeChild.current) move(e); }}
                  onPointerUp={() => { resizeChild.current = null; }}
                  style={{
                    position: "absolute", left: (selectedCh.x + selectedCh.w) * s - 10, top: (selectedCh.y + selectedCh.h) * s - 10,
                    width: 20, height: 20, borderRadius: 10, background: ACCENT_DEEP, border: "2px solid #fff",
                    cursor: "nwse-resize", zIndex: 6, touchAction: "none", boxShadow: "0 2px 6px rgba(60,68,78,0.35)",
                  }} />
              )}
              {selectedCh.pinned && (
                <div style={{
                  position: "absolute", left: selectedCh.x * s - 4, top: selectedCh.y * s - 10,
                  fontSize: 15, zIndex: 6, pointerEvents: "none",
                }}>📌</div>
              )}
            </>
          )}

          {/* 子テキストのインライン編集 */}
          {inlineEdit && (() => {
            const ch = kids.find((k) => k.id === inlineEdit.id);
            if (!ch) return null;
            return (
              <div onPointerDown={(e) => e.stopPropagation()}
                style={{ position: "absolute", left: ch.x * s, top: ch.y * s, zIndex: 7 }}>
                <RichEditable
                  initialRuns={ch.runs} initialText={ch.text}
                  baseColor={ch.textColor || INK} baseFont={ch.font}
                  fontSize={Math.max((ch.fontSize || 46) * s, 14)}
                  registerApply={(api) => { richApi.current = api; }}
                  style={{
                    width: Math.max(ch.w * s, 150), minHeight: Math.max(ch.h * s, 48), fontWeight: 700, lineHeight: 1.3,
                    background: "rgba(255,255,255,0.92)", border: `2px dashed ${ACCENT_DEEP}`, borderRadius: 8, padding: 5,
                  }} />
                <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                  <button onClick={() => {
                    const runs = richApi.current ? richApi.current.getRuns() : null;
                    const plain = runsToText(runs).replace(/\\s+$/, "");
                    if (plain === "") { removeDeep(inlineEdit.id); }
                    else {
                      const simple = runs && runs.length === 1 && !runs[0].color && !runs[0].font;
                      patchCard(inlineEdit.id, simple ? { text: plain, runs: null } : { text: plain, runs });
                    }
                    setInlineEdit(null);
                  }} style={{ background: ACCENT_DEEP, color: "#fff", border: "none", borderRadius: 12, padding: "5px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>確定</button>
                  <button onClick={() => { removeDeep(inlineEdit.id); setInlineEdit(null); setSelected(null); }}
                    style={{ background: "#d04030", color: "#fff", border: "none", borderRadius: 12, padding: "5px 14px", fontSize: 13, cursor: "pointer" }}>削除</button>
                  <button onClick={() => setInlineEdit(null)} style={{ background: "#fff", color: INK, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "5px 14px", fontSize: 13, cursor: "pointer" }}>取消</button>
                  <span style={{ fontSize: 10, color: SUBTLE, alignSelf: "center" }}>文字を選んで上のフォント・色を押すと部分変更できます</span>
                </div>
              </div>
            );
          })()}

          {/* このカード自身の文字編集 */}
          {selfEdit && (
            <div onPointerDown={(e) => e.stopPropagation()}
              style={{ position: "absolute", left: "8%", top: "10%", width: "84%", zIndex: 7 }}>
              <textarea autoFocus value={selfEdit.value}
                onChange={(e) => setSelfEdit({ value: e.target.value })}
                placeholder="このカードの文字"
                style={{
                  width: "100%", boxSizing: "border-box", minHeight: 120,
                  fontSize: Math.max((card.fontSize || 46) * s, 15), fontWeight: 700, color: card.textColor || INK, lineHeight: 1.3,
                  background: "rgba(255,255,255,0.92)", border: `2px dashed ${ACCENT_DEEP}`, borderRadius: 10,
                  padding: 8, resize: "vertical", outline: "none", fontFamily: "inherit",
                }} />
              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                <button onClick={commitSelf} style={{ background: ACCENT_DEEP, color: "#fff", border: "none", borderRadius: 12, padding: "5px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>確定</button>
                <button onClick={() => setSelfEdit(null)} style={{ background: "#fff", color: INK, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "5px 14px", fontSize: 13, cursor: "pointer" }}>取消</button>
              </div>
            </div>
          )}
        </div>
        {/* ベースカードの四隅リサイズ(カード自体の大きさを変える) */}
        {mode === "move" && !inlineEdit && !selfEdit && [
          ["nw", 0, 0, "nwse-resize"], ["ne", 1, 0, "nesw-resize"],
          ["sw", 0, 1, "nesw-resize"], ["se", 1, 1, "nwse-resize"],
        ].map(([k, hx, hy, cur]) => (
          <div key={k}
            onPointerDown={(e) => {
              e.stopPropagation();
              baseResize.current = { k, sx: e.clientX, sy: e.clientY, w0: card.w, h0: card.h, fs0: card.fontSize || 46 };
              try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
            }}
            onPointerMove={(e) => {
              const br = baseResize.current;
              if (!br) return;
              const ddx = (e.clientX - br.sx) / s * (hx === 1 ? 1 : -1);
              const ddy = (e.clientY - br.sy) / s * (hy === 1 ? 1 : -1);
              const nw = Math.max(120, Math.round(br.w0 + ddx));
              const nh = Math.max(90, Math.round(br.h0 + ddy));
              const patch = { w: nw, h: nh };
              if (typeof card.text === "string" && br.h0 > 0) patch.fontSize = Math.max(10, Math.round(br.fs0 * (nh / br.h0)));
              patchCard(card.id, patch);
            }}
            onPointerUp={(e) => { baseResize.current = null; try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (err) {} }}
            style={{
              position: "absolute",
              left: 26 + hx * dispW - 13, top: 26 + hy * dispH - 13,
              width: 26, height: 26, borderRadius: 13, background: "#fff",
              border: `2px solid ${ACCENT_DEEP}`, boxShadow: "0 2px 8px rgba(60,68,78,0.4)",
              cursor: cur, touchAction: "none", zIndex: 8,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: ACCENT_DEEP,
            }}>⤡</div>
        ))}
        </div>
      </div>

      {/* 子カードの長押しメニュー */}
      {childMenu && (() => {
        const ch = kids.find((k) => k.id === childMenu.id);
        if (!ch) return null;
        return (
          <div style={{
            position: "fixed", left: Math.min(childMenu.vx, window.innerWidth - 170), top: Math.min(childMenu.vy, window.innerHeight - 160),
            background: "#fff", borderRadius: 14, boxShadow: "0 8px 28px rgba(40,44,50,0.35)", zIndex: 150 + depth,
            overflow: "hidden", width: 160,
          }}>
            {[
              ["📑 複製", () => {
                addCards([{ ...ch, id: uid(), x: ch.x + 30, y: ch.y + 30, next: null,
                  strokes: ch.strokes.map((st) => ({ ...st, id: uid(), points: st.points.map((p) => [...p]) })) }]);
              }],
              [ch.pinned ? "📌 ピン解除" : "📌 ピン留め", () => patchCard(ch.id, { pinned: !ch.pinned })],
              ["📤 外に出す", () => { detachChild(ch.id); setSelected(null); showToast("キャンバスに独立カードとして置きました"); }],
              ["🗑 削除", () => { removeDeep(ch.id); setSelected(null); }],
            ].map(([label, fn]) => (
              <button key={label} onClick={() => { fn(); setChildMenu(null); }} style={{
                display: "block", width: "100%", padding: "12px 14px", border: "none", background: "none",
                textAlign: "left", fontSize: 14, cursor: "pointer", borderBottom: `1px solid ${BORDER}`, color: INK,
              }}>{label}</button>
            ))}
          </div>
        );
      })()}

      <input ref={imgInput} type="file" accept="image/*" style={{ display: "none" }}
        onChange={(e) => { if (e.target.files[0]) addChildImage(e.target.files[0]); e.target.value = ""; }} />
    </div>
  );
}

/* ============================================================
   スワイプ閲覧(まとめカードを開く)
   ============================================================ */
function SwipeViewer({ chain, allCards, onClose, onEdit }) {
  const [idx, setIdx] = useState(0);
  const startX = useRef(null);
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const f = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  const s = Math.min((vp.w - 32) / STAGE_W, (vp.h - 140) / STAGE_H);
  const card = chain[Math.min(idx, chain.length - 1)];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(243,246,249,0.97)", zIndex: 90, display: "flex", flexDirection: "column" }}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        if (dx < -50 && idx < chain.length - 1) setIdx(idx + 1);
        if (dx > 50 && idx > 0) setIdx(idx - 1);
        startX.current = null;
      }}>
      <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 12px", gap: 10, color: INK }}>
        <button onClick={onClose} style={{ background: "#fff", border: `1px solid ${BORDER}`, color: INK, width: 40, height: 40, borderRadius: 20, fontSize: 18, cursor: "pointer", boxShadow: "0 3px 10px rgba(150,165,182,0.2)" }}>←</button>
        <div style={{ flex: 1, textAlign: "center", fontWeight: 700, letterSpacing: 1 }}>{idx + 1} / {chain.length}</div>
        <button onClick={() => onEdit(card.id)} style={{ background: ACCENT_DEEP, color: "#fff", border: "none", borderRadius: 16, padding: "8px 18px", fontWeight: 700, cursor: "pointer", boxShadow: "0 3px 10px rgba(111,156,181,0.4)" }}>編集</button>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}
          style={{ background: "none", border: "none", color: idx === 0 ? "#ccd4dc" : INK, fontSize: 34, cursor: "pointer" }}>‹</button>
        <div style={{ boxShadow: "0 16px 50px rgba(150,165,182,0.45)", borderRadius: 14, overflow: "hidden", border: `1px solid ${BORDER}` }}>
          <CardStage card={card} subCards={childrenOf(allCards, card.id)} w={STAGE_W * s} h={STAGE_H * s} />
        </div>
        <button onClick={() => setIdx(Math.min(chain.length - 1, idx + 1))} disabled={idx === chain.length - 1}
          style={{ background: "none", border: "none", color: idx === chain.length - 1 ? "#ccd4dc" : INK, fontSize: 34, cursor: "pointer" }}>›</button>
      </div>
      <div style={{ height: 60, display: "flex", justifyContent: "center", gap: 8, alignItems: "center" }}>
        {chain.map((c, i) => (
          <div key={c.id} onClick={() => setIdx(i)} style={{
            width: i === idx ? 12 : 8, height: i === idx ? 12 : 8, borderRadius: 6, cursor: "pointer",
            background: i === idx ? ACCENT_DEEP : "#d4dce3",
          }} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   無限キャンバス画面 — 暗いグレー地(格子なし)
   レイアウト: 下中央ツールドック / 右端に資料箱・共有 /
   上中央ゴミ箱 / 接続は右辺中央の○ハンドル
   ============================================================ */
function CanvasScreen({ note, group, groups, onUpdateCards, onBack, materialBox, setMaterialBox, onSendCard, tut = null, onTutAdvance = () => {}, onTutEnd = () => {} }) {
  const cards = note.cards;
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1); // キャンバスのズーム倍率
  const [zoomAnim, setZoomAnim] = useState(false); // ボタン操作時だけ滑らかに
  const bgPointers = useRef(new Map());  // 背景に触れている指
  const bgPinch = useRef(null);          // {dist, scale, cx, cy, panx, pany}
  const zoomAnimTimer = useRef(null);
  const [editStack, setEditStack] = useState([]);   // 開いているカードの階層
  const [viewerHead, setViewerHead] = useState(null);
  const [menu, setMenu] = useState(null);
  const [connectLine, setConnectLine] = useState(null);
  const [trashHot, setTrashHot] = useState(false);
  const [boxHot, setBoxHot] = useState(false);
  const [shareHot, setShareHot] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);
  const [boxDrop, setBoxDrop] = useState(null);
  const [shareDrop, setShareDrop] = useState(null);
  const [palette, setPalette] = useState(false);
  const [toast, setToast] = useState(null);
  const [promptD, setPromptD] = useState(null);
  const [confirmD, setConfirmD] = useState(null);
  const toastTimer = useRef(null);
  const viewport = useRef(null);
  const panRef = useRef(null);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const connectRef = useRef(null);
  const tapRef = useRef({ t: 0, id: null });
  const tapTimer = useRef(null);
  const longPress = useRef(null);
  const fileInput = useRef(null);
  const pdfInput = useRef(null);
  const camInput = useRef(null);
  const trashRef = useRef(null);
  const boxBtnRef = useRef(null);
  const shareBtnRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  };

  /* ---- 操作履歴(巻き戻し / やり直し) ---- */
  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const lastPush = useRef(0);
  const setCards = (fn) => {
    const next = typeof fn === "function" ? fn(cards) : fn;
    if (next === cards) return;
    // ドラッグや手書きの連続更新は1つの履歴にまとめる(400ms以内は追加しない)
    const now = Date.now();
    if (now - lastPush.current > 400) {
      undoStack.current.push(cards);
      if (undoStack.current.length > 60) undoStack.current.shift();
    }
    lastPush.current = now;
    redoStack.current = [];
    onUpdateCards(next);
  };
  const undo = () => {
    if (!undoStack.current.length) { showToast("これ以上戻せません"); return; }
    const prev = undoStack.current.pop();
    redoStack.current.push(cards);
    lastPush.current = 0;
    onUpdateCards(prev);
    showToast("ひとつ前に戻しました");
  };
  const redo = () => {
    if (!redoStack.current.length) { showToast("やり直せる操作がありません"); return; }
    const next = redoStack.current.pop();
    undoStack.current.push(cards);
    lastPush.current = 0;
    onUpdateCards(next);
    showToast("やり直しました");
  };

  /* ---- 2本指タップ=巻き戻し / 3本指タップ=やり直し ---- */
  const multiRef = useRef({ count: 0, max: 0, t: 0 });
  const mtDown = () => {
    const m = multiRef.current;
    m.count++;
    if (m.count === 1) { m.t = Date.now(); m.max = 1; }
    m.max = Math.max(m.max, m.count);
  };
  const mtUp = () => {
    const m = multiRef.current;
    m.count = Math.max(0, m.count - 1);
    if (m.count === 0) {
      const quick = Date.now() - m.t < 420;
      const pinched = bgPinch.current || multiRef.current.pinched;
      const blocked = editStack.length > 0 || viewerHead || boxOpen || boxDrop || shareDrop || menu || pinched;
      if (quick && !blocked) {
        if (m.max === 2) undo();
        else if (m.max === 3) redo();
      }
      multiRef.current = { count: 0, max: 0, t: 0, pinched: false };
    }
  };
  const patchCard = (id, patch) => setCards((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const addCards = (arr) => setCards((cs) => [...cs, ...arr]);
  // カードとその子をまとめて削除(参照も掃除)
  const removeDeep = (id) => {
    setCards((cs) => {
      const dead = new Set([id, ...cs.filter((c) => c.parentId === id).map((c) => c.id)]);
      return cs.filter((c) => !dead.has(c.id)).map((c) => (dead.has(c.next) ? { ...c, next: null } : c));
    });
  };
  // 子カードをキャンバスへ独立させる
  const detachChild = (childId) => {
    setCards((cs) => {
      const ch = cs.find((c) => c.id === childId);
      if (!ch || !ch.parentId) return cs;
      const parent = cs.find((c) => c.id === ch.parentId);
      const scaleW = parent ? parent.w / STAGE_W : 0.3;
      const scaleH = parent ? parent.h / STAGE_H : 0.3;
      const nw = Math.max(110, ch.w * scaleW), nh = Math.max(80, ch.h * scaleH);
      const fontBoost = typeof ch.text === "string" ? STAGE_W / Math.max(ch.w, 1) : 1;
      return cs.map((c) => {
        if (c.id === childId) {
          return {
            ...c, parentId: null,
            x: (parent ? parent.x + parent.w : 100) + 26,
            y: (parent ? parent.y : 100) + 10,
            w: nw, h: nh, next: null,
            fontSize: typeof c.text === "string" ? Math.round((c.fontSize || 46) * fontBoost) : c.fontSize,
            color: c.type === "text" && (!c.color || c.color === "transparent") ? "transparent" : c.color,
            textColor: typeof c.text === "string" && isDarkColor(c.textColor || "#3f4750") && (!c.color || c.color === "transparent")
              ? "#f0f2f4" : c.textColor,
          };
        }
        return c.next === childId ? { ...c, next: null } : c;
      });
    });
  };

  const topLevel = cards.filter((c) => !c.parentId);
  const incoming = buildIncoming(topLevel);
  const hiddenIds = new Set();
  topLevel.forEach((c) => {
    if (c.collapsed && !incoming[c.id] && c.next) {
      chainFrom(topLevel, c.id).slice(1).forEach((m) => hiddenIds.add(m.id));
    }
  });
  const visible = topLevel.filter((c) => !hiddenIds.has(c.id));

  const toCanvas = (e) => {
    const r = viewport.current.getBoundingClientRect();
    return [(e.clientX - r.left - pan.x) / scale, (e.clientY - r.top - pan.y) / scale];
  };
  // ズーム(focalを中心に拡大縮小。focalはビューポート内のpx座標)
  const zoomAt = (nextScale, fx, fy) => {
    const ns = Math.min(3, Math.max(0.3, nextScale));
    setPan((p) => ({
      x: fx - (fx - p.x) * (ns / scale),
      y: fy - (fy - p.y) * (ns / scale),
    }));
    setScale(ns);
  };
  const zoomButton = (factor) => {
    const r = viewport.current ? viewport.current.getBoundingClientRect() : { width: 800, height: 600 };
    setZoomAnim(true);
    clearTimeout(zoomAnimTimer.current);
    zoomAnimTimer.current = setTimeout(() => setZoomAnim(false), 260);
    zoomAt(scale * factor, r.width / 2, r.height / 2);
  };
  const overEl = (e, ref) => {
    if (!ref.current) return false;
    const r = ref.current.getBoundingClientRect();
    return e.clientX >= r.left - 10 && e.clientX <= r.right + 10 && e.clientY >= r.top - 10 && e.clientY <= r.bottom + 10;
  };
  const cloneBundleOf = (id, pos) => cloneBundle(collectBundle(cards, id), pos);

  // 連結チェーン全体(親+子)を丸ごと複製。矢印のつながりも維持
  const duplicateChain = (headId) => {
    const chain = chainFrom(topLevel, headId);
    const idMap = {};
    const all = [];
    chain.forEach((c) => {
      const bundle = collectBundle(cards, c.id);
      const m = {};
      bundle.forEach((b) => { m[b.id] = uid(); });
      idMap[c.id] = m[c.id];
      bundle.forEach((b, i) => {
        all.push({
          ...b, id: m[b.id],
          parentId: b.parentId ? (m[b.parentId] || null) : null,
          x: i === 0 ? b.x + 36 : b.x, y: i === 0 ? b.y + 36 : b.y,
          next: null, collapsed: false,
          strokes: b.strokes.map((s) => ({ ...s, id: uid(), points: s.points.map((p) => [...p]) })),
          tags: [...b.tags],
        });
      });
    });
    // 矢印の再リンク
    chain.forEach((c) => {
      if (c.next && idMap[c.next]) {
        const nc = all.find((a) => a.id === idMap[c.id]);
        if (nc) nc.next = idMap[c.next];
      }
    });
    addCards(all);
  };

  // チェーン全体を削除
  const deleteChain = (headId) => {
    chainFrom(topLevel, headId).forEach((c) => removeDeep(c.id));
  };

  // チェーンを矢印順にきれいに整列(横一列、収まらなければ折り返して格子に)
  const alignChain = (headId) => {
    const chain = chainFrom(topLevel, headId);
    if (chain.length < 2) return;
    const gap = 28;
    const maxW = Math.max(...chain.map((c) => c.w));
    const maxH = Math.max(...chain.map((c) => c.h));
    const viewW = viewport.current ? viewport.current.getBoundingClientRect().width : 900;
    const perRow = Math.max(1, Math.floor((viewW - 80) / (maxW + gap)));
    const x0 = chain[0].x, y0 = chain[0].y;
    setCards((cs) => cs.map((c) => {
      const idx = chain.findIndex((x) => x.id === c.id);
      if (idx < 0) return c;
      const row = Math.floor(idx / perRow), col = idx % perRow;
      return { ...c, x: x0 + col * (maxW + gap), y: y0 + row * (maxH + gap), pinned: false };
    }));
    showToast("整列しました");
  };

  /* ---- 背景パン + ピンチズーム ---- */
  const bgDist = () => {
    const ps = [...bgPointers.current.values()];
    return Math.hypot(ps[0].x - ps[1].x, ps[0].y - ps[1].y);
  };
  const bgCenter = () => {
    const ps = [...bgPointers.current.values()];
    const r = viewport.current.getBoundingClientRect();
    return { x: (ps[0].x + ps[1].x) / 2 - r.left, y: (ps[0].y + ps[1].y) / 2 - r.top };
  };
  const bgDown = (e) => {
    bgPointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (bgPointers.current.size === 2) {
      panRef.current = null; // 1本指パンを中断
      const c = bgCenter();
      setZoomAnim(false);
      bgPinch.current = { dist: bgDist(), scale, cx: c.x, cy: c.y, panx: pan.x, pany: pan.y, lastc: c };
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
      return;
    }
    if (bgPointers.current.size > 2) return;
    panRef.current = { sx: e.clientX, sy: e.clientY, px: pan.x, py: pan.y };
    e.currentTarget.setPointerCapture(e.pointerId);
    setMenu(null);
    setPalette(false);
  };
  const bgMove = (e) => {
    if (bgPointers.current.has(e.pointerId)) bgPointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (bgPinch.current && bgPointers.current.size >= 2) {
      const d = bgDist();
      const c = bgCenter();
      const bp = bgPinch.current;
      if (bp.dist > 0) {
        const ns = Math.min(3, Math.max(0.3, bp.scale * (d / bp.dist)));
        // 2本指の中心を基準に拡大しつつ、中心の移動ぶんパンも反映
        setPan({
          x: c.x - (bp.cx - bp.panx) * (ns / bp.scale) + (c.x - bp.cx),
          y: c.y - (bp.cy - bp.pany) * (ns / bp.scale) + (c.y - bp.cy),
        });
        setScale(ns);
        multiRef.current.pinched = true;
      }
      return;
    }
    if (panRef.current) setPan({ x: panRef.current.px + e.clientX - panRef.current.sx, y: panRef.current.py + e.clientY - panRef.current.sy });
  };
  const bgUp = (e) => {
    bgPointers.current.delete(e.pointerId);
    if (bgPinch.current && bgPointers.current.size < 2) bgPinch.current = null;
    if (bgPointers.current.size === 0) panRef.current = null;
  };

  /* ---- カード操作 ---- */
  const cardDown = (card) => (e) => {
    e.stopPropagation();
    setMenu(null);
    setPalette(false);
    const [cx, cy] = toCanvas(e);
    dragRef.current = { id: card.id, dx: cx - card.x, dy: cy - card.y, moved: false, sx: e.clientX, sy: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
    longPress.current = setTimeout(() => {
      if (dragRef.current && !dragRef.current.moved) {
        const r = viewport.current.getBoundingClientRect();
        setMenu({ cardId: card.id, vx: e.clientX - r.left, vy: e.clientY - r.top });
        dragRef.current = null;
      }
    }, 550);
  };
  const cardMove = (card) => (e) => {
    const d = dragRef.current;
    if (!d || d.id !== card.id) return;
    if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < 7) return;
    d.moved = true;
    clearTimeout(longPress.current);
    if (card.pinned) return;
    const [cx, cy] = toCanvas(e);
    patchCard(card.id, { x: cx - d.dx, y: cy - d.dy });
    setTrashHot(overEl(e, trashRef));
    setBoxHot(overEl(e, boxBtnRef));
    setShareHot(overEl(e, shareBtnRef));
  };
  const cardUp = (card) => (e) => {
    clearTimeout(longPress.current);
    const d = dragRef.current;
    dragRef.current = null;
    if (multiRef.current.max >= 2) { setTrashHot(false); setBoxHot(false); setShareHot(false); return; }
    setTrashHot(false); setBoxHot(false); setShareHot(false);
    if (!d) return;
    if (d.moved) {
      if (overEl(e, trashRef) && !card.pinned) removeDeep(card.id);
      else if (overEl(e, boxBtnRef)) setBoxDrop(card.id);
      else if (overEl(e, shareBtnRef)) setShareDrop(card.id);
      return;
    }
    // タップ判定(1回=閲覧 / 2回=編集 / 3回=まとめ・展開)
    const now = Date.now();
    const isHead = !incoming[card.id] && card.next;
    if (tapRef.current.id === card.id && now - tapRef.current.t < 360) {
      tapRef.current = { id: card.id, t: now, count: (tapRef.current.count || 1) + 1 };
    } else {
      tapRef.current = { id: card.id, t: now, count: 1 };
    }
    const myTap = tapRef.current.count;
    clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => {
      if (tapRef.current.id !== card.id) return;
      const cnt = tapRef.current.count;
      tapRef.current = { t: 0, id: null, count: 0 };
      if (cnt >= 3) {
        // 3回タップ: 連結チェーンのまとめ/展開
        if (isHead) patchCard(card.id, { collapsed: !card.collapsed });
        else showToast("まとめるには、矢印でつないだ先頭のカードを3回タップしてね");
      } else if (cnt === 2) {
        setEditStack([card.id]); // 編集
      } else {
        if (isHead && card.collapsed) setViewerHead(card.id); // 閲覧
      }
    }, 360);
  };

  /* ---- リサイズ ---- */
  const resizeDown = (card) => (e) => {
    e.stopPropagation();
    resizeRef.current = { id: card.id };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const resizeMove = (card) => (e) => {
    if (!resizeRef.current || resizeRef.current.id !== card.id) return;
    const [cx, cy] = toCanvas(e);
    const nw = Math.max(90, cx - card.x), nh = Math.max(70, cy - card.y);
    const patch = { w: nw, h: nh };
    if (typeof card.text === "string" && card.h > 0) {
      patch.fontSize = Math.max(10, Math.round((card.fontSize || 46) * (nh / card.h)));
    }
    patchCard(card.id, patch);
  };
  const resizeUp = () => { resizeRef.current = null; };

  /* ---- 接続(右辺中央の○ハンドル) ---- */
  const connDown = (card) => (e) => {
    e.stopPropagation();
    connectRef.current = { fromId: card.id };
    const [x, y] = toCanvas(e);
    setConnectLine({ fromId: card.id, x, y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const connMove = () => (e) => {
    if (!connectRef.current) return;
    const [x, y] = toCanvas(e);
    setConnectLine({ fromId: connectRef.current.fromId, x, y });
  };
  const connUp = () => (e) => {
    if (!connectRef.current) return;
    const from = cards.find((c) => c.id === connectRef.current.fromId);
    const [x, y] = toCanvas(e);
    const target = visible.find((c) =>
      c.id !== from.id && x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h);
    connectRef.current = null;
    setConnectLine(null);
    if (!target) return;
    if (from.next) { showToast("1枚のカードから出せる接続は1本までです"); return; }
    if (buildIncoming(topLevel)[target.id]) { showToast("そのカードにはすでに接続が入っています"); return; }
    if (chainFrom(topLevel, target.id).some((c) => c.id === from.id)) { showToast("循環する接続はできません"); return; }
    patchCard(from.id, { next: target.id });
  };

  /* ---- カード追加 ---- */
  const spawnPos = () => {
    const r = viewport.current ? viewport.current.getBoundingClientRect() : { width: 800, height: 600 };
    const cx = (r.width / 2 - pan.x) / scale, cy = (r.height / 2 - pan.y) / scale;
    return [cx - 110 + Math.random() * 60, cy - 100 + Math.random() * 60];
  };
  const addText = (color) => {
    const [x, y] = spawnPos();
    addCards([newCard("text", x, y, { color })]);
    setPalette(false);
    onTutAdvance("color", "done");
  };
  const pickCardColor = (c) => {
    if (palette && palette.cardId) {
      patchCard(palette.cardId, { color: c });
      setPalette(false);
    } else {
      addText(c);
    }
  };
  const addImages = (files) => {
    const arr = Array.from(files);
    if (!arr.length) return;
    const [bx, by] = spawnPos();
    Promise.all(arr.map((f) => new Promise((res) => {
      const rd = new FileReader();
      rd.onload = () => res(rd.result);
      rd.readAsDataURL(f);
    }))).then((srcs) => {
      const created = srcs.map((src, i) => newCard("image", bx + i * 36, by + i * 28, { src }));
      for (let i = 0; i < created.length - 1; i++) created[i].next = created[i + 1].id;
      if (created.length >= 2) created[0].collapsed = true;
      addCards(created);
    });
  };
  const addPdf = (file) => {
    const [x, y] = spawnPos();
    addCards([newCard("pdf", x, y, { fileName: file.name })]);
  };

  const editingId = editStack[editStack.length - 1];
  useEffect(() => {
    if (editingId && !cards.find((c) => c.id === editingId)) setEditStack([]);
  }, [editingId, cards]);
  const viewerChain = viewerHead ? chainFrom(topLevel, viewerHead) : null;

  const DockBtn = ({ label, img, onClick, glow }) => (
    <button onClick={onClick} className={glow ? "tut-glow" : undefined} style={{
      border: "none", background: "none", cursor: "pointer", padding: "4px 10px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flexShrink: 0,
    }}>
      <img src={img} alt="" draggable={false} style={{ width: 26, height: 26, objectFit: "contain" }} />
      <span style={{ fontSize: 9, color: SUBTLE, letterSpacing: 1, whiteSpace: "nowrap" }}>{label}</span>
    </button>
  );

  return (
    <div
      onPointerDownCapture={mtDown} onPointerUpCapture={mtUp} onPointerCancelCapture={mtUp}
      style={{ position: "fixed", inset: 0, background: CANVAS_BG, overflow: "hidden", fontFamily: "'Hiragino Sans','Noto Sans JP',sans-serif" }}>
      {/* キャンバス */}
      <div ref={viewport}
        onPointerDown={bgDown} onPointerMove={bgMove} onPointerUp={bgUp} onPointerCancel={bgUp}
        style={{ position: "absolute", inset: 0, touchAction: "none", cursor: "grab" }}>
        <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`, transformOrigin: "0 0", transition: zoomAnim ? "transform 0.22s cubic-bezier(0.22,0.61,0.36,1)" : "none", willChange: "transform" }}>
          {/* 接続線 */}
          <svg style={{ position: "absolute", left: 0, top: 0, width: 1, height: 1, overflow: "visible", pointerEvents: "none" }}>
            <defs>
              <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <polygon points="0 0, 7 3.5, 0 7" fill={ACCENT} />
              </marker>
            </defs>
            {visible.map((c) => {
              if (!c.next || hiddenIds.has(c.next) || (c.collapsed && !incoming[c.id])) return null;
              const t = cards.find((x) => x.id === c.next);
              if (!t) return null;
              const x1 = c.x + c.w, y1 = c.y + c.h / 2, x2 = t.x - 6, y2 = t.y + t.h / 2;
              const mx = (x1 + x2) / 2;
              const d = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
              return (
                <g key={"a" + c.id}>
                  <path d={d} stroke="transparent" strokeWidth="24" fill="none" style={{ pointerEvents: "stroke", cursor: "pointer" }}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmD({ message: "この接続を外しますか?", cb: () => patchCard(c.id, { next: null }) });
                    }} />
                  <path d={d} stroke={ACCENT} strokeWidth="4.5" fill="none" markerEnd="url(#arrowhead)" opacity="0.9" strokeDasharray="0.5 11" strokeLinecap="round" />
                </g>
              );
            })}
            {connectLine && (() => {
              const f = cards.find((c) => c.id === connectLine.fromId);
              if (!f) return null;
              return <line x1={f.x + f.w} y1={f.y + f.h / 2} x2={connectLine.x} y2={connectLine.y}
                stroke={ACCENT} strokeWidth="4" strokeDasharray="8 6" markerEnd="url(#arrowhead)" />;
            })()}
          </svg>

          {/* カード */}
          {visible.map((card) => {
            const isHead = !incoming[card.id] && card.next;
            const chainLen = isHead ? chainFrom(topLevel, card.id).length : 1;
            const kids = childrenOf(cards, card.id);
            return (
              <div key={card.id} style={{ position: "absolute", left: card.x, top: card.y, width: card.w }}>
                {isHead && card.collapsed && (
                  <>
                    <div style={{ position: "absolute", left: 9, top: 9, width: card.w, height: card.h, background: "#fff", borderRadius: 16, opacity: 0.55 }} />
                    <div style={{ position: "absolute", left: 4.5, top: 4.5, width: card.w, height: card.h, background: "#fff", borderRadius: 16, opacity: 0.8 }} />
                  </>
                )}
                <div style={{ position: "relative", width: card.w, height: card.h }}
                  onPointerDown={cardDown(card)} onPointerMove={cardMove(card)}
                  onPointerUp={cardUp(card)} onPointerCancel={cardUp(card)}>
                  <div style={{
                    width: "100%", height: "100%", touchAction: "none",
                    boxShadow: "0 8px 22px rgba(15,18,22,0.45)", borderRadius: 18, overflow: "hidden",
                    border: card.type === "text" && card.color === "transparent" ? `1.5px dashed ${ACCENT}` : "none",
                    outline: card.pinned ? `2px solid ${ACCENT}` : "none", cursor: "pointer",
                    background: card.type === "text" && card.color === "transparent" ? "rgba(255,255,255,0.04)" : "#fff",
                  }}>
                    <CardStage card={card} subCards={kids} w={card.w} h={card.h} hint />
                    {/* リサイズ(右下角) */}
                    <div
                      onPointerDown={resizeDown(card)} onPointerMove={resizeMove(card)}
                      onPointerUp={resizeUp} onPointerCancel={resizeUp}
                      style={{
                        position: "absolute", right: 0, bottom: 0, width: 26, height: 26, touchAction: "none",
                        cursor: "nwse-resize", zIndex: 2,
                        background: "linear-gradient(135deg, transparent 55%, rgba(140,158,175,0.55) 55%)",
                        borderTopLeftRadius: 8,
                      }} />
                    {card.pinned && <div style={{ position: "absolute", left: 5, top: 4, fontSize: 14, zIndex: 2 }}>📌</div>}
                    {isHead && card.collapsed && (
                      <div style={{
                        position: "absolute", left: 6, bottom: 6, background: ACCENT_DEEP, color: "#fff",
                        borderRadius: 10, fontSize: 11, fontWeight: 800, padding: "2px 8px", zIndex: 2,
                      }}>{chainLen}枚</div>
                    )}
                  </div>
                  {/* 接続ハンドル: 右辺中央の○(カード枠の外に半分はみ出す) */}
                  <div
                    onPointerDown={connDown(card)} onPointerMove={connMove(card)}
                    onPointerUp={connUp(card)} onPointerCancel={connUp(card)}
                    title="ドラッグして他のカードと接続"
                    style={{
                      position: "absolute", right: -12, top: "50%", marginTop: -12,
                      width: 24, height: 24, borderRadius: 12, touchAction: "none",
                      background: "#fff", border: `2px solid ${ACCENT_DEEP}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, color: ACCENT_DEEP, cursor: "crosshair", zIndex: 3,
                      boxShadow: "0 2px 8px rgba(15,18,22,0.4)",
                    }}>⛓</div>
                </div>
                {card.tags.length > 0 && (
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 5 }}>
                    {card.tags.map((t) => (
                      <span key={t} style={{ background: "rgba(255,255,255,0.12)", color: LIGHT_TXT, fontSize: 10, borderRadius: 8, padding: "1px 7px" }}>#{t}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 上部バー */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 46, display: "flex", alignItems: "center", padding: "0 10px", zIndex: 11, pointerEvents: "none" }}>
        <button onClick={onBack} style={{ pointerEvents: "auto", background: "rgba(255,255,255,0.95)", border: "none", borderRadius: 19, width: 38, height: 38, fontWeight: 700, color: INK, cursor: "pointer", fontSize: 17, boxShadow: "0 3px 12px rgba(15,18,22,0.35)", flexShrink: 0 }}>‹</button>
        {/* ゴミ箱(上中央) */}
        <div ref={trashRef} style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)", top: 8,
          display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 18,
          border: trashHot ? `2px dashed #e89aa4` : `1.5px dashed rgba(255,255,255,0.3)`,
          background: trashHot ? "rgba(232,154,164,0.2)" : "rgba(255,255,255,0.07)",
          color: trashHot ? "#f3c3ca" : "rgba(255,255,255,0.55)", fontSize: 11, transition: "all .15s",
        }}>
          🗑 {trashHot ? "はなして削除" : "ここへドラッグで削除"}
        </div>
        <div style={{
          marginLeft: "auto", textAlign: "right", fontSize: 11, lineHeight: 1.4, letterSpacing: 0.5,
          background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "5px 12px",
          maxWidth: "45%", overflow: "hidden",
        }}>
          <div style={{ fontWeight: 700, color: LIGHT_TXT, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{group.name}</div>
          <div style={{ color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{note.name}</div>
        </div>
      </div>

      {/* ズームコントロール(右下) */}
      <div style={{
        position: "absolute", right: 12, bottom: 92, zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center",
        background: "rgba(255,255,255,0.96)", borderRadius: 18, boxShadow: "0 6px 16px rgba(15,18,22,0.4)", overflow: "hidden",
      }}>
        <button onClick={() => zoomButton(1.25)} title="拡大" style={{ width: 40, height: 38, border: "none", borderBottom: `1px solid ${BORDER}`, background: "none", color: INK, fontSize: 20, cursor: "pointer" }}>＋</button>
        <button onClick={() => { setZoomAnim(true); clearTimeout(zoomAnimTimer.current); zoomAnimTimer.current = setTimeout(() => setZoomAnim(false), 260); setScale(1); setPan({ x: 0, y: 0 }); }} title="100%に戻す" style={{ width: 40, height: 30, border: "none", borderBottom: `1px solid ${BORDER}`, background: "none", color: scale !== 1 ? ACCENT_DEEP : SUBTLE, fontSize: 9, fontWeight: 700, cursor: "pointer" }}>{Math.round(scale * 100)}%</button>
        <button onClick={() => zoomButton(0.8)} title="縮小" style={{ width: 40, height: 38, border: "none", background: "none", color: INK, fontSize: 20, cursor: "pointer" }}>−</button>
      </div>

      {/* 下中央: ツールドック(資料箱・共有もここに統合) */}
      <div style={{
        position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", zIndex: 10,
        display: "flex", alignItems: "center", gap: 2, padding: "6px 10px",
        background: "rgba(255,255,255,0.96)", borderRadius: 22, boxShadow: "0 8px 26px rgba(15,18,22,0.45)",
        maxWidth: "94vw", overflowX: "auto",
      }}>
        <DockBtn label="テキスト" img={ICON_TEXT} glow={tut === "text"}
          onClick={() => { setPalette((p) => (p ? false : true)); onTutAdvance("text", "color"); }} />
        <DockBtn label="画像" img={ICON_IMG} onClick={() => fileInput.current.click()} />
        <DockBtn label="カメラ" img={ICON_CAM} onClick={() => camInput.current.click()} />
        <DockBtn label="PDF" img={ICON_PDF} onClick={() => pdfInput.current.click()} />
        <div style={{ width: 1, height: 32, background: BORDER, margin: "0 6px", flexShrink: 0 }} />
        <div ref={boxBtnRef} onClick={() => setBoxOpen(true)} style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer",
          padding: "4px 10px", borderRadius: 14, transition: "all .15s", flexShrink: 0,
          background: boxHot ? ACCENT_SOFT : "none",
          outline: boxHot ? `2px dashed ${ACCENT_DEEP}` : "none",
        }}>
          <img src={ICON_BOX} alt="" draggable={false} style={{ width: 26, height: 26, objectFit: "contain" }} />
          <span style={{ fontSize: 9, color: boxHot ? ACCENT_DEEP : SUBTLE, letterSpacing: 1, fontWeight: boxHot ? 700 : 400, whiteSpace: "nowrap" }}>資料箱</span>
        </div>
        <div ref={shareBtnRef} onClick={() => showToast("カードをここへドラッグすると他のノートへ送れます")} style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer",
          padding: "4px 10px", borderRadius: 14, transition: "all .15s", flexShrink: 0,
          background: shareHot ? ACCENT_SOFT : "none",
          outline: shareHot ? `2px dashed ${ACCENT_DEEP}` : "none",
        }}>
          <img src={ICON_SHARE} alt="" draggable={false} style={{ width: 26, height: 26, objectFit: "contain" }} />
          <span style={{ fontSize: 9, color: shareHot ? ACCENT_DEEP : SUBTLE, letterSpacing: 1, fontWeight: shareHot ? 700 : 400, whiteSpace: "nowrap" }}>共有</span>
        </div>
      </div>

      {/* 色パレット(ドックの上) */}
      {palette && (
        <div className={tut === "color" ? "tut-glow" : undefined} style={{
          position: "absolute", bottom: 84, left: "50%", transform: "translateX(-50%)",
          background: "#fff", borderRadius: 18, zIndex: 20, padding: 14,
          boxShadow: "0 14px 40px rgba(15,18,22,0.5)", width: 196,
        }}>
          <div style={{ fontSize: 11, color: SUBTLE, marginBottom: 8, textAlign: "center", letterSpacing: 1 }}>
            {palette.cardId ? "カードの色を変更" : "カードの色を選択"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              "#ffffff", "#f1f3f5", "#fce7ee",
              "#f8d9e4", "#fdf3e3", "#f7ecd2",
              "#e7f3ec", "#d9ecdf", "#e8f3fa",
              "#d6e9f5", "#efe9f7", "#e2d9f1",
              "#3f4750", "transparent",
            ].map((c) => (
              <button key={c} onClick={() => pickCardColor(c)} style={{
                width: 54, height: 40, borderRadius: 10, cursor: "pointer",
                border: `1px solid ${c === "#ffffff" || c === "transparent" ? "#d4dae1" : "rgba(0,0,0,0.06)"}`,
                background: c === "transparent" ? "repeating-linear-gradient(45deg, #fff 0 6px, #eef1f4 6px 12px)" : c,
                position: "relative", padding: 0,
              }}>
                {c === "transparent" && (
                  <svg width="54" height="40" style={{ position: "absolute", inset: 0 }}>
                    <line x1="7" y1="7" x2="47" y2="33" stroke="#b9c2cb" strokeWidth="1.5" />
                    <line x1="47" y1="7" x2="7" y2="33" stroke="#b9c2cb" strokeWidth="1.5" />
                  </svg>
                )}
              </button>
            ))}
            <label style={{
              width: 54, height: 40, borderRadius: 10, cursor: "pointer", overflow: "hidden",
              border: `1px solid #d4dae1`, position: "relative", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 16,
              background: "conic-gradient(#f8d9e4, #f7ecd2, #d9ecdf, #d6e9f5, #e2d9f1, #f8d9e4)",
            }}>
              🎨
              <input type="color" defaultValue="#f8d9e4"
                onChange={(e) => pickCardColor(e.target.value)}
                style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }} />
            </label>
          </div>
        </div>
      )}

      {/* 長押しメニュー */}
      {menu && (() => {
        const c = cards.find((x) => x.id === menu.cardId);
        if (!c) return null;
        return (
          <div style={{
            position: "absolute", left: Math.min(menu.vx, window.innerWidth - 175), top: Math.min(menu.vy, window.innerHeight - 230),
            background: "#fff", borderRadius: 14, boxShadow: "0 10px 30px rgba(15,18,22,0.5)", zIndex: 50,
            overflow: "hidden", width: 165,
          }}>
            {(() => {
              const incomingTop = buildIncoming(topLevel);
              const isHead = !incomingTop[c.id] && c.next;       // 連結チェーンの先頭
              const isMerged = isHead && c.collapsed;            // まとめ済み
              const items = [];
              if (isMerged) {
                // まとめ済み: グループごと複製/削除
                items.push(["📑 まとめて複製", () => duplicateChain(c.id)]);
                items.push(["🔓 まとめを解除", () => patchCard(c.id, { collapsed: false })]);
                items.push(["🗑 まとめて削除", () => deleteChain(c.id)]);
              } else if (isHead) {
                // 連結済みだがバラバラ: 整列ボタン
                items.push(["📑 複製", () => addCards(cloneBundleOf(c.id, [c.x + 30, c.y + 30]))]);
                items.push(["📐 整列", () => alignChain(c.id)]);
                items.push(["🔗 まとめる", () => patchCard(c.id, { collapsed: true })]);
                items.push([c.pinned ? "📌 ピン解除" : "📌 ピン留め", () => patchCard(c.id, { pinned: !c.pinned })]);
                items.push(["🎨 カードの色", () => setPalette({ cardId: c.id })]);
                items.push(["🗑 削除", () => removeDeep(c.id)]);
              } else {
                // 単独カード(画像・テキスト・PDFすべて)
                items.push(["📑 複製", () => addCards(cloneBundleOf(c.id, [c.x + 30, c.y + 30]))]);
                items.push([c.pinned ? "📌 ピン解除" : "📌 ピン留め", () => patchCard(c.id, { pinned: !c.pinned })]);
                items.push(["🎨 カードの色", () => setPalette({ cardId: c.id })]);
                items.push(["🏷 タグを追加", () => {
                  setPromptD({
                    title: "タグ名を入力", initial: "",
                    cb: (t) => { if (!c.tags.includes(t)) patchCard(c.id, { tags: [...c.tags, t] }); },
                  });
                }]);
                items.push(["🗑 削除", () => removeDeep(c.id)]);
              }
              return items;
            })().map(([label, fn]) => (
              <button key={label} onClick={() => { fn(); setMenu(null); }} style={{
                display: "block", width: "100%", padding: "11px 14px", border: "none", background: "none",
                textAlign: "left", fontSize: 14, cursor: "pointer", borderBottom: `1px solid ${BORDER}`, color: INK,
              }}>{label}</button>
            ))}
          </div>
        );
      })()}

      {/* 資料箱: 格納先選択 */}
      {boxDrop && (() => {
        const c = cards.find((x) => x.id === boxDrop);
        if (!c) return null;
        const storeInto = (fileId) => {
          const bundle = cloneBundleOf(c.id);
          setMaterialBox((mb) => mb.map((f) => (f.id === fileId ? { ...f, items: [...f.items, { id: uid(), cards: bundle }] } : f)));
          removeDeep(c.id);
          setBoxDrop(null);
          showToast("資料箱に格納しました");
        };
        return (
          <div style={{ position: "fixed", inset: 0, background: "rgba(20,23,28,0.45)", zIndex: 80, display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => setBoxDrop(null)}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 18, width: 290, maxHeight: "70%", overflowY: "auto", boxShadow: "0 18px 50px rgba(0,0,0,0.45)" }}>
              <div style={{ padding: "16px 18px 8px", fontWeight: 700, fontSize: 14, color: INK, textAlign: "center" }}>どのファイルに格納しますか?</div>
              {materialBox.map((f) => (
                <button key={f.id} onClick={() => storeInto(f.id)} style={{
                  display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "12px 18px",
                  border: "none", borderTop: `1px solid ${BORDER}`, background: "none", cursor: "pointer", fontSize: 14, color: INK,
                }}>
                  📁 <span style={{ flex: 1, textAlign: "left" }}>{f.name}</span>
                  <span style={{ fontSize: 11, color: SUBTLE }}>{f.items.length}枚</span>
                </button>
              ))}
              <button onClick={() => {
                setPromptD({
                  title: "新しいファイル名", initial: `ファイル${materialBox.length + 1}`,
                  cb: (name) => {
                    const bundle = cloneBundleOf(c.id);
                    setMaterialBox((mb) => [...mb, { id: uid(), name, items: [{ id: uid(), cards: bundle }] }]);
                    removeDeep(c.id);
                    showToast(`「${name}」を作成して格納しました`);
                  },
                });
                setBoxDrop(null);
              }} style={{
                display: "block", width: "100%", padding: "13px 18px", border: "none", borderTop: `1px solid ${BORDER}`,
                background: ACCENT_SOFT, color: ACCENT_DEEP, fontWeight: 700, fontSize: 14, cursor: "pointer",
                borderRadius: "0 0 18px 18px",
              }}>＋ 新しいファイルを作って格納</button>
            </div>
          </div>
        );
      })()}

      {/* 共有: 送信先ノート選択 */}
      {shareDrop && (() => {
        const c = cards.find((x) => x.id === shareDrop);
        if (!c) return null;
        return (
          <div style={{ position: "fixed", inset: 0, background: "rgba(20,23,28,0.45)", zIndex: 80, display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => setShareDrop(null)}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 18, width: 300, maxHeight: "72%", overflowY: "auto", boxShadow: "0 18px 50px rgba(0,0,0,0.45)" }}>
              <div style={{ padding: "16px 18px 10px", fontWeight: 700, fontSize: 14, color: INK, textAlign: "center" }}>どのノートへ送りますか?</div>
              {groups.map((g) => (
                <div key={g.id}>
                  <div style={{ padding: "8px 18px 4px", fontSize: 11, color: SUBTLE, fontWeight: 700, letterSpacing: 1, borderTop: `1px solid ${BORDER}` }}>{g.name}</div>
                  {g.notes.filter((n) => !(g.id === group.id && n.id === note.id)).map((n) => (
                    <button key={n.id} onClick={() => {
                      onSendCard(g.id, n.id, cloneBundleOf(c.id, [140 + Math.random() * 80, 140 + Math.random() * 80]));
                      setShareDrop(null);
                      showToast(`「${n.name}」へ送りました`);
                    }} style={{
                      display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 18px 10px 26px",
                      border: "none", background: "none", cursor: "pointer", fontSize: 13, color: INK,
                    }}>
                      📓 <span style={{ flex: 1, textAlign: "left" }}>{n.name}</span>
                    </button>
                  ))}
                  {g.notes.filter((n) => !(g.id === group.id && n.id === note.id)).length === 0 && (
                    <div style={{ padding: "4px 18px 10px 26px", fontSize: 11, color: "#c3cad2" }}>送れるノートがありません</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* 資料箱パネル */}
      {boxOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(20,23,28,0.45)", zIndex: 80 }}
          onClick={() => setBoxOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: 285, background: "#fff",
            boxShadow: "-8px 0 30px rgba(0,0,0,0.4)", display: "flex", flexDirection: "column",
          }}>
            <div style={{ padding: "16px 16px 10px", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid ${BORDER}` }}>
              <img src={ICON_BOX} alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
              <span style={{ fontWeight: 700, color: INK, flex: 1 }}>資料箱</span>
              <button onClick={() => setBoxOpen(false)} style={{ border: "none", background: "none", color: SUBTLE, fontSize: 16, cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
              {materialBox.length === 0 && (
                <div style={{ color: SUBTLE, fontSize: 12, textAlign: "center", marginTop: 30, lineHeight: 1.8 }}>
                  まだファイルがありません。<br />カードを「資料箱」へ<br />ドラッグして格納できます。
                </div>
              )}
              {materialBox.map((f) => (
                <div key={f.id} style={{ marginBottom: 14, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 12px", background: "#f7f9fb" }}>
                    📁 <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: INK }}>{f.name}</span>
                    <button onClick={() => setMaterialBox((mb) => mb.filter((x) => x.id !== f.id))}
                      style={{ border: "none", background: "none", color: SUBTLE, cursor: "pointer", fontSize: 13 }}>🗑</button>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 10 }}>
                    {f.items.length === 0 && <span style={{ fontSize: 11, color: "#c3cad2" }}>空のファイル</span>}
                    {f.items.map((it) => (
                      <div key={it.id} style={{ width: 110 }}>
                        <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${BORDER}` }}>
                          <CardStage card={it.cards[0]} subCards={it.cards.slice(1)} w={110} h={82} />
                        </div>
                        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                          <button onClick={() => {
                            const [x, y] = spawnPos();
                            addCards(cloneBundle(it.cards, [x, y]));
                            setBoxOpen(false);
                            showToast("キャンバスに取り出しました");
                          }} style={{ flex: 1, border: "none", borderRadius: 8, background: ACCENT_SOFT, color: ACCENT_DEEP, fontSize: 10, fontWeight: 700, padding: "4px 0", cursor: "pointer" }}>取り出す</button>
                          <button onClick={() => setMaterialBox((mb) => mb.map((x) => (x.id === f.id ? { ...x, items: x.items.filter((cc) => cc.id !== it.id) } : x)))}
                            style={{ border: "none", borderRadius: 8, background: "#f4f6f8", color: SUBTLE, fontSize: 10, padding: "4px 7px", cursor: "pointer" }}>🗑</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* スワイプ閲覧 */}
      {viewerChain && viewerChain.length > 0 && (
        <SwipeViewer chain={viewerChain} allCards={cards} onClose={() => setViewerHead(null)}
          onEdit={(id) => { setViewerHead(null); setEditStack([id]); }} />
      )}

      {/* カードエディタ(階層スタック: 子カードを開くと深くなる) */}
      {editStack.map((id, i) => {
        if (i !== editStack.length - 1) return null;
        // 最上位(depth1)のカードが連結チェーンの一部なら、左右スワイプで前後へ移動できる
        let chainIds = null;
        if (i === 0) {
          const cur = cards.find((c) => c.id === id);
          if (cur && !cur.parentId) {
            // チェーンの先頭を探す
            const incTop = buildIncoming(topLevel);
            let head = id;
            const guard = new Set();
            while (incTop[head] && !guard.has(head)) { guard.add(head); head = incTop[head]; }
            const ch = chainFrom(topLevel, head);
            if (ch.length >= 2) chainIds = ch.map((c) => c.id);
          }
        }
        return (
          <CardEditor key={id} cardId={id} cards={cards} depth={i + 1}
            patchCard={patchCard} addCards={addCards} removeDeep={removeDeep}
            detachChild={detachChild} onUndo={undo} onRedo={redo}
            chainIds={chainIds}
            onNavigate={(cid) => setEditStack((st) => [...st.slice(0, -1), cid])}
            pushEdit={(cid) => setEditStack((st) => [...st, cid])}
            onClose={() => setEditStack((st) => st.slice(0, -1))}
            showToast={showToast} />
        );
      })}

      {/* チュートリアル */}
      <TutStyle />
      {tut === "text" && (
        <TutBubble no={4} title="カードを作ろう"
          desc={<>下の「テキスト」をタップしてみよう。</>}
          onSkip={onTutEnd} style={{ bottom: 92 }} />
      )}
      {tut === "color" && (
        <TutBubble no={5} title="カードの色を選ぼう"
          desc={<>すきな色をタップすると、キャンバスにカードが置かれるよ。</>}
          onSkip={onTutEnd} style={{ top: 56 }} />
      )}
      {tut === "done" && (
        <TutBubble title="カード完成!"
          desc={<>ダブルタップで中を編集、ドラッグで移動。右の○から他のカードと接続もできるよ。下のドックから資料箱・共有も使ってみてね。</>}
          style={{ top: "36%" }}
          btn={
            <button onClick={onTutEnd} style={{ border: "none", background: ACCENT_DEEP, color: "#fff", borderRadius: 12, padding: "6px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              はじめる
            </button>
          } />
      )}

      {/* トースト・ダイアログ */}
      <Toast msg={toast} />
      {promptD && (
        <PromptDialog title={promptD.title} initial={promptD.initial}
          onOk={promptD.cb} onClose={() => setPromptD(null)} />
      )}
      {confirmD && (
        <ConfirmDialog message={confirmD.message}
          onOk={confirmD.cb} onClose={() => setConfirmD(null)} />
      )}

      {/* 隠しinput */}
      <input ref={fileInput} type="file" accept="image/*" multiple style={{ display: "none" }}
        onChange={(e) => { addImages(e.target.files); e.target.value = ""; }} />
      <input ref={camInput} type="file" accept="image/*" capture="environment" style={{ display: "none" }}
        onChange={(e) => { addImages(e.target.files); e.target.value = ""; }} />
      <input ref={pdfInput} type="file" accept="application/pdf" style={{ display: "none" }}
        onChange={(e) => { if (e.target.files[0]) addPdf(e.target.files[0]); e.target.value = ""; }} />
    </div>
  );
}

/* ============================================================
   永続化(localStorage)
   旧形式のデータは子カード形式に自動移行
   ============================================================ */
const STORAGE_KEY = "teddynote:data";
const migrateAll = (data) => {
  // v1: groups配列のみ / v2: {groups, materialBox(cards)} / v3: 子カード形式 {v:3,...}
  if (Array.isArray(data)) data = { groups: data, materialBox: [] };
  if (data.v === 3) return data;
  const groups = (data.groups || []).map((g) => ({
    ...g,
    notes: (g.notes || []).map((n) => ({ ...n, cards: (n.cards || []).flatMap(migrateCard) })),
  }));
  const materialBox = (data.materialBox || []).map((f) => ({
    id: f.id, name: f.name,
    items: f.items
      ? f.items
      : (f.cards || []).map((c) => ({ id: uid(), cards: migrateCard(c) })),
  }));
  return { v: 3, groups, materialBox };
};
const persistence = {
  load: async () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? migrateAll(JSON.parse(raw)) : null;
    } catch (e) { return null; }
  },
  save: async (groups, materialBox) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 3, groups, materialBox })); return true; }
    catch (e) { console.error("save failed", e); return false; }
  },
};

const DEFAULT_GROUPS = () => [
  { id: uid(), name: "国語", notes: [] },
  { id: uid(), name: "数学", notes: [] },
  { id: uid(), name: "化学", notes: [] },
  { id: uid(), name: "修学旅行のアルバム", notes: [] },
];

/* ノートの中身を小さく描く(ホームのノートタイル用) */
function MiniPreview({ cards }) {
  const tops = cards.filter((c) => !c.parentId).slice(0, 16);
  const k = 0.11;
  return (
    <div style={{ height: 88, borderRadius: 12, background: CANVAS_BG, position: "relative", overflow: "hidden" }}>
      {tops.map((c) => (
        <div key={c.id} style={{
          position: "absolute", left: 10 + c.x * k, top: 6 + c.y * k,
          width: Math.max(12, c.w * k), height: Math.max(9, c.h * k), borderRadius: 3,
          background: c.type === "image" ? "#b9c8d4" : c.type === "pdf" ? "#f3dede" :
            (c.color && c.color !== "transparent" ? c.color : "#f4f6f8"),
          border: c.color === "transparent" ? "1px dashed rgba(255,255,255,0.45)" : "none",
          boxSizing: "border-box", opacity: 0.95,
        }} />
      ))}
      {tops.length === 0 && (
        <span style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          color: "rgba(255,255,255,0.32)", fontSize: 10, letterSpacing: 3, fontFamily: SERIF,
        }}>empty</span>
      )}
    </div>
  );
}

/* ============================================================
   ホーム画面(グループ=チップ / ノート=プレビュー付きグリッド)
   ============================================================ */
export default function App() {
  const [entered, setEntered] = useState(false);
  const [materialBox, setMaterialBox] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [saveState, setSaveState] = useState("idle");
  const [selGroup, setSelGroup] = useState(null);
  const [openNote, setOpenNote] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [renameD, setRenameD] = useState(null);
  const [tut, setTut] = useState(null); // チュートリアル: rename→addNote→openNote→text→color→done
  const tutSeen = useRef(false);
  const tutStarted = useRef(false);
  const saveTimer = useRef(null);

  const advanceTut = (from, to) => setTut((t) => (t === from ? to : t));
  const endTut = () => {
    setTut(null);
    tutSeen.current = true;
    try { localStorage.setItem("teddynote:tut", "1"); } catch (e) {}
  };

  // 初回だけチュートリアルを自動開始
  useEffect(() => {
    try { if (localStorage.getItem("teddynote:tut")) tutSeen.current = true; } catch (e) {}
  }, []);
  useEffect(() => {
    if (entered && loaded && !tutSeen.current && !tutStarted.current) {
      tutStarted.current = true;
      setTut("rename");
    }
  }, [entered, loaded]);

  useEffect(() => {
    (async () => {
      const data = await persistence.load();
      if (data) {
        const gs = Array.isArray(data.groups) ? data.groups : [];
        const untouched = gs.length > 0 && gs.every((g) => !g.notes || g.notes.length === 0);
        setGroups(gs.length && !untouched ? gs : DEFAULT_GROUPS());
        setMaterialBox(Array.isArray(data.materialBox) ? data.materialBox : []);
      } else {
        setGroups(DEFAULT_GROUPS());
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    setSaveState("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const ok = await persistence.save(groups, materialBox);
      setSaveState(ok ? "saved" : "error");
    }, 800);
    return () => clearTimeout(saveTimer.current);
  }, [groups, materialBox, loaded]);

  const group = groups.find((g) => g.id === (openNote ? openNote.groupId : selGroup));
  const note = openNote && group ? group.notes.find((n) => n.id === openNote.noteId) : null;

  const updateNoteCards = (cards) => {
    setGroups((gs) => gs.map((g) =>
      g.id !== openNote.groupId ? g :
      { ...g, notes: g.notes.map((n) => (n.id !== openNote.noteId ? n : { ...n, cards })) }));
  };
  const sendCardToNote = (gid, nid, bundle) => {
    setGroups((gs) => gs.map((g) =>
      g.id !== gid ? g :
      { ...g, notes: g.notes.map((n) => (n.id !== nid ? n : { ...n, cards: [...n.cards, ...bundle] })) }));
  };

  const SaveBadge = () => (
    <div style={{
      position: "fixed", bottom: 8, left: 10, zIndex: 400,
      fontSize: 10, color: saveState === "error" ? "#d04030" : SUBTLE,
      background: "rgba(255,255,255,0.85)", padding: "2px 10px", borderRadius: 10, pointerEvents: "none",
    }}>
      {saveState === "saving" ? "保存中…" : saveState === "saved" ? "保存済み" : saveState === "error" ? "保存に失敗しました" : ""}
    </div>
  );

  if (!entered) return <LoginGate onEnter={() => setEntered(true)} />;

  if (!loaded) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#f4f5f7", display: "flex", alignItems: "center", justifyContent: "center", color: SUBTLE, fontSize: 14 }}>
        読み込み中…
      </div>
    );
  }

  if (openNote && note && group) {
    return (
      <>
        <CanvasScreen note={note} group={group} groups={groups}
          materialBox={materialBox} setMaterialBox={setMaterialBox}
          onSendCard={sendCardToNote}
          tut={tut} onTutAdvance={advanceTut} onTutEnd={endTut}
          onUpdateCards={updateNoteCards} onBack={() => setOpenNote(null)} />
        <SaveBadge />
      </>
    );
  }

  const effSel = selGroup ?? (groups[0] ? groups[0].id : null);
  const selG = groups.find((g) => g.id === effSel);

  return (
    <div style={{
      position: "fixed", inset: 0, overflowY: "auto",
      fontFamily: "'Hiragino Sans','Noto Sans JP',sans-serif",
      background: "radial-gradient(circle at 10% 6%, #dde7f0 0%, rgba(221,231,240,0) 40%), radial-gradient(circle at 92% 95%, #e3ebf2 0%, rgba(227,235,242,0) 45%), #f5f6f7",
    }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "36px 18px 70px" }}>

        {/* ブランド */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={LOGO_SRC} alt="" style={{ width: 58, height: 58, objectFit: "contain", mixBlendMode: "multiply" }} />
          <div style={{ marginTop: 8, fontSize: 25, color: "#23272d", fontFamily: SERIF, letterSpacing: "0.26em", textIndent: "0.26em" }}>onote</div>
          <div style={{ marginTop: 6, fontSize: 9.5, color: "#9aa1aa", letterSpacing: "0.3em", textIndent: "0.3em" }}>〜 CARDS ON MY CANVAS 〜</div>
        </div>

        {/* 検索 */}
        <div style={{
          margin: "24px auto 0", maxWidth: 420, display: "flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.85)", border: "1px solid #dcdfe3", borderRadius: 999,
          padding: "10px 18px", color: SUBTLE, fontSize: 12.5, letterSpacing: 1,
        }}>
          🔎 ノートを検索する
        </div>

        {/* グループ(チップ) */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 26 }}>
          {groups.map((g) => {
            const on = effSel === g.id;
            return (
              <button key={g.id} onClick={() => setSelGroup(g.id)}
                className={tut === "rename" && on ? "tut-glow" : undefined}
                style={{
                border: on ? "1px solid #3f4750" : "1px solid #dcdfe3",
                background: on ? "#3f4750" : "rgba(255,255,255,0.85)",
                color: on ? "#fff" : "#4a525c",
                borderRadius: 999, padding: "8px 16px", fontSize: 13, cursor: "pointer",
                letterSpacing: 1, fontWeight: on ? 700 : 500, transition: "all .15s",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                {g.name}
                {on && (
                  <span onClick={(e) => {
                    e.stopPropagation();
                    setRenameD({
                      title: "グループ名を変更", initial: g.name,
                      cb: (nv) => {
                        setGroups((gs) => gs.map((x) => (x.id === g.id ? { ...x, name: nv } : x)));
                        advanceTut("rename", "addNote");
                      },
                    });
                  }} style={{ fontSize: 11, opacity: 0.75 }}>✎</span>
                )}
              </button>
            );
          })}
          <button onClick={() => setDialog({ type: "group", name: "" })} style={{
            border: "1.5px dashed #c4cbd3", background: "none", color: SUBTLE,
            borderRadius: 999, padding: "8px 15px", fontSize: 13, cursor: "pointer",
          }}>＋</button>
        </div>

        {/* ノート(プレビュー付きグリッド) */}
        {selG ? (
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
            gap: 14, marginTop: 30,
          }}>
            <button onClick={() => setDialog({ type: "note", name: defaultNoteName() })}
              className={tut === "addNote" ? "tut-glow" : undefined}
              style={{
              minHeight: 140, borderRadius: 16, border: "1.5px dashed #c4cbd3", background: "rgba(255,255,255,0.55)",
              color: SUBTLE, fontSize: 12.5, cursor: "pointer", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 6, letterSpacing: 1,
            }}>
              <span style={{ fontSize: 24, color: "#b6bec7" }}>＋</span>
              新しいノート
            </button>
            {selG.notes.map((n, ni) => (
              <div key={n.id}
                className={tut === "openNote" && ni === 0 ? "tut-glow" : undefined}
                onClick={() => { setOpenNote({ groupId: selG.id, noteId: n.id }); advanceTut("openNote", "text"); }} style={{
                background: "#fff", borderRadius: 16, padding: 9, cursor: "pointer",
                border: `1px solid ${BORDER}`, boxShadow: "0 6px 18px rgba(150,165,182,0.18)",
              }}>
                <MiniPreview cards={n.cards} />
                <div style={{ display: "flex", alignItems: "center", marginTop: 8, gap: 6 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: 600, fontSize: 12.5, color: INK,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>{n.name}</div>
                    <div style={{ fontSize: 10, color: SUBTLE, marginTop: 2 }}>
                      カード {n.cards.filter((c) => !c.parentId).length} 枚
                    </div>
                  </div>
                  <span onClick={(e) => {
                    e.stopPropagation();
                    setRenameD({
                      title: "ノート名を変更", initial: n.name,
                      cb: (nv) => setGroups((gs) => gs.map((g) => (g.id !== selG.id ? g : { ...g, notes: g.notes.map((x) => (x.id === n.id ? { ...x, name: nv } : x)) }))),
                    });
                  }} style={{ color: "#c3cad2", padding: "2px 4px", fontSize: 14 }}>⋯</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ marginTop: 50, textAlign: "center", color: SUBTLE, fontSize: 13 }}>
            「＋」からグループを作りましょう
          </div>
        )}

        <div style={{ marginTop: 50, textAlign: "center", color: "#c3cad2", fontSize: 10, letterSpacing: 3, fontFamily: SERIF }}>
          onote
        </div>
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <button onClick={() => setTut("rename")} style={{ border: "none", background: "none", color: SUBTLE, fontSize: 11, cursor: "pointer", letterSpacing: 1 }}>
            ？ 使い方をもう一度見る
          </button>
        </div>
      </div>

      <TutStyle />
      {tut === "rename" && (
        <TutBubble no={1} title="グループ名を変えてみよう"
          desc={<>光っているチップの「✎」をタップして、すきな名前に変えてみよう。</>}
          onSkip={endTut} style={{ bottom: 26 }} />
      )}
      {tut === "addNote" && (
        <TutBubble no={2} title="ノートを作ろう"
          desc={<>点線の「＋ 新しいノート」をタップ。名前はそのままでもOK!</>}
          onSkip={endTut} style={{ bottom: 26 }} />
      )}
      {tut === "openNote" && (
        <TutBubble no={3} title="ノートを開こう"
          desc={<>できたノートのタイルをタップして、キャンバスへ。</>}
          onSkip={endTut} style={{ bottom: 26 }} />
      )}

      {/* 作成ダイアログ */}
      {dialog && (
        <PromptDialog
          title={dialog.type === "note" ? "ノートの名前を入力してください" : "グループ名を入力してください"}
          initial={dialog.name}
          onOk={(name) => {
            if (dialog.type === "group") setGroups((gs) => [...gs, { id: uid(), name, notes: [] }]);
            else {
              setGroups((gs) => gs.map((g) => (g.id !== effSel ? g : { ...g, notes: [...g.notes, { id: uid(), name, cards: [] }] })));
              advanceTut("addNote", "openNote");
            }
          }}
          onClose={() => setDialog(null)} />
      )}
      {renameD && (
        <PromptDialog title={renameD.title} initial={renameD.initial}
          onOk={renameD.cb} onClose={() => setRenameD(null)} />
      )}
      <SaveBadge />
    </div>
  );
}

/* ============================================================
   ログイン画面 — perl rabbit風ミニマルUI
   ============================================================ */
function LoginGate({ onEnter }) {
  const [note, setNote] = useState("");
  return (
    <div style={{
      position: "fixed", inset: 0, overflow: "auto",
      fontFamily: "'Hiragino Sans','Noto Sans JP',sans-serif",
      background: "radial-gradient(circle at 12% 8%, #dde7f0 0%, rgba(221,231,240,0) 42%), radial-gradient(circle at 88% 92%, #e3ebf2 0%, rgba(227,235,242,0) 45%), #f5f6f7",
    }}>
      <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 26px", boxSizing: "border-box" }}>

        <img src={LOGO_SRC} alt="onote" style={{ width: 96, height: 96, objectFit: "contain", mixBlendMode: "multiply", marginTop: 18 }} />

        <div style={{
          marginTop: 10, fontSize: 38, color: "#23272d", fontFamily: SERIF, fontWeight: 500,
          letterSpacing: "0.28em", textIndent: "0.28em",
        }}>onote</div>

        <div style={{
          marginTop: 14, fontSize: 12, color: "#8b939d", letterSpacing: "0.32em", textIndent: "0.32em",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ letterSpacing: 0, textIndent: 0 }}>〜</span>
          CARDS ON MY CANVAS
          <span style={{ letterSpacing: 0, textIndent: 0 }}>〜</span>
        </div>

        <div style={{ width: "min(560px, 92%)", height: 1, background: "#dcdfe3", margin: "44px 0 52px" }} />

        <button onClick={onEnter} style={{
          width: "min(560px, 100%)", padding: "19px 0", border: "none", borderRadius: 999,
          background: "#cfe0ee", color: "#3a4654", fontSize: 17, fontWeight: 700, letterSpacing: 2,
          cursor: "pointer",
        }}>＋ ログインなしで使用</button>

        <button onClick={() => setNote("プレビュー版ではGoogleログインは使えません。Firebase版で利用できます。")} style={{
          width: "min(560px, 100%)", padding: "16px 0", borderRadius: 999, marginTop: 14,
          background: "rgba(255,255,255,0.85)", color: "#4a525c", fontSize: 14, fontWeight: 600, letterSpacing: 1,
          border: "1px solid #dcdfe3", cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <span style={{
            width: 17, height: 17, borderRadius: 9, fontSize: 10, fontWeight: 800, color: "#fff",
            background: "conic-gradient(#4285f4 0 25%, #34a853 25% 50%, #fbbc05 50% 75%, #ea4335 75% 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>G</span>
          Googleでログイン
        </button>

        {note && <div style={{ fontSize: 11, color: ACCENT_DEEP, marginTop: 16, lineHeight: 1.7, textAlign: "center" }}>{note}</div>}

        <div style={{ fontSize: 12, color: "#9aa1aa", marginTop: 26, letterSpacing: 1, textAlign: "center" }}>
          すべて端末内だけで保存されます(どこにも送信されません)
        </div>
      </div>
    </div>
  );
}
