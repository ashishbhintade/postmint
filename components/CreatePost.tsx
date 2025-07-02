"use client";

import { useState } from "react";
import Editor from "react-simple-wysiwyg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [html, setHtml] = useState("");

  function handleEditorChange(e: any) {
    setHtml(e.target.value);
  }

  function handleCreate() {
    const postData = {
      title,
      article: html,
    };
    console.log(postData);
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create Post</h1>
        <Button className="cursor-pointer" onClick={handleCreate}>
          Create
        </Button>
      </div>

      {/* Post Title Input */}
      <div className="space-y-2">
        <Label htmlFor="post-title">Post Title</Label>
        <Input
          id="post-title"
          placeholder="Enter your post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* WYSIWYG Editor */}
      <Editor value={html} onChange={handleEditorChange} />

      {/* Preview Section */}
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
