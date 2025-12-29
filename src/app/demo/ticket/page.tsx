"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket, Users, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function TicketPage() {
  return (
    <div className="min-h-full bg-gradient-to-b from-[#06C755] to-[#05a648] p-4">
      {/* ヘッダー */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-white mb-6"
      >
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Ticket className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold">DEMO CAFE</h1>
        <p className="text-white/80 text-sm">渋谷店</p>
      </motion.div>

      {/* 整理券カード */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="text-center py-8">
          <Badge variant="success" className="mb-4">
            整理券を発行しました
          </Badge>

          <p className="text-gray-500 text-sm mb-2">あなたの番号</p>
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-6xl font-bold text-[#06C755] mb-4"
          >
            A-023
          </motion.div>

          <div className="flex justify-center gap-6 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1">
                <Users className="w-3 h-3" />
                <span>待ち組数</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">8組</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1">
                <Clock className="w-3 h-3" />
                <span>目安時間</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">約20分</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* LINE通知設定 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4"
      >
        <Card className="bg-white/95">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#06C755] rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800 text-sm">
                LINEで通知を受け取る
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                順番が近づいたらお知らせします
              </p>
            </div>
            <Badge variant="success" size="sm">
              ON
            </Badge>
          </div>
        </Card>
      </motion.div>

      {/* アクションボタン */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 space-y-3"
      >
        <Link href="/demo/waiting" className="block">
          <Button className="w-full" size="lg">
            待機状況を確認
          </Button>
        </Link>
        <p className="text-center text-white/70 text-xs">
          このページを閉じても、LINEから確認できます
        </p>
      </motion.div>
    </div>
  );
}
