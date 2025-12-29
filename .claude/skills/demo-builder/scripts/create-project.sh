#!/bin/bash
# デモプロジェクト初期構築スクリプト
# Usage: ./create-project.sh <project-name>

set -e

PROJECT_NAME=${1:-"demo-app"}

echo "🚀 Creating demo project: $PROJECT_NAME"

# Next.js プロジェクト作成
pnpm create next-app@latest "$PROJECT_NAME" \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-pnpm

cd "$PROJECT_NAME"

# 追加パッケージインストール
echo "📦 Installing additional packages..."
pnpm add framer-motion zod lucide-react

# ディレクトリ構造作成
echo "📁 Creating directory structure..."
mkdir -p src/app/mini
mkdir -p src/app/demo
mkdir -p src/components/ui
mkdir -p src/components/mini
mkdir -p src/components/demo
mkdir -p src/lib
mkdir -p src/types

# types/index.ts 作成
cat > src/types/index.ts << 'EOF'
// 共通型定義
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}
EOF

# lib/utils.ts 作成
cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF

# clsx インストール
pnpm add clsx tailwind-merge

echo "✅ Project created successfully!"
echo ""
echo "Next steps:"
echo "  cd $PROJECT_NAME"
echo "  pnpm dev"
