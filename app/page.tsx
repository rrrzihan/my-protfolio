"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  Mail,
  Phone,
  Command,
  HeartHandshake,
  Car,
  BookOpen,
  Clapperboard,
  LayoutGrid,
  X,
  ExternalLink,
  ImageIcon,
  Copy,
  Check,
  Play,
} from "lucide-react";
import { projects } from "@/lib/projects";

const icons = {
  "young-people-loneliness-campaign": HeartHandshake,
  "used-car-safety": Car,
  "drawing-book-3-4": BookOpen,
  "animations-and-videos": Clapperboard,
  others: LayoutGrid,
} as const;

const UCS_SLUG = "used-car-safety";
const YPL_SLUG = "young-people-loneliness-campaign";
const DRAWING_BOOK_SLUG = "drawing-book-3-4";
const VIDEO_SLUG = "animations-and-videos";

const yplModules = [
  {
    title: "Data",
    description:
      "Research insights and data findings that ground the loneliness campaign.",
    href: "/ypl/Data.pdf",
    cover: "/ypl/data-cover.png",
    accent: "indigo",
  },
  {
    title: "DRK",
    description:
      "Design research kit and process materials supporting the campaign strategy.",
    href: "/ypl/DRK.pdf",
    cover: "/ypl/drk-cover.png",
    accent: "violet",
  },
  {
    title: "Campaign",
    description:
      "Final campaign creative, messaging, and public-facing communication assets.",
    href: "/ypl/Campaign.pdf",
    cover: "/ypl/campaign-cover.png",
    accent: "pink",
  },
] as const;

