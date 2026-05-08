"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Download, ExternalLink, MessageSquare } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import QRCodeDisplay from "./QRCodeDisplay";
import QRCode from "qrcode";

interface GiftSectionProps {
  data: Pick<WeddingData, "bankAccounts" | "ewallets" | "giftRegistryUrl" | "giftEnabled">;
  groomNickname: string;
  brideNickname: string;

  // Styling overrides per template
  sectionClassName?: string;
  cardClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
  buttonClassName?: string;
  copyButtonClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function GiftSection({
  data,
  groomNickname,
  brideNickname,
  sectionClassName = "py-20 px-6 text-center",
  cardClassName = "bg-white p-5 rounded-xl border border-gray-100 shadow-sm",
  labelClassName = "text-xs font-semibold tracking-wider text-gray-400",
  valueClassName = "text-sm text-gray-800 font-semibold font-mono",
  buttonClassName = "bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors",
  copyButtonClassName = "border border-gray-200 text-gray-500 hover:bg-gray-50",
  tabClassName = "text-sm font-semibold tracking-wide text-gray-400 border-b border-gray-100 pb-2 flex-1 text-center cursor-pointer",
  activeTabClassName = "text-blue-600 border-blue-600",
  titleClassName = "text-2xl font-bold text-gray-800",
  subtitleClassName = "text-xs text-gray-500 max-w-xs mx-auto mt-2",
}: GiftSectionProps) {
  const [activeTab, setActiveTab] = useState<"bank" | "ewallet">("bank");
  const [selectedWalletIdx, setSelectedWalletIdx] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  if (!data.giftEnabled) return null;

  const hasBanks = data.bankAccounts && data.bankAccounts.length > 0;
  const hasWallets = data.ewallets && data.ewallets.length > 0;

  // Resolve active tab if only one group exists
  const resolvedTab = hasBanks && hasWallets ? activeTab : hasBanks ? "bank" : "ewallet";

  const handleCopy = (text: string, id: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopiedId(id);
      setToastMessage("Nomor berhasil disalin! ✨");
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

  const downloadQR = async (wallet: typeof data.ewallets[0]) => {
    try {
      const filename = `QR_${wallet.provider}_${wallet.number}.png`;
      if (wallet.qrCodeUrl) {
        const response = await fetch(wallet.qrCodeUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      } else {
        const qrDataUrl = await QRCode.toDataURL(wallet.number, {
          errorCorrectionLevel: "M",
          margin: 2,
          width: 512,
        });
        const a = document.createElement("a");
        a.href = qrDataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error("Gagal mendownload QR Code: ", err);
    }
  };

  const getBankBadgeColor = (bankName: string) => {
    const name = bankName.toUpperCase();
    if (name.includes("BCA")) return "bg-blue-600";
    if (name.includes("BRI")) return "bg-blue-800";
    if (name.includes("MANDIRI")) return "bg-amber-500";
    if (name.includes("BNI")) return "bg-orange-600";
    if (name.includes("BSI")) return "bg-emerald-700";
    return "bg-slate-500";
  };

  const getWalletColor = (provider: string) => {
    const p = provider.toUpperCase();
    if (p.includes("GOPAY")) return "#00AED6";
    if (p.includes("OVO")) return "#4C3494";
    if (p.includes("DANA")) return "#118EEA";
    if (p.includes("SHOPEEPAY") || p.includes("SHOPEE")) return "#EE4D2D";
    if (p.includes("LINKAJA")) return "#E82529";
    return "#5C6B2E";
  };

  const activeWallet = hasWallets ? data.ewallets[selectedWalletIdx] : null;

  return (
    <div className={sectionClassName}>
      <div className="max-w-md mx-auto">
        {/* Dual Mode Tabs Selection */}
        {hasBanks && hasWallets && (
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("bank")}
              className={`${tabClassName} ${activeTab === "bank" ? activeTabClassName : ""}`}
            >
              Transfer Bank
            </button>
            <button
              onClick={() => setActiveTab("ewallet")}
              className={`${tabClassName} ${activeTab === "ewallet" ? activeTabClassName : ""}`}
            >
              E-Wallet
            </button>
          </div>
        )}

        {/* BANK TAB CONTENT */}
        {resolvedTab === "bank" && hasBanks && (
          <div className="flex flex-col gap-4">
            {data.bankAccounts.map((account, idx) => {
              const uniqueId = `bank-${idx}`;
              return (
                <div key={uniqueId} className={`${cardClassName} flex items-center gap-4 text-left`}>
                  {account.logoUrl ? (
                    <img
                      src={account.logoUrl}
                      alt={account.bankName}
                      className="w-12 h-12 object-contain rounded-lg flex-shrink-0 bg-white"
                    />
                  ) : (
                    <div className={`w-12 h-12 rounded-lg ${getBankBadgeColor(account.bankName)} flex-shrink-0 flex items-center justify-center text-white text-xs font-black tracking-wider shadow-sm select-none`}>
                      {account.bankName}
                    </div>
                  )}

                  <div className="flex-grow min-w-0">
                    <span className={labelClassName}>
                      REKENING {account.bankName}
                    </span>
                    <span className={`${valueClassName} block mt-0.5 tracking-wider select-all`}>
                      {account.accountNumber}
                    </span>
                    <span className="block font-sans text-xs text-gray-500 mt-0.5 truncate font-medium">
                      a.n. {account.accountName}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(account.accountNumber, uniqueId)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all active:scale-95 cursor-pointer ${copyButtonClassName}`}
                  >
                    {copiedId === uniqueId ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* E-WALLET TAB CONTENT */}
        {resolvedTab === "ewallet" && hasWallets && activeWallet && (
          <div className="flex flex-col items-center">
            {/* Horizontal pill selectors if multiple wallets */}
            {data.ewallets.length > 1 && (
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {data.ewallets.map((wallet, idx) => {
                  const isActive = idx === selectedWalletIdx;
                  return (
                    <button
                      key={`wallet-pill-${idx}`}
                      onClick={() => setSelectedWalletIdx(idx)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border cursor-pointer transition-colors ${
                        isActive
                          ? "bg-gray-800 text-white border-gray-800"
                          : "bg-transparent text-gray-500 border-gray-200 hover:bg-gray-50"
                      }`}
                      style={isActive ? { backgroundColor: getWalletColor(wallet.provider), borderColor: getWalletColor(wallet.provider) } : {}}
                    >
                      {wallet.provider}
                    </button>
                  );
                })}
              </div>
            )}

            {/* QR display section */}
            <div className="flex flex-col items-center">
              <div className="relative p-1 bg-white rounded-xl shadow-lg border-4 border-white inline-block">
                {activeWallet.qrCodeUrl ? (
                  <img
                    src={activeWallet.qrCodeUrl}
                    alt={`${activeWallet.provider} QR Code`}
                    className="w-48 h-48 object-contain rounded-lg mx-auto"
                  />
                ) : (
                  <QRCodeDisplay value={activeWallet.number} size={192} />
                )}
              </div>

              <span className="font-sans text-[10px] text-gray-400 mt-2 tracking-widest uppercase block">
                Pindai Kode QR Untuk Transfer
              </span>

              {/* Action Buttons under QR */}
              <div className="flex flex-col gap-3 w-full mt-6 items-center">
                <button
                  onClick={() => downloadQR(activeWallet)}
                  className={`${buttonClassName} flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all`}
                >
                  <Download size={13} />
                  Simpan QR Code
                </button>

                <div className={`${cardClassName} flex items-center justify-between gap-4 text-left w-full max-w-sm mt-2`}>
                  <div className="flex-grow min-w-0">
                    <span
                      className="inline-block px-2.5 py-0.5 rounded text-[9px] font-extrabold text-white tracking-widest uppercase mb-1"
                      style={{ backgroundColor: getWalletColor(activeWallet.provider) }}
                    >
                      {activeWallet.provider}
                    </span>
                    <span className={`${valueClassName} block tracking-wider select-all`}>
                      {activeWallet.number}
                    </span>
                    {activeWallet.accountName && (
                      <span className="block font-sans text-xs text-gray-500 mt-0.5 truncate font-medium">
                        a.n. {activeWallet.accountName}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleCopy(activeWallet.number, `wallet-${selectedWalletIdx}`)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all active:scale-95 cursor-pointer ${copyButtonClassName}`}
                  >
                    {copiedId === `wallet-${selectedWalletIdx}` ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Confirmation Segment */}
        <div className="mt-10 pt-6 border-t border-dashed border-gray-200 flex flex-col items-center gap-2">
          <span className="text-[11px] text-gray-500 font-medium tracking-wide">
            Sudah mengirimkan tanda kasih? Beritahu kami ❤️
          </span>
          <a
            href={`https://wa.me/6281234567890?text=Halo%20kak%2C%20saya%20telah%20mengirimkan%20tanda%20kasih%20untuk%20pernikahan%20${brideNickname}%20%26%20${groomNickname}.%20Terima%20kasih!`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold underline underline-offset-4 text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
          >
            <MessageSquare size={13} />
            Konfirmasi via WhatsApp
          </a>
        </div>

        {/* Optional Gift Registry / Wish List */}
        {data.giftRegistryUrl && (
          <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
            <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">
              Wish List Kami
            </span>
            <a
              href={data.giftRegistryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors py-3 rounded-lg text-xs font-bold tracking-wider uppercase cursor-pointer"
            >
              <ExternalLink size={13} />
              Lihat Wish List Kami
            </a>
          </div>
        )}
      </div>

      {/* Embedded dynamic Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 30, x: "-50%" }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-gray-900/95 backdrop-blur-md text-white py-2.5 px-6 rounded-full text-xs font-medium tracking-wide shadow-xl flex items-center gap-2 justify-center border border-white/10"
          >
            <Check size={14} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
