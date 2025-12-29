"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bell, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function CalledPage() {
  return (
    <div className="min-h-full bg-gradient-to-b from-[#FF6B35] to-[#FF8B5A]">
      {/* パルスアニメーション背景 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/10"
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
      </div>

      <div className="relative p-4 pt-8">
        {/* メインアラート */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center text-white mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <Bell className="w-10 h-10 text-[#FF6B35]" />
          </motion.div>

          <h1 className="text-2xl font-bold mb-2">お呼び出しです！</h1>
          <p className="text-white/80">お席の準備ができました</p>
        </motion.div>

        {/* 整理券番号 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="text-center py-6 mb-4">
            <p className="text-sm text-gray-500 mb-1">整理券番号</p>
            <p className="text-5xl font-bold text-[#FF6B35]">A-023</p>
          </Card>
        </motion.div>

        {/* 店舗情報 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <p className="font-medium text-gray-800 mb-3">店舗情報</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-800">DEMO CAFE 渋谷店</p>
                  <p className="text-xs text-gray-500">
                    東京都渋谷区道玄坂1-2-3
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <p className="text-sm text-gray-800">03-1234-5678</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* アクションボタン */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Link href="/demo/complete">
            <Button
              className="w-full bg-white text-[#FF6B35] hover:bg-gray-100"
              size="lg"
            >
              入店しました
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