const videoModules = [
  {
    title: "AME",
    description: "Motion piece exploring pacing, atmosphere, and visual rhythm.",
    href: "https://media.githubusercontent.com/media/rrrzihan/my-protfolio/main/public/video/AME.mp4",
    cover: "/video/ame-cover.png",
    accent: "pink",
  },
  {
    title: "Lemon",
    description: "Short-form video experiment with narrative tone and color.",
    href: "https://media.githubusercontent.com/media/rrrzihan/my-protfolio/main/public/video/Lemon.mp4",
    cover: "/video/lemon-cover.png",
    accent: "amber",
  },
] as const;

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [ucsOpen, setUcsOpen] = useState(false);
  const [yplOpen, setYplOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    src: string;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<"phone" | "email" | null>(
    null,
  );
  const [copyHint, setCopyHint] = useState<"phone" | "email" | null>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function selectField(field: "phone" | "email") {
    const input =
      field === "phone" ? phoneInputRef.current : emailInputRef.current;
    if (!input) return;
    input.focus({ preventScroll: true });
    input.select();
    input.setSelectionRange(0, input.value.length);
  }

  async function copyContact(value: string, field: "phone" | "email") {
    setCopyHint(null);
    selectField(field);

    let ok = false;

    // Sync path while the click gesture is still active.
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }

    if (!ok) {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
          ok = true;
        }
      } catch {
        ok = false;
      }
    }

    if (ok) {
      setCopiedField(field);
      if (copyResetRef.current) clearTimeout(copyResetRef.current);
      copyResetRef.current = setTimeout(() => {
        setCopiedField(null);
        setCopyHint(null);
      }, 2200);
      return;
    }

    // Guaranteed manual path: browser prompt with prefilled text.
    window.prompt("Copy this contact detail:", value);
    selectField(field);
    setCopyHint(field);
  }

  useEffect(() => {
    return () => {
      if (copyResetRef.current) clearTimeout(copyResetRef.current);
    };
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setContactOpen(false);
        setCopiedField(null);
        setCopyHint(null);
        setUcsOpen(false);
        setYplOpen(false);
        setVideoOpen(false);
        setActiveVideo(null);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!ucsOpen && !yplOpen && !videoOpen && !activeVideo && !contactOpen) {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [ucsOpen, yplOpen, videoOpen, activeVideo, contactOpen]);

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-indigo-500 selection:text-white relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2 font-mono text-sm tracking-wider text-zinc-400">
          <Command className="w-4 h-4 text-indigo-400" />
          <span>PORTFOLIO // 2026</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setCopiedField(null);
            setCopyHint(null);
            setContactOpen(true);
          }}
          aria-haspopup="dialog"
          className="text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-full border border-zinc-700 transition-all flex items-center gap-1"
        >
          <Mail className="w-3.5 h-3.5" /> Contact
        </button>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-12 pb-16 relative z-10">
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Design & Full-Stack Development</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            My Digital Space.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Crafted with Code & AI.
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Built entirely using AI pair-programming. I am leveraging AI
            alongside my design and engineering skills to create, iterate, and
            launch meaningful products and content.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 relative z-10 border-t border-zinc-800/60">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Featured Modules
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Click a module to open the full case page
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const Icon = icons[project.slug as keyof typeof icons];
            const isUcs = project.slug === UCS_SLUG;
            const isYpl = project.slug === YPL_SLUG;
            const isDrawingBook = project.slug === DRAWING_BOOK_SLUG;
            const isVideo = project.slug === VIDEO_SLUG;

            const card = (
              <motion.article
                layoutId={
                  isUcs
                    ? "ucs-card"
                    : isYpl
                      ? "ypl-card"
                      : isVideo
                        ? "video-card"
                        : `card-${project.slug}`
                }
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                className={`group h-full bg-zinc-900/40 border border-zinc-800 ${project.hoverBorder} rounded-2xl p-5 flex flex-col justify-between transition-colors cursor-pointer relative overflow-hidden`}
              >
                <div className="h-48 bg-zinc-950/80 rounded-xl mb-4 border border-zinc-800/50 flex items-center justify-center relative overflow-hidden group-hover:bg-zinc-900/80 transition-all">
                  <motion.div
                    whileHover={{
                      scale: 1.12,
                      rotate: index % 2 === 0 ? 4 : -4,
                    }}
                    className={`w-16 h-16 bg-gradient-to-tr ${project.gradient} rounded-2xl flex items-center justify-center shadow-lg ${project.shadow}`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-2 gap-3">
                    <h3
                      className={`text-lg font-bold text-white ${project.hoverText} transition-colors`}
                    >
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      className={`w-5 h-5 shrink-0 text-zinc-500 ${project.hoverText} transition-colors`}
                    />
                  </div>
                  <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">
                    {project.short}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );

            if (isUcs) {
              return (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => setUcsOpen(true)}
                  className="block h-full text-left w-full"
                >
                  {card}
                </button>
              );
            }

            if (isYpl) {
              return (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => setYplOpen(true)}
                  className="block h-full text-left w-full"
                >
                  {card}
                </button>
              );
            }

            if (isDrawingBook) {
              return (
                <a
                  key={project.slug}
                  href="/the-color-book.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {card}
                </a>
              );
            }

            if (isVideo) {
              return (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  className="block h-full text-left w-full"
                >
                  {card}
                </button>
              );
            }

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="block h-full"
              >
                {card}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Close contact"
              className="absolute inset-0 bg-[#09090b]/80 backdrop-blur-md"
              onClick={() => {
                setContactOpen(false);
                setCopiedField(null);
                setCopyHint(null);
              }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative z-10 w-full max-w-md rounded-3xl border border-zinc-700/80 bg-zinc-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 p-5 sm:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-[10px] font-mono tracking-wider text-indigo-400/80 mb-1">
                    GET IN TOUCH
                  </p>
                  <h2
                    id="contact-modal-title"
                    className="text-xl font-bold text-white tracking-tight"
                  >
                    Contact
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setContactOpen(false);
                    setCopiedField(null);
                    setCopyHint(null);
                  }}
                  aria-label="Close"
                  className="shrink-0 w-10 h-10 rounded-full border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-zinc-400 mb-4">
                Tap Copy, or click the field and use Ctrl/Cmd + C (mobile:
                long-press).
              </p>

              <div className="space-y-4">
                <div className="rounded-2xl border border-zinc-700 bg-zinc-950/70 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-indigo-400" />
                    <span className="text-[10px] font-mono tracking-wider text-zinc-500">
                      PHONE
                    </span>
                  </div>
                  <input
                    ref={phoneInputRef}
                    readOnly
                    defaultValue="0411750242"
                    onFocus={(event) => event.currentTarget.select()}
                    onClick={(event) => event.currentTarget.select()}
                    className="w-full bg-transparent text-lg font-mono text-white outline-none selection:bg-indigo-500 selection:text-white mb-3"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => void copyContact("0411750242", "phone")}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-3 py-2.5 text-sm text-zinc-100 transition-colors"
                    >
                      {copiedField === "phone" ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy phone
                        </>
                      )}
                    </button>
                    <a
                      href="tel:0411750242"
                      className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-300 transition-colors"
                    >
                      Call
                    </a>
                  </div>
                  {copyHint === "phone" && (
                    <p className="text-xs text-amber-300 mt-2">
                      Text is selected — press Ctrl/Cmd + C, or long-press to
                      copy.
                    </p>
                  )}
                </div>

                <div className="rounded-2xl border border-zinc-700 bg-zinc-950/70 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <span className="text-[10px] font-mono tracking-wider text-zinc-500">
                      EMAIL
                    </span>
                  </div>
                  <input
                    ref={emailInputRef}
                    readOnly
                    defaultValue="shengzihan2022@gmail.com"
                    onFocus={(event) => event.currentTarget.select()}
                    onClick={(event) => event.currentTarget.select()}
                    className="w-full bg-transparent text-base sm:text-lg text-white outline-none selection:bg-indigo-500 selection:text-white mb-3"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        void copyContact("shengzihan2022@gmail.com", "email")
                      }
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-3 py-2.5 text-sm text-zinc-100 transition-colors"
                    >
                      {copiedField === "email" ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy email
                        </>
                      )}
                    </button>
                    <a
                      href="mailto:shengzihan2022@gmail.com"
                      className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-300 transition-colors"
                    >
                      Email
                    </a>
                  </div>
                  {copyHint === "email" && (
                    <p className="text-xs text-amber-300 mt-2">
                      Text is selected — press Ctrl/Cmd + C, or long-press to
                      copy.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UCS Detail Modal */}
      <AnimatePresence>
        {ucsOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.button
              type="button"
              aria-label="Close overlay"
              className="absolute inset-0 bg-[#09090b]/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUcsOpen(false)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="ucs-modal-title"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-700/80 bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-black/50"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-8 py-5 border-b border-zinc-800/80 bg-zinc-900/90 backdrop-blur-md">
                <div>
                  <p className="text-[10px] font-mono tracking-wider text-emerald-400/80 mb-1">
                    UCS PROJECT
                  </p>
                  <h2
                    id="ucs-modal-title"
                    className="text-xl sm:text-2xl font-bold text-white tracking-tight"
                  >
                    Used Car Safety Showcase
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setUcsOpen(false)}
                  aria-label="Close"
                  className="shrink-0 w-10 h-10 rounded-full border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Brand Guidelines */}
                  <motion.a
                    href="/ucs/brand-guidelines.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative block rounded-2xl border border-zinc-700/80 bg-zinc-950/60 overflow-hidden shadow-lg shadow-black/30 hover:border-indigo-500/40 transition-colors [transform-style:preserve-3d]"
                  >
                    <div className="relative h-52 sm:h-56 overflow-hidden bg-zinc-950">
                      <Image
                        src="/ucs/brand-guidelines-cover.png"
                        alt="UCS Brand Guidelines cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 420px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                      <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-sm">
                        Interactive PDF
                      </span>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                          Brand Guidelines
                        </h3>
                        <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 shrink-0 mt-1 transition-colors" />
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        Comprehensive brand identity system, typography, color
                        palette, and usage rules.
                      </p>
                    </div>
                  </motion.a>

                  {/* Prospectus */}
                  <motion.a
                    href="/ucs/prospectus.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative block rounded-2xl border border-zinc-700/80 bg-zinc-950/60 overflow-hidden shadow-lg shadow-black/30 hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="relative h-52 sm:h-56 overflow-hidden bg-zinc-950 border-b border-zinc-800">
                      <Image
                        src="/ucs/prospectus-cover.png"
                        alt="UCS Project Prospectus cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 420px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {["PDF", "Strategy", "Prospectus"].map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/50 text-zinc-200 border border-white/15 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                          Project Prospectus
                        </h3>
                        <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 shrink-0 mt-1 transition-colors" />
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        Strategic overview, project prospectus, market
                        positioning, and core value proposition.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["PDF", "Strategy", "Prospectus"].map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.a>
                </div>

                {/* Coming soon placeholder */}
                <div className="rounded-2xl border border-dashed border-zinc-700/70 bg-zinc-950/40 px-5 py-8 sm:py-10 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700 mb-3">
                    <ImageIcon className="w-5 h-5 text-zinc-500" />
                  </div>
                  <p className="text-sm font-medium text-zinc-300">
                    Posters & Mockups Gallery (Coming Soon)
                  </p>
                  <p className="text-xs text-zinc-500 mt-1.5 max-w-md mx-auto">
                    Visual assets and campaign mockups will appear here in a
                    future update.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YPL Detail Modal */}
      <AnimatePresence>
        {yplOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.button
              type="button"
              aria-label="Close overlay"
              className="absolute inset-0 bg-[#09090b]/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setYplOpen(false)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="ypl-modal-title"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-700/80 bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-black/50"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-8 py-5 border-b border-zinc-800/80 bg-zinc-900/90 backdrop-blur-md">
                <div>
                  <p className="text-[10px] font-mono tracking-wider text-indigo-400/80 mb-1">
                    YPL PROJECT
                  </p>
                  <h2
                    id="ypl-modal-title"
                    className="text-xl sm:text-2xl font-bold text-white tracking-tight"
                  >
                    Young People Loneliness Showcase
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setYplOpen(false)}
                  aria-label="Close"
                  className="shrink-0 w-10 h-10 rounded-full border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {yplModules.map((module) => (
                    <motion.a
                      key={module.title}
                      href={module.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -6 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative block rounded-2xl border border-zinc-700/80 bg-zinc-950/60 overflow-hidden shadow-lg shadow-black/30 transition-colors ${
                        module.accent === "indigo"
                          ? "hover:border-indigo-500/40"
                          : module.accent === "violet"
                            ? "hover:border-violet-500/40"
                            : "hover:border-pink-500/40"
                      }`}
                    >
                      <div className="relative h-56 sm:h-64 overflow-hidden bg-zinc-950 border-b border-zinc-800">
                        <Image
                          src={module.cover}
                          alt={`${module.title} PDF cover`}
                          fill
                          sizes="(max-width: 768px) 100vw, 320px"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                        <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-sm">
                          PDF
                        </span>
                      </div>
                      <div className="p-5 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <h3
                            className={`text-lg font-bold text-white transition-colors ${
                              module.accent === "indigo"
                                ? "group-hover:text-indigo-300"
                                : module.accent === "violet"
                                  ? "group-hover:text-violet-300"
                                  : "group-hover:text-pink-300"
                            }`}
                          >
                            {module.title}
                          </h3>
                          <ExternalLink
                            className={`w-4 h-4 text-zinc-500 shrink-0 mt-1 transition-colors ${
                              module.accent === "indigo"
                                ? "group-hover:text-indigo-400"
                                : module.accent === "violet"
                                  ? "group-hover:text-violet-400"
                                  : "group-hover:text-pink-400"
                            }`}
                          />
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {module.description}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Detail Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.button
              type="button"
              aria-label="Close overlay"
              className="absolute inset-0 bg-[#09090b]/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVideoOpen(false)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="video-modal-title"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-700/80 bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-black/50"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-8 py-5 border-b border-zinc-800/80 bg-zinc-900/90 backdrop-blur-md">
                <div>
                  <p className="text-[10px] font-mono tracking-wider text-pink-400/80 mb-1">
                    VIDEO PROJECT
                  </p>
                  <h2
                    id="video-modal-title"
                    className="text-xl sm:text-2xl font-bold text-white tracking-tight"
                  >
                    Animations and Videos Showcase
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setVideoOpen(false)}
                  aria-label="Close"
                  className="shrink-0 w-10 h-10 rounded-full border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {videoModules.map((module) => (
                    <motion.button
                      key={module.title}
                      type="button"
                      onClick={() =>
                        setActiveVideo({
                          title: module.title,
                          src: module.href,
                        })
                      }
                      whileHover={{ y: -6 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative block w-full text-left rounded-2xl border border-zinc-700/80 bg-zinc-950/60 overflow-hidden shadow-lg shadow-black/30 transition-colors ${
                        module.accent === "pink"
                          ? "hover:border-pink-500/40"
                          : "hover:border-amber-500/40"
                      }`}
                    >
                      <div className="relative aspect-video overflow-hidden bg-zinc-950 border-b border-zinc-800">
                        <Image
                          src={module.cover}
                          alt={`${module.title} video cover`}
                          fill
                          sizes="(max-width: 768px) 100vw, 420px"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-12 h-12 rounded-full bg-black/55 border border-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                          </span>
                        </span>
                        <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-sm">
                          Video
                        </span>
                      </div>
                      <div className="p-5 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <h3
                            className={`text-lg font-bold text-white transition-colors ${
                              module.accent === "pink"
                                ? "group-hover:text-pink-300"
                                : "group-hover:text-amber-300"
                            }`}
                          >
                            {module.title}
                          </h3>
                          <Play
                            className={`w-4 h-4 text-zinc-500 shrink-0 mt-1 transition-colors ${
                              module.accent === "pink"
                                ? "group-hover:text-pink-400"
                                : "group-hover:text-amber-400"
                            }`}
                          />
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {module.description}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline video player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              type="button"
              aria-label="Close video"
              className="absolute inset-0 bg-[#09090b]/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeVideo.title}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative z-10 w-full max-w-5xl rounded-3xl border border-zinc-700/80 bg-zinc-950 overflow-hidden shadow-2xl shadow-black/50"
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-zinc-800">
                <h3 className="text-lg font-bold text-white">
                  {activeVideo.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  aria-label="Close"
                  className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-black aspect-video">
                <video
                  key={activeVideo.src}
                  src={activeVideo.src}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
