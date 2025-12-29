# 画面フローパターン

デモの画面遷移と状態シミュレーションのパターン集。

## デモステップの設計

### demoSteps配列の定義

`src/app/demo/layout.tsx` でデモのステップを定義する。

```tsx
const demoSteps = [
  { path: "/demo/ticket", label: "整理券発行", step: 1 },
  { path: "/demo/waiting", label: "待機状況", step: 2 },
  { path: "/demo/register", label: "会員登録", step: 3 },
  { path: "/demo/called", label: "呼び出し", step: 4 },
  { path: "/demo/complete", label: "完了", step: 5 },
];
```

### 現在ステップの取得

```tsx
const pathname = usePathname();
const currentStep = demoSteps.find((s) => s.path === pathname)?.step || 1;
```

---

## 状態シミュレーションパターン

### 1. 自動更新パターン（カウントダウン）

待ち時間や順番待ちの自動減少をシミュレート。

```tsx
"use client";

import { useState, useEffect } from "react";

export default function WaitingPage() {
  const [waitingCount, setWaitingCount] = useState(8);

  // 自動更新（8秒ごと）
  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingCount((prev) => Math.max(prev - 1, 0));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>あと {waitingCount} 組</p>
    </div>
  );
}
```

### 2. 手動リフレッシュパターン

ユーザーが手動で更新をトリガー。

```tsx
const [isRefreshing, setIsRefreshing] = useState(false);

const handleRefresh = () => {
  setIsRefreshing(true);
  setTimeout(() => {
    // データ更新
    setWaitingCount((prev) => Math.max(prev - 1, 0));
    setIsRefreshing(false);
  }, 500);
};

<button onClick={handleRefresh} disabled={isRefreshing}>
  <RefreshCw className={isRefreshing ? "animate-spin" : ""} />
</button>
```

### 3. 条件付きUI表示

状態に応じてUIを動的に変更。

```tsx
const isNearby = waitingCount <= 3;

return (
  <>
    {/* バッジの変化 */}
    <Badge variant={isNearby ? "warning" : "info"}>
      {isNearby ? "もうすぐです" : "待機中"}
    </Badge>

    {/* 条件付きアラート表示 */}
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
  </>
);
```

---

## フォームパターン

### マルチステップフォーム

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
  const [step, setStep] = useState<"form" | "complete">("form");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthday: "",
  });

  const isFormValid = formData.name && formData.phone;

  const handleSubmit = () => {
    if (isFormValid) {
      setStep("complete");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {step === "form" ? (
        <motion.div
          key="form"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Input
            label="お名前"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Input
            label="電話番号"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
          <Button onClick={handleSubmit} disabled={!isFormValid}>
            登録する
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key="complete"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <CheckCircle className="w-16 h-16 text-green-500" />
          <p>登録が完了しました！</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### フォームバリデーション

```tsx
const [errors, setErrors] = useState<Record<string, string>>({});

const validate = () => {
  const newErrors: Record<string, string> = {};

  if (!formData.name) {
    newErrors.name = "お名前を入力してください";
  }
  if (!formData.phone) {
    newErrors.phone = "電話番号を入力してください";
  } else if (!/^\d{10,11}$/.test(formData.phone)) {
    newErrors.phone = "正しい電話番号を入力してください";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

<Input
  label="電話番号"
  error={errors.phone}
  value={formData.phone}
  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
/>
```

---

## ナビゲーションパターン

### ページ間ナビゲーション（Link）

```tsx
import Link from "next/link";

<Link href="/demo/next-step">
  <Button size="lg">次へ進む</Button>
</Link>
```

### 戻るナビゲーション（ヘッダー）

```tsx
<header className="bg-white border-b px-4 py-3">
  <div className="flex items-center gap-3">
    <Link href="/demo/previous" className="p-1 hover:bg-gray-100 rounded-full">
      <ChevronLeft className="w-6 h-6 text-gray-600" />
    </Link>
    <h1 className="font-bold text-gray-800">ページタイトル</h1>
  </div>
</header>
```

### プログラマティックナビゲーション

```tsx
import { useRouter } from "next/navigation";

const router = useRouter();

const handleComplete = () => {
  // 処理完了後に遷移
  router.push("/demo/complete");
};
```

---

## リセット機能

### シンプルなリセット（Link）

最初のステップに戻るだけでリセット完了（各ページは独立した状態を持つ）。

```tsx
<Link href={demoSteps[0]?.path || "/demo"}>
  <RotateCcw className="w-4 h-4" />
  <span>リセット</span>
</Link>
```

### グローバル状態のリセット

Zustandなどを使用している場合。

```tsx
import { useDemoStore } from "@/lib/store";

const reset = useDemoStore((state) => state.reset);

<button onClick={reset}>
  リセット
</button>
```

---

## 画面構成パターン

### 基本的な画面レイアウト

```tsx
export default function DemoPage() {
  return (
    <div className="min-h-full bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b px-4 py-3">
        <h1 className="font-bold text-gray-800">店舗名</h1>
        <p className="text-xs text-gray-500">サブタイトル</p>
      </div>

      {/* メインコンテンツ */}
      <div className="p-4 space-y-4">
        <Card>
          {/* カード内容 */}
        </Card>
      </div>

      {/* フローティングボタン（任意） */}
      <div className="fixed bottom-6 left-4 right-4">
        <Button size="lg">アクション</Button>
      </div>
    </div>
  );
}
```

---

## 状態シミュレーション選択ガイド

| ユースケース | パターン | 推奨設定 |
|------------|---------|---------|
| 待ち時間カウントダウン | 自動更新 | interval: 5-10秒 |
| データ取得 | 手動リフレッシュ | timeout: 500ms |
| 通知・アラート | 条件付き表示 | 閾値を設定 |
| 入力フォーム | マルチステップ | AnimatePresence |
| 完了確認 | スタッガード表示 | delay: 0.1-0.3秒 |
