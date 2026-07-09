"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";
import { fetchAPI, wrapData } from "@/lib/api";
import { getIcon } from "@/lib/icons";

interface Profile {
  name: string;
  bio: string;
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  iconName: string;
}

const columns = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Project", href: "/project" },
      { label: "Certificates", href: "/certificate" },
      { label: "Experience", href: "/experience" },
    ],
  },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookies Settings", href: "#" },
];

export default function Footer() {
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

  return (
    <footer className="w-full px-4 md:px-8 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto w-[87%] max-w-[1400px] bg-white rounded-[32px] border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.04)] px-6 md:px-12 pt-14 md:pt-16 pb-7"
      >
        {/* Logo Badge di atas kiri wadah footer (overlapping border) */}
        <div className="absolute -top-6 left-6 md:left-5 flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-md p-2.5 z-10">
          <img
            src="/assets/logo_web_Adityanrrhm.png"
            alt="Logo Badge"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0">
          <div className="w-full lg:w-[45%]">
            <div className="flex items-center gap-3">
              <span className="font-handwritten text-[26px] md:text-5xl text-gray-900 tracking-tight">
                {profile?.name || "Aditya Nur Rohim"}
              </span>
            </div>

            <p className="text-md text-gray-500 leading-relaxed mt-6 max-w-[380px]">
              {profile?.bio ||
                "I help businesses make sense of their data — from cleaning messy datasets to building cloud infrastructure that scales."}
            </p>
          </div>

          <div className="w-full lg:w-[55%] flex justify-start lg:justify-end">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 md:gap-[100px] w-full sm:w-auto">
              {columns.map((col) => (
                <div key={col.title}>
                  <h4 className="text-base font-semibold text-gray-900">
                    {col.title}
                  </h4>
                  <ul className="mt-[18px] space-y-[14px]">
                    {col.links.map((link) => {
                      const isExternal =
                        link.href.startsWith("http") ||
                        link.href.startsWith("mailto");
                      const Tag = isExternal ? "a" : Link;
                      const extraProps = isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {};
                      return (
                        <li key={link.label}>
                          <Tag
                            href={link.href}
                            {...extraProps}
                            className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2"
                          >
                            {link.label}
                          </Tag>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              <div>
                <h4 className="text-base font-semibold text-gray-900">
                  Connect
                </h4>
                <ul className="mt-[18px] space-y-[14px]">
                  {socialLinks.map((link) => {
                    const isExternal =
                      link.url.startsWith("http") ||
                      link.url.startsWith("mailto");
                    const Tag = isExternal ? "a" : Link;
                    const extraProps = isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {};
                    const Icon =
                      link.iconName === "Mail" ? Mail : getIcon(link.iconName);
                    return (
                      <li key={link.id}>
                        <Tag
                          href={link.url}
                          {...extraProps}
                          className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2"
                        >
                          {Icon && <Icon className="size-4 shrink-0" />}
                          {link.platform}
                        </Tag>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gray-200 mt-10 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-gray-400">
            &copy; 2026 {profile?.name || "Aditya Nur Rohim"}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            {bottomLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] text-gray-400 underline underline-offset-2 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
