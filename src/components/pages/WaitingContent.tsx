"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Clock,
  Bell,
  Gift,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

interface WaitingContentProps {
  basePath: string; // "/demo" or "/mini"
}

export function WaitingContent({ basePath }: WaitingContentProps) {
  const [waitingCount, setWaitingCount] = useState(5);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setWaitingCount((prev) => Math.max(prev - 1, 0));
      setIsRefreshing(false);
    }, 500);
  };

  // 自動更新のシミュレーション
  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingCount((prev) => Math.max(prev - 1, 0));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const isNearby = waitingCount <= 3;

  return (
    <div className="min-h-full bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-gray-800">DEMO CAFE 渋谷店</h1>
            <p className="text-xs text-gray-500">順番待ち状況</p>
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RefreshCw
              className={`w-5 h-5 text-gray-500 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 整理券情報 */}
        <Card>
          <div className="mb-4">
            <p className="text-xs text-gray-500">あなたの番号</p>
            <p className="text-3xl font-bold text-[#06C755]">A-023</p>
          </div>

          {/* 待ち組数 */}
          <motion.div
            key={waitingCount}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-center py-6 bg-gray-50 rounded-xl mb-4"
          >
            <p className="text-sm text-gray-500 mb-1">あと</p>
            <AnimatePresence mode="wait">
              <motion.span
                key={waitingCount}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`text-6xl font-bold ${isNearby ? "text-[#FF6B35]" : "text-gray-800"}`}
              >
                {waitingCount}
              </motion.span>
            </AnimatePresence>
            <p className="text-sm text-gray-500 mt-1">組</p>
          </motion.div>

          {/* プログレスバー */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>現在呼び出し中: A-018</span>
              <span>あなた: A-023</span>
            </div>
            <Progress value={8 - waitingCount} max={8} size="md" />
          </div>

          {/* 詳細情報 */}
          <div className="flex justify-around text-center pt-4 border-t">
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1">
                <Clock className="w-3 h-3" />
                <span>目安時間</span>
              </div>
              <p className="font-bold text-gray-800">
                約{Math.max(waitingCount * 3, 5)}分
              </p>
            </div>
            <div className="w-px bg-gray-200" />
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1">
                <Bell className="w-3 h-3" />
                <span>通知設定</span>
              </div>
              <p className="font-bold text-[#06C755]">ON</p>
            </div>
          </div>
        </Card>

        {/* 順番接近アラート */}
        {isNearby && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-[#FFF7ED] border-[#FF6B35]/20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#FF6B35]">
                    まもなく順番です！
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    店舗にお戻りください。呼び出し時に不在の場合、順番が後回しになる可能性があります。
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* 会員登録バナー（魅力的品質） */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link href={`${basePath}/register`}>
            <Card className="bg-gradient-to-r from-[#06C755] to-[#05a648] text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">待ち時間に会員登録</p>
                  <p className="text-sm text-white/80">
                    今なら10%OFFクーポンプレゼント
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/60" />
              </div>
            </Card>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
