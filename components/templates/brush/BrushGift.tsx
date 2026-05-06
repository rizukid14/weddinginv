"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Gift } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import { staggerContainer, fadeUp } from "@/lib/animations";
import BrushDivider from "./BrushDivider";

interface Props {
  data: WeddingData;
}

export default function BrushGift({ data }: Props) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-8 bg-[var(--brush-paper)] relative z-10 text-left"
    >
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center">
          <div className="flex justify-center select-none mb-1">
            <Gift size={18} className="text-[var(--brush-stroke)]" />
          </div>
          <h2 className="font-brush-display text-2xl text-[var(--brush-ink)] font-normal tracking-tight">
            Kirim Kado Digital
          </h2>
          <p className="font-brush-body italic text-xs text-[var(--brush-muted)] mt-1.5 leading-relaxed px-4 mx-auto select-none">
            Bagi keluarga dan kerabat yang ingin mengirimkan kado atau ucapan kasih secara digital
          </p>
          <div className="flex justify-center mt-4">
            <BrushDivider variant="stroke" className="mx-auto" />
          </div>
        </motion.div>

        {/* Gift Cards Grid */}
        <div className="mt-12 flex flex-col gap-8">
          {/* Bank Transfer Card */}
          {data.bankAccounts && data.bankAccounts.map((acc, index: number) => (
            <motion.div
              key={`bank-${index}`}
              variants={fadeUp}
              className="bg-white p-6 border-2 border-[var(--brush-ink)]/15 shadow-md relative flex flex-col justify-between"
              style={{ borderRadius: 0 }}
            >
              {/* Corner tape decorations */}
              <div className="absolute top-[-5px] right-8 w-12 h-3.5 bg-[var(--brush-warm)] border-l border-r border-dashed border-[var(--brush-ink)]/15 rotate-[15deg]" />

              <div>
                <span className="font-brush-body text-[10px] uppercase tracking-widest text-[var(--brush-stroke)] font-bold">
                  Transfer Perbankan
                </span>
                <h4 className="font-brush-display text-lg text-[var(--brush-ink)] font-normal tracking-tight mt-1">
                  {acc.bankName}
                </h4>

                {/* Account details */}
                <div className="mt-4 flex flex-col font-brush-body text-xs text-[var(--brush-ink-soft)] font-medium gap-1">
                  <p>Nomor Rekening:</p>
                  <p className="font-brush-heading text-base font-bold text-[var(--brush-ink)] tracking-wider mt-0.5 select-all">
                    {acc.accountNumber}
                  </p>
                  <p className="text-[var(--brush-muted)] italic mt-1 font-normal">
                    a.n. {acc.accountName}
                  </p>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => handleCopy(acc.accountNumber, `acc-${index}`)}
                className="w-full mt-6 bg-[var(--brush-ink)] hover:bg-[var(--brush-ink-soft)] text-[var(--brush-paper)] py-3 font-brush-body text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 select-none"
                style={{ borderRadius: 0 }}
              >
                {copiedAccount === `acc-${index}` ? (
                  <>
                    <Check size={12} />
                    <span>Salin Sukses!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Salin No. Rekening</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}

          {/* E-Wallet Card */}
          {data.ewallets && data.ewallets.map((wallet, index: number) => (
            <motion.div
              key={`wallet-${index}`}
              variants={fadeUp}
              className="bg-white p-6 border-2 border-[var(--brush-ink)]/15 shadow-md relative flex flex-col justify-between"
              style={{ borderRadius: 0 }}
            >
              {/* Corner tape decorations */}
              <div className="absolute top-[-5px] right-8 w-12 h-3.5 bg-[var(--brush-warm)] border-l border-r border-dashed border-[var(--brush-ink)]/15 rotate-[15deg]" />

              <div>
                <span className="font-brush-body text-[10px] uppercase tracking-widest text-[var(--brush-stroke)] font-bold">
                  Dompet Elektronik / E-Wallet
                </span>
                <h4 className="font-brush-display text-lg text-[var(--brush-ink)] font-normal tracking-tight mt-1">
                  {wallet.provider}
                </h4>

                {/* Account details */}
                <div className="mt-4 flex flex-col font-brush-body text-xs text-[var(--brush-ink-soft)] font-medium gap-1">
                  <p>Nomor Telepon / Akun:</p>
                  <p className="font-brush-heading text-base font-bold text-[var(--brush-ink)] tracking-wider mt-0.5 select-all">
                    {wallet.number}
                  </p>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => handleCopy(wallet.number, `wallet-${index}`)}
                className="w-full mt-6 bg-[var(--brush-ink)] hover:bg-[var(--brush-ink-soft)] text-[var(--brush-paper)] py-3 font-brush-body text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 select-none"
                style={{ borderRadius: 0 }}
              >
                {copiedAccount === `wallet-${index}` ? (
                  <>
                    <Check size={12} />
                    <span>Salin Sukses!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Salin Nomor</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}

          {/* Physical Address Card (Optional Gifting) */}
          {data.giftAddress && (
            <motion.div
              variants={fadeUp}
              className="bg-white p-6 border-2 border-[var(--brush-ink)]/15 shadow-md relative"
              style={{ borderRadius: 0 }}
            >
              {/* Corner tape decorations */}
              <div className="absolute top-[-5px] left-8 w-12 h-3.5 bg-[var(--brush-sage)]/30 border-l border-r border-dashed border-[var(--brush-ink)]/15 rotate-[-12deg]" />

              <span className="font-brush-body text-[10px] uppercase tracking-widest text-[var(--brush-stroke)] font-bold">
                Kirim Kado Fisik
              </span>
              <h4 className="font-brush-display text-lg text-[var(--brush-ink)] font-normal tracking-tight mt-1">
                Alamat Pengiriman
              </h4>

              <div className="mt-4 font-brush-body text-xs text-[var(--brush-ink-soft)] font-medium">
                <p className="font-bold text-[var(--brush-ink)]">{data.giftReceiverName || `${data.brideNickname} / ${data.groomNickname}`}</p>
                <p className="text-[var(--brush-muted)] mt-1.5 leading-relaxed font-normal">{data.giftAddress}</p>
              </div>

              {/* Action */}
              <button
                onClick={() => handleCopy(data.giftAddress || "", "addr")}
                className="w-full mt-6 border-2 border-[var(--brush-ink)] text-[var(--brush-ink)] bg-transparent hover:bg-[var(--brush-paper)]/40 py-2.5 font-brush-body text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 select-none"
                style={{ borderRadius: 0 }}
              >
                {copiedAccount === "addr" ? (
                  <>
                    <Check size={12} className="text-[var(--brush-stroke)]" />
                    <span>Salin Sukses!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Salin Alamat</span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
