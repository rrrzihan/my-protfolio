"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  HeartHandshake,
  Car,
  BookOpen,
  Clapperboard,
  LayoutGrid,
} from "lucide-react";
import { getProject } from "@/lib/projects";

const icons = {
  "young-people-loneliness-campaign": HeartHandshake,
  "used-car-safety": Car,
  "drawing-book-3-4": BookOpen,
  "animations-and-videos": Clapperboard,
  others: LayoutGrid,
} as const;

export default function ProjectPage() {
  const params = useParams<{ slug: string }>();
  const project = getProject(params.slug);

  if (!project) {
    notFound();
    return null;
  }

  const Icon = icons[project.slug as keyof typeof icons];

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-indigo-500 selection:text-white relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>
        </motion.div>

        <motion.article
          layoutId={`card-${project.slug}`}
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="rounded-3xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
        >
          <div className="h-56 sm:h-72 bg-zinc-950/80 border-b border-zinc-800 flex items-center justify-center relative overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}
            />
            <motion.div
              layoutId={`icon-${project.slug}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.05 }}
              className={`relative w-24 h-24 bg-gradient-to-tr ${project.gradient} rounded-3xl flex items-center justify-center shadow-2xl ${project.shadow}`}
            >
              <Icon className="w-12 h-12 text-white" />
            </motion.div>
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.35 }}
            >
              <p className="text-xs font-mono tracking-wider text-zinc-500 mb-3">
                CASE STUDY
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                {project.title}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.35 }}
              className="text-zinc-400 text-base sm:text-lg leading-relaxed"
            >
              {project.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.35 }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              className="pt-6 border-t border-zinc-800"
            >
              <p className="text-sm text-zinc-500 leading-relaxed">
                More visuals, process notes, and deliverables can be added here
                as the case study grows.
              </p>
            </motion.div>
          </div>
        </motion.article>
      </div>
    </main>
  );
}
