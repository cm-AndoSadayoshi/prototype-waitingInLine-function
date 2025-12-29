"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  Gift,
  Check,
  Sparkles,
  Ticket,
} from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [step, setStep] = useState<"form" | "complete">("form");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthday: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("complete");
  };

  const isFormValid = formData.name && formData.phone;

  return (
    <div className="min-h-full bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/demo/waiting"
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="font-bold text-gray-800">会員登録</h1>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === "form" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4"
          >
            {/* 特典バナー */}
            <Card className="bg-gradient-to-r from-[#FF6B35] to-[#FF8B5A] text-white mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">今だけ！登録特典</p>
                  <p className="text-sm text-white/90">
                    10%OFFクーポンをプレゼント
                  </p>
                </div>
              </div>
            </Card>

            {/* 登録フォーム */}
            <Card>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="お名前"
                  placeholder="山田 花子"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <Input
                  label="電話番号"
                  type="tel"
                  placeholder="090-1234-5678"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <Input
                  label="生年月日（任意）"
                  type="date"
                  value={formData.birthday}
                  onChange={(e) =>
                    setFormData({ ...formData, birthday: e.target.value })
                  }
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={!isFormValid}
                  >
                    登録してクーポンをもらう
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  登録することで
                  <span className="text-[#06C755]">利用規約</span>と
                  <span className="text-[#06C755]">プライバシーポリシー</span>
                  に同意したものとみなされます
                </p>
              </form>
            </Card>

            {/* 会員特典 */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-3">
                会員になると...
              </p>
              <div className="space-y-2">
                {[
                  "お得なクーポンが届く",
                  "ポイントが貯まる",
                  "誕生日特典がもらえる",
                  "新メニュー情報をいち早くお届け",
                ].map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <div className="w-5 h-5 bg-[#06C755]/10 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#06C755]" />
                    </div>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4"
          >
            {/* 完了メッセージ */}
            <Card className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 bg-[#06C755] rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-xl font-bold text-gray-800 mb-2">
                登録完了！
              </h2>
              <p className="text-gray-500 text-sm">
                会員登録ありがとうございます
              </p>
            </Card>

            {/* クーポン */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4"
            >
              <Card className="bg-gradient-to-r from-[#FF6B35] to-[#FF8B5A] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5" />
                    <Badge className="bg-white/20 text-white border-0">
                      新規登録特典
                    </Badge>
                  </div>

                  <p className="text-4xl font-bold mb-1">10%OFF</p>
                  <p className="text-sm text-white/80 mb-4">
                    次回ご来店時にご利用いただけます
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4" />
                      <span className="text-sm">DEMO-CAFE-2024</span>
                    </div>
                    <span className="text-xs text-white/60">
                      有効期限: 2024/12/31
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* 戻るボタン */}
            <div className="mt-6">
              <Link href="/demo/waiting">
                <Button className="w-full" size="lg">
                  待機状況に戻る
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
