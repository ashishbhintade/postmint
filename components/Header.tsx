"use client";

import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
import { useWalletConnection } from "@/hooks/useWalletConnection";

export default function Header() {
  const { account } = useWalletConnection();

  const navItems = [{ href: "/create", label: "Make a Post" }];

  return (
    // <div className="mx-auto top-0 z-50 h-16 flex items-center justify-between">
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
      <div className="mx-auto max-w-1/2 h-16 flex items-center justify-between px-4 md:px-8">
        {/* Left: Logo */}
        <Link href="/" className="text-xl font-bold text-black">
          PostMint
        </Link>

        <div className="space-x-12 font-semibold hidden md:flex text-sm">
          {navItems.map(({ href, label }) => {
            return account ? (
              <Link
                key={href}
                href={href}
                className="text-black hover:text-gray-700"
              >
                {label}
              </Link>
            ) : (
              <span
                key={href}
                className="text-black cursor-not-allowed"
                title="Connect wallet to access"
              >
                {label}
              </span>
            );
          })}
        </div>

        {/* Right: Connect Wallet */}
        <div className="flex">
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
}
