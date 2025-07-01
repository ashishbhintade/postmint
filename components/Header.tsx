"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ConnectWallet from "./ConnectWallet";
import { useWalletConnection } from "@/hooks/useWalletConnection";

export default function Header() {
  const pathname = usePathname();
  const { account } = useWalletConnection();

  const navItems = [{ href: "/create", label: "Make a Post" }];

  return (
    <div className="mx-auto top-0 z-50 h-16 flex items-center justify-between">
      {/* Left: Logo */}
      <Link href="/" className="text-xl font-bold text-black">
        PostMint
      </Link>

      <div className="space-x-12 font-semibold hidden md:flex text-sm">
        {navItems.map(({ href, label }) => {
          const isActive =
            pathname === href || (href === "/about" && pathname === "/");

          return account ? (
            <Link
              key={href}
              href={href}
              className={`text-black hover:text-gray-300 ${
                isActive ? "underline underline-offset-4" : ""
              }`}
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
  );
}
