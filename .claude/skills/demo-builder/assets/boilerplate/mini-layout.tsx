// src/app/mini/layout.tsx
// LINEミニアプリ用レイアウト

export default function MiniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}
