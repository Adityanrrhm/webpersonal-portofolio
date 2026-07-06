"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink } from "lucide-react";
import { fetchAPI, wrapData } from "@/lib/api";

interface Profile {
  email: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

export default function CTA() {
  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    fetchAPI<{ data: Profile }>("profile")
      .then((res) => setProfile(wrapData(res)))
      .catch(() => {});
    fetchAPI<{ data: SocialLink[] }>("social-links")
      .then((res) => setSocialLinks(wrapData(res)))
      .catch(() => {});
  }, []);

  const email = profile?.email || "adityanurrohim19@gmail.com";
  const linkedIn = socialLinks.find((l) => l.platform === "LinkedIn")?.url || "https://linkedin.com/in/adityanurrohim";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      className="section-padding py-32 flex flex-col items-center justify-center text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl"
      >
        <h2 className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Let's <span className="text-gray-400">build something</span>
          <br className="hidden md:block" />
          meaningful
        </h2>

        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          For partnerships, campaigns, creator collaborations, or market-entry
          storytelling aimed at Indonesian audiences, reach out directly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleCopy}
            className="bg-[#111111] text-white px-8 py-4 rounded-full font-medium flex items-center gap-3 hover:opacity-90 transition-all active:scale-[0.97] w-full sm:w-auto justify-center"
          >
            {copied ? "Copied!" : email}
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>

          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-200 px-8 py-4 rounded-full font-medium flex items-center gap-3 hover:bg-gray-50 transition-all active:scale-[0.97] cursor-pointer w-full sm:w-auto justify-center"
          >
            <ExternalLink className="w-4 h-4 text-gray-500" />
            View on LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}
