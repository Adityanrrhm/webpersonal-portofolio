"use client";

import { X } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";

export default function ImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative">
            <img src={value} alt="preview" className="w-20 h-20 rounded-lg object-cover border" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center active:scale-[0.92]"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res?.[0]?.url) onChange(res[0].url);
            }}
            appearance={{
              button: "w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 transition-colors bg-transparent text-[10px]",
              allowedContent: "hidden",
            }}
          />
        )}
        {value && (
          <span className="text-xs text-gray-400 truncate max-w-[200px]">{value.split("/").pop()}</span>
        )}
      </div>
    </div>
  );
}
