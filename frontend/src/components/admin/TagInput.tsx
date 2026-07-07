"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({ value, onChange, placeholder = "Type and press Enter" }: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const tag = input.trim();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInput("");
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text");
    if (text.includes(",")) {
      e.preventDefault();
      const pasted = text.split(",").map(s => s.trim()).filter(Boolean);
      const merged = [...value];
      for (const tag of pasted) {
        if (tag && !merged.includes(tag)) {
          merged.push(tag);
        }
      }
      onChange(merged);
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5 p-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-transparent transition-all min-h-[42px]">
      {value.map((tag, i) => (
        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-sm font-medium text-gray-700">
          {tag}
          <button
            type="button"
            onClick={() => removeTag(i)}
            className="hover:bg-gray-200 rounded-full p-0.5 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBlur={addTag}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] outline-none text-sm bg-transparent py-0.5"
      />
    </div>
  );
}
