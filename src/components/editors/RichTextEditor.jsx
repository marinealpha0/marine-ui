"use client";

import React, { useCallback, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import { Button } from "@/components/ui/button";
import { Regex } from "@/constant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo2,
  Redo2,
  Code,
  Heading2,
  Heading3,
  Eye,
  Edit3,
  Palette,
} from "@/assets/icons";
import { compressImageIfNeeded } from "@/utils/imageCompression";


const RichTextEditor = ({
  value = "",
  onChange,
  placeholder = "Start typing your content here...",
  minHeight = "400px",
  maxHeight = "600px",
  editable = true,
}) => {
  const fileInputRef = useRef(null);
  const [isPreview, setIsPreview] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");

  const getPxNumber = (val) => {
    const match = String(val).match(Regex.PX_UNIT_CAPTURE_REGEX);
    return match ? parseInt(match[1], 10) : null;
  };

  const minPx = getPxNumber(minHeight);
  const maxPx = getPxNumber(maxHeight);
  const resolvedMinHeight =
    minPx !== null && maxPx !== null && minPx > maxPx ? maxHeight : minHeight;

  const colorPalette = [
    { name: "Black", value: "#000000" },
    { name: "Gray", value: "#6B7280" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Red", value: "#EF4444" },
    { name: "Green", value: "#10B981" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Orange", value: "#F97316" },
    { name: "Pink", value: "#EC4899" },
  ];

  const lowlight = createLowlight();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline cursor-pointer hover:text-primary-hover",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      TextStyle,
      Color,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    editable: editable && !isPreview,
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-full overflow-y-auto",
        style: "min-height: inherit; max-height: inherit;",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  const handleImageUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      const finalFile = await compressImageIfNeeded(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result;
        editor.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(finalFile);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddLink = () => {
    if (!editor) return;
    const url = prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleApplyColor = (color) => {
    if (editor) {
      setSelectedColor(color);
      editor.chain().focus().setColor(color).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="flex flex-col w-full border border-gray-300 rounded-lg bg-white shadow-md overflow-hidden">
      {!isPreview && (
        <div className="flex flex-wrap items-center gap-1 p-3 bg-white border-b border-gray-300 overflow-x-auto">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
            className="h-9 px-2 hover:bg-primary/5"
          >
            <Undo2 className="w-4 h-4 text-gray-700" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
            className="h-9 px-2 hover:bg-primary/5"
          >
            <Redo2 className="w-4 h-4 text-gray-700" />
          </Button>

          <div className="w-px h-6 bg-gray-300" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-9 px-3 bg-white text-gray-700 border border-gray-200 hover:bg-primary/5 text-sm font-medium"
              >
                <span>
                  {editor.isActive("heading", { level: 1 })
                    ? "H1"
                    : editor.isActive("heading", { level: 2 })
                    ? "H2"
                    : editor.isActive("heading", { level: 3 })
                    ? "H3"
                    : "P"}
                </span>
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-36">
              <DropdownMenuItem
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive("paragraph") ? "bg-primary/10" : ""}
              >
                Paragraph
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 1 }) ? "bg-primary/10" : ""
                }
              >
                <Heading2 className="w-4 h-4 mr-2" />
                Heading 1
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 }) ? "bg-primary/10" : ""
                }
              >
                <Heading3 className="w-4 h-4 mr-2" />
                Heading 2
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                  editor.isActive("heading", { level: 3 }) ? "bg-primary/10" : ""
                }
              >
                <Heading3 className="w-4 h-4 mr-2" />
                Heading 3
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-px h-6 bg-gray-300" />

          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold (Ctrl+B)"
            className={`h-9 px-2 ${
              editor.isActive("bold")
                ? "bg-primary text-white hover:bg-primary-hover"
                : "text-gray-700 hover:bg-primary/5"
            }`}
          >
            <Bold className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic (Ctrl+I)"
            className={`h-9 px-2 ${
              editor.isActive("italic")
                ? "bg-primary text-white hover:bg-primary-hover"
                : "text-gray-700 hover:bg-primary/5"
            }`}
          >
            <Italic className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="Underline (Ctrl+U)"
            className={`h-9 px-2 ${
              editor.isActive("underline")
                ? "bg-primary text-white hover:bg-primary-hover"
                : "text-gray-700 hover:bg-primary/5"
            }`}
          >
            <UnderlineIcon className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title="Strikethrough"
            className={`h-9 px-2 ${
              editor.isActive("strike")
                ? "bg-primary text-white hover:bg-primary-hover"
                : "text-gray-700 hover:bg-primary/5"
            }`}
          >
            <Strikethrough className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                title="Text Color"
                className="h-9 px-2 hover:bg-primary/5"
              >
                <Palette className="w-4 h-4 text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <div className="p-2 grid grid-cols-4 gap-2">
                {colorPalette.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleApplyColor(color.value)}
                    title={color.name}
                    className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-600 transition-all"
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-px h-6 bg-gray-300" />

          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            title="Code Block"
            className={`h-9 px-2 ${
              editor.isActive("codeBlock")
                ? "bg-primary text-white hover:bg-primary-hover"
                : "text-gray-700 hover:bg-primary/5"
            }`}
          >
            <Code className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300" />

          <Button
            size="sm"
            variant="ghost"
            onClick={handleAddLink}
            title="Add Link"
            className={`h-9 px-2 ${
              editor.isActive("link")
                ? "bg-primary text-white hover:bg-primary-hover"
                : "text-gray-700 hover:bg-primary/5"
            }`}
          >
            <LinkIcon className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleImageUpload}
            title="Insert Image"
            className="h-9 px-2 text-gray-700 hover:bg-primary/5"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <div className="w-px h-6 bg-gray-300" />

          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            title="Align Left"
            className={`h-9 px-2 ${
              editor.isActive({ textAlign: "left" })
                ? "bg-primary text-white hover:bg-primary-hover"
                : "text-gray-700 hover:bg-primary/5"
            }`}
          >
            <AlignLeft className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            title="Align Center"
            className={`h-9 px-2 ${
              editor.isActive({ textAlign: "center" })
                ? "bg-primary text-white hover:bg-primary-hover"
                : "text-gray-700 hover:bg-primary/5"
            }`}
          >
            <AlignCenter className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            title="Align Right"
            className={`h-9 px-2 ${
              editor.isActive({ textAlign: "right" })
                ? "bg-primary text-white hover:bg-primary-hover"
                : "text-gray-700 hover:bg-primary/5"
            }`}
          >
            <AlignRight className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            title="Justify"
            className={`h-9 px-2 ${
              editor.isActive({ textAlign: "justify" })
                ? "bg-primary text-white hover:bg-primary-hover"
                : "text-gray-700 hover:bg-primary/5"
            }`}
          >
            <AlignJustify className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300" />

          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().clearNodes().run()}
            title="Clear Formatting"
            className="h-9 px-2 text-gray-700 hover:bg-primary/5"
          >
            <Code className="w-4 h-4" />
          </Button>

          <div className="ml-auto" />

          <Button
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
            className="h-9 px-3 font-medium bg-primary text-white hover:bg-primary-hover"
          >
            {isPreview ? (
              <>
                <Edit3 className="w-4 h-4 mr-1" />
                Edit
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </>
            )}
          </Button>
        </div>
      )}

      <div
        className="flex-1 cursor-text"
        onClick={() => {
          if (!isPreview && editor) {
            editor.commands.focus();
          }
        }}
      >
        <EditorContent
          editor={editor}
          className={`prose prose-sm max-w-none w-full focus:outline-none p-6 ${
            isPreview ? "pointer-events-none" : ""
          }`}
          style={{
            minHeight: resolvedMinHeight,
            maxHeight,
          }}
        />
      </div>

      {isPreview && (
        <div className="px-6 py-3 bg-primary/5 border-t border-gray-300 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Preview Mode
          </span>
          <Button
            size="sm"
            onClick={() => setIsPreview(false)}
            className="h-8 px-3 text-sm bg-primary text-white hover:bg-primary-hover"
          >
            <Edit3 className="w-3 h-3 mr-1" />
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
