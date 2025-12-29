"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Gift,
  Star,
  MessageCircle,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function CompletePage() {
  return (
    <div className="min-h-full bg-gray-50">
      {/* 完了ヘッダー */}
      <div className="bg-gradient-to-b from-[#06C755] to-[#05a648] pt-8 pb-16 px-4 text-center text-white">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <Check className="w-10 h-10 text-[#06C755]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl font-bold mb-2">ご来店ありがとうございます</h1>
          <p className="text-white/80 text-sm">
            ごゆっくりお過ごしください
          </p>
        </motion.div>
      </div>

      <div className="px-4 -mt-8 space-y-4 pb-8">
        {/* 来店ポイント */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">来店ポイント獲得！</p>
                <p className="text-sm text-gray-500">
                  順番待ちご利用ありがとうございます
                </p>
              </div>
              <Badge variant="success">+50pt</Badge>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">累計ポイント</span>
                <span className="text-xl font-bold text-[#06C755]">
                  150 pt
                </span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "30%" }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="h-full bg-[#06C755] rounded-full"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                あと350pt で500円クーポンと交換できます
              </p>
            </div>
          </Card>
        </motion.div>

        {/* クーポン */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-[#FF6B35] to-[#FF8B5A] text-white overflow-hidden relative">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">保有クーポン</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">10%OFF</p>
                  <p className="text-sm text-white/80">次回ご利用可能</p>
                </div>
                <Gift className="w-12 h-12 text-white/30" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* お知らせ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#06C755] rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">LINE通知設定</p>
                <p className="text-xs text-gray-500">
                  お得な情報をお届けします
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </motion.div>

        {/* アンケート */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="border-2 border-dashed border-gray-200">
            <div className="text-center py-2">
              <p className="text-sm text-gray-600 mb-2">
                本日のご利用はいかがでしたか？
              </p>
              <div className="flex justify-center gap-2">
                {["😊", "🙂", "😐", "😕", "😢"].map((emoji, i) => (
                  <button
                    key={i}
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl hover:bg-gray-200 transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
