# コーディング規約

## 命名規則

| 対象 | ルール | 例 |
|------|--------|-----|
| コンポーネント | PascalCase | `CouponCard.tsx` |
| 関数 | camelCase | `handleSubmit()` |
| ファイル | kebab-case | `coupon-card.tsx` |
| 型/Interface | PascalCase | `CouponType` |

## TypeScript

- 厳格な型定義を使用
- 型は `src/types/` に集約
- `any` の使用は禁止

```typescript
// Good
interface Coupon {
  id: string;
  title: string;
  discount: number;
}

// Bad
const coupon: any = { ... };
```

## コンポーネント

### Server Components優先

デフォルトはServer Components。以下の場合のみ `'use client'` を使用:

- useState, useEffect等のHooks使用時
- イベントハンドラ（onClick等）使用時
- ブラウザAPI使用時

```tsx
// Client Componentが必要な場合のみ
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## エラーハンドリング

統一エラー型 `AppError` を使用:

```typescript
// src/types/index.ts
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

// 使用例
function handleError(error: AppError) {
  console.error(`[${error.code}] ${error.message}`);
}
```

## アニメーション

Framer Motionを使用:

```tsx
import { motion } from 'framer-motion';

export function FadeIn({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

## アイコン

Lucide Reactを基本使用。LINEなどのブランドアイコンが必要な場合のみ react-icons を追加:

```tsx
import { Heart, Share2, ChevronRight } from 'lucide-react';
import { SiLine } from 'react-icons/si'; // ブランドアイコンのみ
```
