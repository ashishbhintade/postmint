"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "react-simple-wysiwyg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import {
  createCoin,
  DeployCurrency,
  ValidMetadataURI,
} from "@zoralabs/coins-sdk";
import { baseSepolia } from "viem/chains";
import { acronymFirst10Words } from "@/lib/utils";
import {
  createWalletClient,
  createPublicClient,
  Hex,
  Address,
  custom,
} from "viem";
import { toast } from "sonner";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const { account } = useWalletConnection();
  const router = useRouter();

  const ethereum = (window as any).ethereum;

  function handleEditorChange(e: any) {
    setHtml(e.target.value);
  }

  async function handleCreate() {
    setLoading(true);
    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: custom(ethereum),
    });

    const walletClient = createWalletClient({
      account: account as Hex,
      chain: baseSepolia,
      transport: custom(ethereum),
    });
    try {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, article: html }),
      });

      // console.log("Request is done in create post");

      const uploadJson = await uploadRes.json();

      if (!uploadRes.ok || !uploadJson.ipfsUrl) {
        throw new Error(uploadJson.error || "Upload failed");
      }

      const uri = uploadJson.ipfsUrl as ValidMetadataURI;

      console.log("The uri was found", uri);

      const symbol = acronymFirst10Words(title) || "SYM";

      const coinParams = {
        name: title || "Untitled",
        symbol,
        uri,
        payoutRecipient: account as Address,
        platformReferrer: account as Address,
        chainId: baseSepolia.id,
        currency: DeployCurrency.ETH,
      };

      const result = await createCoin(coinParams, walletClient, publicClient, {
        gasMultiplier: 120,
      });

      console.log("✅ Coin Created:", result);

      if (result.deployment) {
        const { caller, uri } = result.deployment;
        console.log("Caller Address in CreatePost : ", caller);
        console.log("URI in CreatePost : ", uri);
        try {
          const res = await fetch("/api/coin-details", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ caller, uri }),
          });

          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Coin details post failed: ${errorText}`);
          }

          console.log("📝 Coin details saved successfully");
        } catch (error) {
          console.error("Error saving coin details:", error);
        }
      }
      toast.success("Your post was created successfully");
      router.push("/");
    } catch (err: any) {
      console.error("Error:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create Post</h1>
        <Button
          className="cursor-pointer"
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="post-title">Post Title</Label>
        <Input
          id="post-title"
          placeholder="Enter your post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <Editor value={html} onChange={handleEditorChange} />

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <div
            className="prose prose-neutral max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
