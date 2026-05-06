"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Gift } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface Props {
  data: WeddingData;
}

export default function ModernGift({ data }: Props) {
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
      className="py-20 px-8 bg-[var(--modern-black)] relative z-10 text-left overflow-hidden"
    >
      {/* Grid lines layout */}
      <div className="absolute inset-x-8 top-0 bottom-0 pointer-events-none z-0 border-l border-r border-[var(--modern-mid)]/[0.05]" />

      <div className="max-w-sm mx-auto z-10 relative">
        {/* Header */}
        <motion.div variants={fadeUp} className="border-b border-[var(--modern-mid)]/[0.08] pb-4 select-none">
          <div className="flex justify-between items-baseline mb-2">
            <h2 className="font-modern-display text-2xl text-[var(--modern-white)] font-black uppercase tracking-tight">
              KADO DIGITAL / GIFT
            </h2>
            <Gift size={16} className="text-[var(--modern-accent)]" />
          </div>
          <p className="font-modern-body text-[8px] uppercase tracking-[0.25em] text-[var(--modern-mid)]/50">
            {"// OPTIONAL TRANSMISSION OF WELL-WISHES"}
          </p>
        </motion.div>

        {/* Gift Cards Grid */}
        <div className="mt-12 flex flex-col gap-8">
          {/* Bank Transfer Card */}
          {data.bankAccounts && data.bankAccounts.map((acc, index: number) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="bg-[var(--modern-dark)] p-6 border border-[var(--modern-mid)]/20 shadow-none flex flex-col justify-between relative"
              style={{ borderRadius: 0 }}
            >
              {/* Corner accent dot */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[var(--modern-accent)]" />

              <div>
                <span className="font-modern-body text-[8px] uppercase tracking-[0.2em] text-[var(--modern-accent)]">
                  BANK ROUTING DETAILS //
                </span>
                <h4 className="font-modern-display text-lg text-[var(--modern-white)] font-black uppercase tracking-tight mt-1">
                  {acc.bankName}
                </h4>

                {/* Account details */}
                <div className="mt-5 flex flex-col font-modern-body text-[10px] text-[var(--modern-mid)]/80 gap-1 tracking-wide font-semibold">
                  <p>ACCOUNT NO :</p>
                  <p className="font-modern-display text-base font-black text-[var(--modern-white)] tracking-widest mt-1 select-all">
                    {acc.accountNumber}
                  </p>
                  <p className="text-[var(--modern-accent)] uppercase mt-1 text-[8px]">
                    {"// A.N "}{acc.accountName}
                  </p>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => handleCopy(acc.accountNumber, `acc-${index}`)}
                className="w-full mt-6 bg-[var(--modern-accent)] hover:opacity-90 text-black py-3 font-modern-body text-[10px] font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 select-none"
                style={{ borderRadius: 0 }}
              >
                {copiedAccount === `acc-${index}` ? (
                  <>
                    <Check size={11} />
                    <span>COPY COMPLETED</span>
                  </>
                ) : (
                  <>
                    <Copy size={11} />
                    <span>COPY ACCOUNT NUMBER</span>
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
              className="bg-[var(--modern-dark)] p-6 border border-[var(--modern-mid)]/20 shadow-none flex flex-col justify-between relative"
              style={{ borderRadius: 0 }}
            >
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[var(--modern-accent)]" />

              <div>
                <span className="font-modern-body text-[8px] uppercase tracking-[0.2em] text-[var(--modern-accent)]">
                  E-WALLET DETAILS //
                </span>
                <h4 className="font-modern-display text-lg text-[var(--modern-white)] font-black uppercase tracking-tight mt-1">
                  {wallet.provider}
                </h4>

                <div className="mt-5 flex flex-col font-modern-body text-[10px] text-[var(--modern-mid)]/80 gap-1 tracking-wide font-semibold">
                  <p>PHONE NUMBER :</p>
                  <p className="font-modern-display text-base font-black text-[var(--modern-white)] tracking-widest mt-1 select-all">
                    {wallet.number}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleCopy(wallet.number, `wallet-${index}`)}
                className="w-full mt-6 bg-[var(--modern-accent)] hover:opacity-90 text-black py-3 font-modern-body text-[10px] font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 select-none"
                style={{ borderRadius: 0 }}
              >
                {copiedAccount === `wallet-${index}` ? (
                  <>
                    <Check size={11} />
                    <span>COPY COMPLETED</span>
                  </>
                ) : (
                  <>
                    <Copy size={11} />
                    <span>COPY NUMBER</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}

          {/* Physical Address Card */}
          {data.giftAddress && (
            <motion.div
              variants={fadeUp}
              className="bg-[var(--modern-dark)] p-6 border border-[var(--modern-mid)]/20 shadow-none relative"
              style={{ borderRadius: 0 }}
            >
              {/* Corner accent dot */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[var(--modern-accent)]" />

              <span className="font-modern-body text-[8px] uppercase tracking-[0.2em] text-[var(--modern-accent)]">
                SHIPPING DESTINATION //
              </span>
              <h4 className="font-modern-display text-lg text-[var(--modern-white)] font-black uppercase tracking-tight mt-1">
                PHYSICAL PARCEL
              </h4>

              <div className="mt-5 font-modern-body text-[10px] text-[var(--modern-mid)]/80 tracking-wide font-semibold">
                <p className="font-bold text-[var(--modern-white)] uppercase mb-1">RECIPIENT: {data.giftReceiverName || `${data.brideNickname} / ${data.groomNickname}`}</p>
                <p className="text-[var(--modern-mid)]/60 leading-relaxed font-medium mt-1.5 lowercase">{data.giftAddress}</p>
              </div>

              {/* Action */}
              <button
                onClick={() => handleCopy(data.giftAddress || "", "addr")}
                className="w-full mt-6 border border-[var(--modern-mid)]/35 text-[var(--modern-white)] bg-transparent hover:bg-white/5 py-2.5 font-modern-body text-[9px] font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 select-none"
                style={{ borderRadius: 0 }}
              >
                {copiedAccount === "addr" ? (
                  <>
                    <Check size={11} className="text-[var(--modern-accent)]" />
                    <span>COPY COMPLETED</span>
                  </>
                ) : (
                  <>
                    <Copy size={11} />
                    <span>COPY SHIPPING ADDRESS</span>
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

