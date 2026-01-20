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
  X,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// プロフィールデータ
const profiles = [
  { id: 1, name: "田中 美咲", phone: "080-1111-2222", birthday: "1988-07-10" },
  { id: 2, name: "鈴木 健太", phone: "090-3333-4444", birthday: "1992-12-25" },
];

interface RegisterContentProps {
  basePath: string; // "/demo" or "/mini"
}

export function RegisterContent({ basePath }: RegisterContentProps) {
  const [step, setStep] = useState<"form" | "complete">("form");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthday: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("complete");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProfile(null);
  };

  const handleSelectProfile = (profileId: number) => {
    setSelectedProfile(profileId);
  };

  const handleAutoFill = () => {
    if (selectedProfile) {
      const profile = profiles.find((p) => p.id === selectedProfile);
      if (profile) {
        setFormData({
          name: profile.name,
          phone: profile.phone,
          birthday: profile.birthday,
        });
      }
    }
    closeModal();
  };

  const isFormValid = formData.name && formData.phone;

  return (
    <div className="min-h-full bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href={`${basePath}/waiting`}
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
                {/* Account Center 自動入力ボタン */}
                <div className="mb-2">
                  <button
                    type="button"
                    onClick={openModal}
                    className="w-full flex items-center justify-between bg-gray-900 text-white rounded-full px-5 py-3 hover:bg-gray-800 transition-colors"
                  >
                    <span className="font-medium tracking-wide">account center</span>
                    <span className="bg-white text-gray-900 text-sm font-medium px-3 py-1 rounded-full">
                      自動入力
                    </span>
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    LINEやYahoo! JAPANの登録情報を自動で入力できます。
                  </p>
                </div>

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
              <Link href={`${basePath}/waiting`}>
                <Button className="w-full" size="lg">
                  待機状況に戻る
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ハーフモーダル（ボトムシート） */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* オーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/50 z-40"
            />

            {/* モーダル本体 */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[80%] overflow-hidden"
            >
              {/* モーダルヘッダー */}
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h3 className="font-bold text-gray-900">account center</h3>
                <button
                  onClick={closeModal}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* モーダルコンテンツ */}
              <div className="p-5">
                <h4 className="text-lg font-bold text-gray-900 mb-1">
                  クイック入力機能を使って
                </h4>
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  自動で入力しますか？
                </h4>
                <p className="text-sm text-gray-500 mb-6">
                  アカウントセンターで管理するLINEやYahoo!JAPAN
                  のプロフィール情報を利用した機能です。
                </p>

                {/* プロフィール選択 */}
                <div className="border rounded-xl overflow-hidden mb-4">
                  {profiles.map((profile, index) => (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => handleSelectProfile(profile.id)}
                      className={`w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors ${
                        index !== profiles.length - 1 ? "border-b" : ""
                      } ${selectedProfile === profile.id ? "bg-gray-50" : ""}`}
                    >
                      <span className="font-medium text-gray-800">
                        {profile.name}
                      </span>
                      <ChevronRight
                        className={`w-5 h-5 ${
                          selectedProfile === profile.id
                            ? "text-gray-900"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <p className="text-xs text-gray-400 mb-6">
                  ※プロフィールの各項目を選択するか、LINEの設定＞アカウントセンター
                  ＞共通プロフィールから変更できます。
                </p>

                {/* 自動入力ボタン */}
                <button
                  type="button"
                  onClick={handleAutoFill}
                  disabled={!selectedProfile}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-colors ${
                    selectedProfile
                      ? "bg-gray-900 hover:bg-gray-800"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  自動で入力する
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
