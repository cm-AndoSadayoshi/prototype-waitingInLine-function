---
name: demo-builder
description: "グロースパック for LINEのデモを構築する。プロジェクト作成から実装まで一貫して行う。Next.js 14+ App Router、Tailwind CSS、Framer Motion環境を構築し、ドキュメントに基づいてLINEミニアプリとデモ環境を実装。使用タイミング: (1)デモを構築して (2)デモ用のプロジェクトを作成して (3)プロトタイプガイドを元にデモを実装して (4)LINEミニアプリのデモ環境を作って"
---

# Demo Builder

グロースパック for LINEのデモを構築するスキル。プロジェクト作成から実装まで一貫して行う。

## 前提条件

- `demo-doc-generator` でドキュメントが生成済みであること
- **重要**: プロジェクトは必ずリポジトリのルートに作成すること（Vercelデプロイのため）

## ワークフロー

```
1. プロジェクト作成（ルート） → 2. ディレクトリ構造作成 → 3. ボイラープレート配置 → 4. 画面フロー設計 → 5. 画面実装 → 6. デプロイ
```

### Step 1: プロジェクト作成（リポジトリのルートに直接作成）

**重要**: サブディレクトリではなく、リポジトリのルートに直接Next.jsプロジェクトを作成する。

```bash
# リポジトリのルートで実行（カレントディレクトリに作成）
pnpm create next-app@latest . \
  --typescript --tailwind --eslint --app --src-dir --use-pnpm

# 依存関係を追加
pnpm add framer-motion zod lucide-react clsx tailwind-merge
```

**注意点**:
- `.`（ドット）を指定することで、カレントディレクトリ（リポジトリのルート）に直接作成
- サブディレクトリ（例: `demo/`）には作成しない
- これにより、Vercelがルートの `package.json` と `next.config.js` を認識し、正常にビルドできる

### Step 2: ディレクトリ構造作成

```bash
mkdir -p src/app/mini src/app/demo
mkdir -p src/components/{ui,mini,demo}
mkdir -p src/lib src/types
```

**プロジェクト構造**:
```
src/
├── app/
│   ├── mini/          # LINEミニアプリ
│   └── demo/          # デモ環境（PCブラウザ用）
├── components/
│   ├── ui/            # 共通UIコンポーネント
│   ├── mini/          # ミニアプリ専用
│   └── demo/          # デモ専用
├── lib/               # ユーティリティ
└── types/             # 型定義
```

### Step 3: ボイラープレート配置

`assets/boilerplate/` から以下をコピー:

- `demo-layout.tsx` → `src/app/demo/layout.tsx`
  - サイドバー付きナビゲーション
  - iPhoneフレーム（ノッチ、ステータスバー、ホームインジケーター）
  - 進捗表示とリセット機能
- `mini-layout.tsx` → `src/app/mini/layout.tsx`
- `tailwind.config.ts` のカラー定義を `globals.css` に反映

### Step 4: 画面フロー設計

`docs/06-prototype-guide.md` を参照して `demoSteps` を設計:

```tsx
// src/app/demo/layout.tsx

const demoSteps = [
  { path: "/demo/ticket", label: "整理券発行", step: 1 },
  { path: "/demo/waiting", label: "待機状況", step: 2 },
  { path: "/demo/register", label: "会員登録", step: 3 },
  { path: "/demo/called", label: "呼び出し", step: 4 },
  { path: "/demo/complete", label: "完了", step: 5 },
];

const demoInfo = {
  title: "プロダクト名",
  subtitle: "デモ環境",
  primaryColor: "#06C755",
};
```

詳細: [references/screen-flow-patterns.md](references/screen-flow-patterns.md)

### Step 5: 画面実装

各画面を実装:

1. **カラーパレット適用**: ブランドカラーを設定
2. **画面作成**: 画面一覧に従って各ページを実装
3. **状態シミュレーション**: 必要に応じて自動更新・手動リフレッシュを実装
4. **アニメーション**: Framer Motionでエントリーアニメーション追加

**参照ドキュメント**:
- [references/component-patterns.md](references/component-patterns.md) - UIコンポーネント
- [references/animation-patterns.md](references/animation-patterns.md) - アニメーション
- [references/screen-flow-patterns.md](references/screen-flow-patterns.md) - 画面遷移・状態管理
- [references/coding-standards.md](references/coding-standards.md) - コーディング規約

### Step 6: デプロイ

```bash
vercel --prod
```

---

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| Frontend | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Validation | Zod |
| Icons | Lucide React |
| Hosting | Vercel |
| Package Manager | pnpm |

---

## デザインシステム

### カラーパレット（デフォルト）

| 用途 | カラーコード | 説明 |
|------|-------------|------|
| primary | #06C755 | LINE Green |
| accent | #FF6B35 | 警告・注目 |
| ui-dark | #1F2937 | テキスト（濃） |
| ui-default | #6B7280 | テキスト（標準） |
| ui-soft | #9CA3AF | テキスト（薄） |
| error | #EF4444 | エラー |

### スペーシング

8の倍数（8, 16, 24, 32, 40, 48px）を基本。20px以下は4の倍数も許容。

---

## 主要パターン

### デモレイアウト構成

```
┌─────────────────────────────────────────┐
│  左サイドバー    │    iPhoneプレビュー    │
│  ・タイトル      │    ┌─────────────┐    │
│  ・ステップ一覧   │    │ ステータスバー │    │
│  ・リセットボタン │    │             │    │
│  ・進捗バー      │    │  コンテンツ   │    │
│                 │    │             │    │
│                 │    │ ホームバー    │    │
│                 │    └─────────────┘    │
└─────────────────────────────────────────┘
```

### 状態シミュレーション

| パターン | 用途 | 実装 |
|---------|------|------|
| 自動更新 | カウントダウン、待ち時間 | `useEffect` + `setInterval` |
| 手動リフレッシュ | データ取得 | `useState` + `setTimeout` |
| 条件付きUI | アラート表示 | 閾値チェック + アニメーション |

---

## リソース

- **assets/boilerplate/**: 初期設定ファイル
  - `demo-layout.tsx`: サイドバー付きPCブラウザ用iPhoneフレーム
  - `mini-layout.tsx`: LINEミニアプリ用レイアウト
  - `tailwind.config.ts`: デザインシステム適用済み
- **[references/coding-standards.md](references/coding-standards.md)**: コーディング規約
- **[references/component-patterns.md](references/component-patterns.md)**: コンポーネント実装パターン
- **[references/animation-patterns.md](references/animation-patterns.md)**: Framer Motionパターン
- **[references/screen-flow-patterns.md](references/screen-flow-patterns.md)**: 画面フロー・状態管理パターン
