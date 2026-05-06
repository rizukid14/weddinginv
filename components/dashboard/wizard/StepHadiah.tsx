"use client";

import React from "react";
import { WeddingData, BankAccount, EWallet } from "@/types/wedding";
import { Gift, Plus, Trash2, CreditCard, DollarSign } from "lucide-react";

interface StepProps {
  data: Partial<WeddingData>;
  update: (updates: Partial<WeddingData>) => void;
}

export default function StepHadiah({ data, update }: StepProps) {
  const handleChange = (field: keyof WeddingData, value: any) => {
    update({ [field]: value });
  };

  const handleBankChange = (index: number, bankField: keyof BankAccount, val: string) => {
    const list = [...(data.bankAccounts || [])];
    list[index] = { ...list[index], [bankField]: val };
    handleChange("bankAccounts", list);
  };

  const handleAddBank = () => {
    const list = [...(data.bankAccounts || [])];
    list.push({ bankName: "", accountNumber: "", accountName: "" });
    handleChange("bankAccounts", list);
  };

  const handleRemoveBank = (index: number) => {
    const list = (data.bankAccounts || []).filter((_, idx) => idx !== index);
    handleChange("bankAccounts", list);
  };

  const handleWalletChange = (index: number, walletField: keyof EWallet, val: string) => {
    const list = [...(data.ewallets || [])];
    list[index] = { ...list[index], [walletField]: val };
    handleChange("ewallets", list);
  };

  const handleAddWallet = () => {
    const list = [...(data.ewallets || [])];
    list.push({ provider: "GoPay", number: "" });
    handleChange("ewallets", list);
  };

  const handleRemoveWallet = (index: number) => {
    const list = (data.ewallets || []).filter((_, idx) => idx !== index);
    handleChange("ewallets", list);
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in font-sans">
      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold text-zinc-50">Hadiah &amp; Angpao Digital</h2>
        <p className="text-xs text-zinc-400 mt-1">
          Aktifkan fitur amplop digital untuk memudahkan tamu mengirimkan kado atau ucapan syukur.
        </p>
      </div>

      {/* Gift Section Master Switch */}
      <div className="flex items-center justify-between bg-zinc-900/10 border border-zinc-800/40 p-5 rounded-2xl select-none">
        <div className="flex items-center gap-2">
          <Gift size={16} className="text-amber-500" />
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            Tampilkan Bagian Hadiah (Gift Section)
          </span>
        </div>
        {/* Toggle Switch */}
        <button
          type="button"
          onClick={() => handleChange("giftEnabled", !data.giftEnabled)}
          className={`w-11 h-6 rounded-full relative p-1 transition-colors duration-200 focus:outline-none ${
            data.giftEnabled ? "bg-amber-500" : "bg-zinc-800"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-[#110F0F] transition-transform duration-200 ${
              data.giftEnabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {data.giftEnabled && (
        <div className="flex flex-col gap-8 animate-fade-in">
          {/* Bank Accounts Section */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold border-b border-zinc-800/80 pb-1.5 block">
              💳 Rekening Bank Transfer
            </span>

            {/* List */}
            <div className="flex flex-col gap-3.5">
              {(data.bankAccounts || []).map((account, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#221F1F]/20 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3 relative group"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveBank(idx)}
                    className="absolute top-3.5 right-3.5 text-zinc-500 hover:text-rose-400 p-1 rounded-md transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold">
                        Nama Bank
                      </label>
                      <input
                        type="text"
                        value={account.bankName}
                        onChange={(e) => handleBankChange(idx, "bankName", e.target.value)}
                        placeholder="cth: BCA, Mandiri, BRI"
                        className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold">
                        Nomor Rekening
                      </label>
                      <input
                        type="text"
                        value={account.accountNumber}
                        onChange={(e) => handleBankChange(idx, "accountNumber", e.target.value)}
                        placeholder="1234567890"
                        className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors font-mono"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold">
                        Pemilik Rekening (Atas Nama)
                      </label>
                      <input
                        type="text"
                        value={account.accountName}
                        onChange={(e) => handleBankChange(idx, "accountName", e.target.value)}
                        placeholder="Rizki Aditya Pratama"
                        className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Add trigger */}
              <button
                type="button"
                onClick={handleAddBank}
                className="w-full border border-dashed border-zinc-800 hover:border-amber-500 text-zinc-500 hover:text-amber-500 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all bg-zinc-900/10"
              >
                <Plus size={14} />
                <span>Tambah Rekening Bank</span>
              </button>
            </div>
          </div>

          {/* E-Wallets Section */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold border-b border-zinc-800/80 pb-1.5 block">
              📱 Dompet Digital (E-Wallet)
            </span>

            {/* List */}
            <div className="flex flex-col gap-3.5">
              {(data.ewallets || []).map((wallet, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#221F1F]/20 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3 relative"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveWallet(idx)}
                    className="absolute top-3.5 right-3.5 text-zinc-500 hover:text-rose-400 p-1 rounded-md transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold">
                        Penyedia E-Wallet
                      </label>
                      <select
                        value={wallet.provider}
                        onChange={(e) => handleWalletChange(idx, "provider", e.target.value)}
                        className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:border-amber-500 focus:outline-none transition-colors"
                      >
                        <option value="GoPay">GoPay</option>
                        <option value="OVO">OVO</option>
                        <option value="Dana">Dana</option>
                        <option value="ShopeePay">ShopeePay</option>
                        <option value="LinkAja">LinkAja</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold">
                        Nomor Handphone E-Wallet
                      </label>
                      <input
                        type="text"
                        value={wallet.number}
                        onChange={(e) => handleWalletChange(idx, "number", e.target.value)}
                        placeholder="081234567890"
                        className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Add trigger */}
              <button
                type="button"
                onClick={handleAddWallet}
                className="w-full border border-dashed border-zinc-800 hover:border-amber-500 text-zinc-500 hover:text-amber-500 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all bg-zinc-900/10"
              >
                <Plus size={14} />
                <span>Tambah Akun E-Wallet</span>
              </button>
            </div>
          </div>

          {/* Registry wishlist link */}
          <div className="flex flex-col gap-4 bg-zinc-900/10 border border-zinc-800/40 p-5 rounded-2xl">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-3 mb-1">
              <DollarSign size={16} className="text-amber-500" />
              <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
                Tautan Kado Fisik / Wishlist (Opsional)
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                URL Wishlist (cth: Tokopedia, Amazon, dll.)
              </label>
              <input
                type="text"
                value={data.giftRegistryUrl || ""}
                onChange={(e) => handleChange("giftRegistryUrl", e.target.value)}
                placeholder="https://www.tokopedia.com/wishlist/nama-mempelai"
                className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
