"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Gift, MessageSquare } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import FloralDivider from "../ui/FloralDivider";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface Props {
  data: WeddingData;
}

export default function GiftSection({ data }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  if (!data.giftEnabled) return null;

  // Clipboard copies function supporting iOS Safari compatibility
  const handleCopy = (text: string, id: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers and iOS Safari
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; // prevent scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopiedId(id);
      setToastMessage("Nomor rekening berhasil disalin! ✨");
      setShowToast(true);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error("Gagal menyalin teks: ", err);
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-6 bg-floral-cream relative z-10 text-center overflow-hidden"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="text-center">
        <FloralDivider variant="ornate" />
        <h2 className="font-serif text-3xl text-floral-text font-medium mt-2">
          Hadiah Digital
        </h2>
        <p className="font-sans text-xs text-floral-muted max-w-xs mx-auto mt-2.5 leading-relaxed">
          Bagi bapak/ibu/saudara/i yang ingin memberikan tanda kasih untuk kedua mempelai, kami menyediakan dompet digital dan transfer perbankan berikut:
        </p>
      </motion.div>

      {/* BANK TRANSFERS */}
      {data.bankAccounts && data.bankAccounts.length > 0 && (
        <div className="max-w-sm mx-auto mt-10">
          <motion.h4
            variants={fadeUp}
            className="font-sans text-[10px] uppercase tracking-widest text-floral-gold font-bold mb-4 text-center"
          >
            Transfer Perbankan
          </motion.h4>

          <div className="flex flex-col gap-4">
            {data.bankAccounts.map((account, idx) => {
              const uniqueId = `bank-${idx}`;
              return (
                <motion.div
                  key={uniqueId}
                  variants={fadeUp}
                  className="bg-white border border-floral-blush rounded-xl p-5 text-left flex items-center gap-4 shadow-sm"
                >
                  {/* Bank badge */}
                  <div className="w-12 h-12 rounded-lg bg-floral-cream flex-shrink-0 flex items-center justify-center text-floral-gold-deep font-bold text-xs select-none shadow-sm">
                    {account.bankName}
                  </div>

                  {/* Details */}
                  <div className="flex-grow min-w-0">
                    <span className="block font-sans text-[10px] uppercase tracking-widest text-floral-muted">
                      No. Rekening Bank {account.bankName}
                    </span>
                    <span className="block font-mono text-sm text-floral-text font-semibold tracking-wider mt-0.5 select-all">
                      {account.accountNumber}
                    </span>
                    <span className="block font-sans text-xs text-floral-muted mt-0.5 truncate">
                      a.n. {account.accountName}
                    </span>
                  </div>

                  {/* Copy button */}
                  <button
                    onClick={() => handleCopy(account.accountNumber, uniqueId)}
                    className={`w-9 h-9 border rounded-lg flex-shrink-0 flex items-center justify-center transition-colors ${
                      copiedId === uniqueId
                        ? "border-floral-sage text-floral-sage-dark bg-[#E2F0D9]"
                        : "border-floral-blush text-floral-muted hover:border-floral-gold hover:text-floral-gold-deep bg-white"
                    }`}
                  >
                    {copiedId === uniqueId ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* E-WALLETS SECTION */}
      {data.ewallets && data.ewallets.length > 0 && (
        <div className="max-w-sm mx-auto mt-10">
          <motion.h4
            variants={fadeUp}
            className="font-sans text-[10px] uppercase tracking-widest text-floral-gold font-bold mb-4 text-center"
          >
            Dompet Elektronik (E-Wallet)
          </motion.h4>

          <div className="flex gap-3 overflow-x-auto pb-2 px-1 no-scrollbar justify-center">
            {data.ewallets.map((wallet, idx) => {
              const uniqueId = `wallet-${idx}`;
              return (
                <motion.div
                  key={uniqueId}
                  variants={fadeUp}
                  className="bg-white border border-floral-blush rounded-xl p-4 text-center flex flex-col items-center gap-1 min-w-[130px] shadow-sm flex-shrink-0"
                >
                  <span className="font-sans text-[10px] font-bold text-floral-gold-deep select-none">
                    {wallet.provider}
                  </span>
                  <span className="font-mono text-xs text-floral-text font-semibold tracking-wide select-all">
                    {wallet.number}
                  </span>
                  <button
                    onClick={() => handleCopy(wallet.number, uniqueId)}
                    className={`w-20 py-1 border rounded-md text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-1 transition-colors mt-2 ${
                      copiedId === uniqueId
                        ? "border-floral-sage text-floral-sage-dark bg-[#E2F0D9]"
                        : "border-floral-blush text-floral-muted hover:border-floral-gold bg-white"
                    }`}
                  >
                    {copiedId === uniqueId ? (
                      <>
                        <Check size={10} />
                        Disalin
                      </>
                    ) : (
                      <>
                        <Copy size={10} />
                        Salin
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* GIFT REGISTRY */}
      {data.giftRegistryUrl && (
        <motion.div variants={fadeUp} className="max-w-sm mx-auto mt-8 px-2">
          <a
            href={data.giftRegistryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-transparent border border-floral-gold text-floral-gold-deep hover:bg-floral-gold hover:text-white py-3 rounded text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
          >
            <Gift size={13} />
            Kunjungi Gift Registry / Wishlist
          </a>
        </motion.div>
      )}

      {/* WHATSAPP CONFIRMATION */}
      <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-1 select-none">
        <p className="font-sans text-xs text-floral-muted">
          Apakah Anda sudah mengirimkan hadiah? Beritahu kami:
        </p>
        {/* We use a sample WhatsApp business format number */}
        <a
          href={`https://wa.me/6281234567890?text=Halo%20kak%2C%20saya%20telah%20mengirimkan%20tanda%20kasih%20untuk%20pernikahan%20${data.brideNickname}%20%26%20${data.groomNickname}.%20Terima%20kasih!`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-sans font-semibold text-floral-gold-deep hover:text-floral-gold underline underline-offset-4 flex items-center gap-1 transition-colors"
        >
          <MessageSquare size={13} />
          Konfirmasi Pengiriman Hadiah via WhatsApp
        </a>
      </motion.div>

      {/* Footer */}
      <motion.div variants={fadeUp} className="mt-12 text-center">
        <FloralDivider variant="simple" />
      </motion.div>

      {/* Custom Global Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 30, x: "-50%" }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#2C2424] text-white py-2.5 px-6 rounded-full text-xs font-sans tracking-wide shadow-2xl border border-white/10 flex items-center gap-2 min-w-[260px] justify-center"
          >
            <Check size={14} className="text-floral-sage" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
