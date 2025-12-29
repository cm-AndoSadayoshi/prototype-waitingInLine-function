# アニメーションパターン

Framer Motionを使用した実用的なアニメーションパターン集。

## 基本パターン

### ページエントリーアニメーション

ページ読み込み時のフェードイン + スライドアップ。

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* コンテンツ */}
</motion.div>
```

### ディレイ付きエントリー

コンテンツを順番に表示する。

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
  {/* 0.2秒後に表示 */}
</motion.div>
```

---

## スタッガードアニメーション

### リストアイテムの順次表示

```tsx
{items.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
  >
    {/* 0.1秒間隔で順次表示 */}
  </motion.div>
))}
```

### 完了画面のスタッガード

```tsx
<motion.div
  initial={{ scale: 0.5, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", delay: 0.2 }}
>
  <CheckCircle className="w-20 h-20 text-green-500" />
</motion.div>

<motion.h2
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
>
  完了しました！
</motion.h2>

<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
>
  ご利用ありがとうございました
</motion.p>
```

---

## 値遷移アニメーション

### AnimatePresenceによる数値変化

カウントダウンや待ち組数の変化に最適。

```tsx
import { motion, AnimatePresence } from "framer-motion";

<AnimatePresence mode="wait">
  <motion.span
    key={value}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="text-6xl font-bold"
  >
    {value}
  </motion.span>
</AnimatePresence>
```

### コンテナのスケールアニメーション（値変化時）

```tsx
<motion.div
  key={waitingCount}
  initial={{ scale: 1.1 }}
  animate={{ scale: 1 }}
  className="text-center py-6 bg-gray-50 rounded-xl"
>
  <AnimatePresence mode="wait">
    <motion.span
      key={waitingCount}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-6xl font-bold"
    >
      {waitingCount}
    </motion.span>
  </AnimatePresence>
</motion.div>
```

---

## 注目喚起アニメーション

### パルスアニメーション

重要な通知やアラートに。

```tsx
<motion.div
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 1.5, repeat: Infinity }}
  className="w-16 h-16 bg-orange-500 rounded-full"
>
  <Bell className="w-8 h-8 text-white" />
</motion.div>
```

### リップルエフェクト（背景）

成功画面や呼び出し画面に。

```tsx
<div className="relative flex items-center justify-center">
  {/* 背景のリップル */}
  {[...Array(3)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-64 h-64 rounded-full bg-green-500/10"
      animate={{
        scale: [1, 2, 2],
        opacity: [0.3, 0.1, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: i * 0.6,
      }}
    />
  ))}

  {/* 中央のアイコン */}
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", delay: 0.3 }}
  >
    <CheckCircle className="w-24 h-24 text-green-500" />
  </motion.div>
</div>
```

---

## インタラクションアニメーション

### ボタンタップフィードバック

```tsx
<motion.button
  whileTap={{ scale: 0.98 }}
  className="px-6 py-3 bg-primary text-white rounded-xl"
>
  ボタンテキスト
</motion.button>
```

### ホバーエフェクト（デスクトップ向け）

```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="p-4 bg-white rounded-xl shadow-sm cursor-pointer"
>
  {/* カードコンテンツ */}
</motion.div>
```

### リフレッシュボタンのスピン

```tsx
<button onClick={handleRefresh}>
  <RefreshCw
    className={`w-5 h-5 text-gray-500 ${isRefreshing ? "animate-spin" : ""}`}
  />
</button>
```

---

## ページ遷移アニメーション

### マルチステップフォームの遷移

```tsx
<AnimatePresence mode="wait">
  {step === "form" ? (
    <motion.div
      key="form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <FormContent />
    </motion.div>
  ) : (
    <motion.div
      key="complete"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <CompleteContent />
    </motion.div>
  )}
</AnimatePresence>
```

---

## 条件付き表示アニメーション

### アラートの出現

特定の条件を満たした時にアラートを表示。

```tsx
{isNearby && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <AlertCard
      title="まもなく順番です！"
      message="店舗にお戻りください。"
    />
  </motion.div>
)}
```

---

## ユーティリティ

### 共通アニメーション定数

```tsx
// src/lib/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

export const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// 使用例
<motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
  コンテンツ
</motion.div>
```

---

## アニメーション選択ガイド

| ユースケース | パターン | 推奨 |
|------------|---------|------|
| ページ読み込み | fadeInUp | delay: 0〜0.3 |
| リスト表示 | スタッガード | delay: i * 0.1 |
| 数値変化 | AnimatePresence | mode="wait" |
| 成功/完了 | scaleIn + リップル | type: "spring" |
| 注目喚起 | パルス | repeat: Infinity |
| ボタン | whileTap | scale: 0.98 |
| 条件付き表示 | fadeInUp | y: 20 |
