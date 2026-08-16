export type Project = {
  slug: string;
  title: string;
  short: string;
  description: string;
  tags: string[];
  accent: "indigo" | "emerald" | "amber" | "pink" | "zinc";
  gradient: string;
  hoverBorder: string;
  hoverText: string;
  shadow: string;
};

export const projects: Project[] = [
  {
    slug: "used-car-safety",
    title: "Used Car Safety (UCS)",
    short: "Communication design around safety checks and informed used-car decisions.",
    description:
      "A project centered on used car safety — clarifying inspection points, risk signals, and buyer education through clear visual communication and practical guidance.",
    tags: ["Safety", "Education", "Visual Design"],
    accent: "emerald",
    gradient: "from-emerald-500 to-teal-500",
    hoverBorder: "hover:border-emerald-500/50",
    hoverText: "group-hover:text-emerald-400",
    shadow: "shadow-emerald-500/20",
  },
  {
    slug: "young-people-loneliness-campaign",
    title: "Young People Loneliness Campaign",
    short: "A campaign exploring connection, awareness, and support for young people.",
    description:
      "A creative campaign focused on young people’s loneliness — messaging, visual systems, and call-to-action touchpoints designed to spark conversation and encourage connection.",
    tags: ["Campaign", "Social Impact", "Brand"],
    accent: "indigo",
    gradient: "from-indigo-500 to-purple-500",
    hoverBorder: "hover:border-indigo-500/50",
    hoverText: "group-hover:text-indigo-400",
    shadow: "shadow-indigo-500/20",
  },
  {
    slug: "drawing-book-3-4",
    title: "3-4 Years Old Drawing Book",
    short: "An age-appropriate drawing book for toddlers aged 3–4.",
    description:
      "A drawing book designed for children aged 3–4 — playful prompts, simple shapes, and accessible layouts that support early creative expression and motor skills.",
    tags: ["Children", "Print", "Illustration"],
    accent: "amber",
    gradient: "from-amber-400 to-orange-500",
    hoverBorder: "hover:border-amber-500/50",
    hoverText: "group-hover:text-amber-400",
    shadow: "shadow-amber-500/20",
  },
  {
    slug: "animations-and-videos",
    title: "Video",
    short: "Motion pieces and short-form video experiments.",
    description:
      "A collection of animations and video works — motion studies, narrative shorts, and visual experiments exploring rhythm, pacing, and storytelling through moving image.",
    tags: ["Motion", "Video", "Storytelling"],
    accent: "pink",
    gradient: "from-pink-500 to-rose-500",
    hoverBorder: "hover:border-pink-500/50",
    hoverText: "group-hover:text-pink-400",
    shadow: "shadow-pink-500/20",
  },
  {
    slug: "others",
    title: "Others",
    short: "Additional experiments, studies, and side projects.",
    description:
      "A growing set of other works — sketches, prototypes, and exploratory pieces that sit outside the main featured modules.",
    tags: ["Experiments", "Studies", "Archive"],
    accent: "zinc",
    gradient: "from-zinc-500 to-zinc-700",
    hoverBorder: "hover:border-zinc-500/50",
    hoverText: "group-hover:text-zinc-200",
    shadow: "shadow-zinc-500/20",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
