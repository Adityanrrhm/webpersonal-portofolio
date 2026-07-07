"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, GitBranch } from "lucide-react";
import Img from "@/components/Img";
import { fetchAPI, wrapData } from "@/lib/api";

interface Project {
  id: number;
  title: string;
  category: string;
  label: string;
  description: string;
  techStack: string[];
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  isPrivate: boolean;
}

const LABEL_COLORS: Record<string, string> = {
  Mobile: "from-blue-50 to-blue-100",
  AI: "from-gray-100 to-gray-200",
  Brand: "from-amber-50 to-yellow-100",
  Data: "from-emerald-50 to-teal-100",
  Cloud: "from-sky-50 to-indigo-100",
  ML: "from-violet-50 to-purple-100",
};

const ALL_LABEL = "All";

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(project)}
      className="rounded-2xl bg-zinc-100 p-3 cursor-pointer will-change-transform group hover:shadow-xl transition-shadow duration-300"
    >
      <div className="bg-white rounded-xl flex flex-col overflow-hidden">
        <div className="p-3 pb-1.5">
          <div
            className={`rounded-lg h-44 ${project.imageUrl ? "bg-gray-50" : "bg-gradient-to-br " + (LABEL_COLORS[project.label] || "from-gray-50 to-gray-100")} flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.03]`}
          >
            {project.imageUrl ? (
              <Img src={project.imageUrl} alt={project.title} containerClassName="w-full h-full" imgClassName="w-full h-full object-contain" />
            ) : (
              <div className="text-center w-full px-6">
                <div className="max-w-[160px] mx-auto aspect-video bg-white/80 rounded border border-white/60 shadow-xs flex flex-col items-center justify-center backdrop-blur-sm">
                  <p className="text-[11px] font-bold text-gray-700 text-center leading-tight px-3">{project.title}</p>
                  <div className="w-6 h-px bg-gray-200 my-1.5" />
                  <p className="text-[9px] text-gray-400">{project.label}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="px-4 pb-4 pt-1.5">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {project.title}
          </p>
          <p className="text-[13px] text-gray-500 truncate">
            {project.category}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const ProjectCardMemo = memo(ProjectCard);

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl overflow-y-auto md:overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all active:scale-[0.92] shadow-sm"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        <div
          className={`md:w-[60%] ${project.imageUrl ? "bg-gray-50" : "bg-gradient-to-br " + (LABEL_COLORS[project.label] || "from-gray-50 to-gray-100")} p-0 flex items-center justify-center min-h-[220px] md:min-h-[400px] overflow-hidden`}
        >
          {project.imageUrl ? (
            <Img src={project.imageUrl} alt={project.title} containerClassName="w-full h-full" imgClassName="w-full h-full object-contain" />
          ) : (
            <div className="w-full p-6 md:p-8">
              <div className="w-full max-w-md mx-auto">
                <div className="aspect-video bg-white/80 rounded-xl shadow-md flex items-center justify-center">
                  <div className="text-center p-6 w-full">
                    <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center mx-auto mb-3">
                      <span className="text-sm font-bold text-gray-500">{project.title.charAt(0)}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-700">{project.title}</h3>
                    <div className="w-10 h-px bg-gray-200 mx-auto my-3" />
                    <p className="text-sm text-gray-500">{project.category}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="md:w-[40%] p-6 md:p-8 flex flex-col justify-center overflow-y-auto">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              {project.label}
            </p>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-gray-900 mb-3">
              {project.title}
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {project.description}
            </p>

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-all active:scale-[0.97] cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.isPrivate ? undefined : project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all active:scale-[0.97] cursor-pointer ${
                    project.isPrivate
                      ? "border border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <GitBranch className="w-4 h-4" />
                  {project.isPrivate ? "Private Repo" : "Source Code"}
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [activeLabel, setActiveLabel] = useState<string>(ALL_LABEL);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI<{ data: Project[] }>("projects")
      .then((res) => {
        setProjects(wrapData(res));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const labels = [ALL_LABEL, ...new Set(projects.map((p) => p.label))];

  const filtered =
    activeLabel === ALL_LABEL
      ? projects
      : projects.filter((p) => p.label === activeLabel);

  if (loading) {
    return (
      <section className="section-padding py-20">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-10 w-48 bg-gray-200 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-zinc-100 p-3">
                <div className="bg-white rounded-xl h-[320px]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding py-20">
      <div className="mb-2">
        <p className="text-sm text-gray-500 mb-2 uppercase tracking-widest">
          PORTFOLIO
        </p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold">Projects.</h2>
        <p className="text-gray-400 mt-2">
          Selected work across data, cloud, and product.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10 mt-8">
        {labels.map((label) => {
          const count =
            label === ALL_LABEL
              ? projects.length
              : projects.filter((p) => p.label === label).length;
          const isActive = activeLabel === label;
          return (
            <button
              key={label}
              onClick={() => setActiveLabel(label)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all active:scale-[0.97] ${
                isActive
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label}{" "}
              <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCardMemo
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="text-gray-400 text-center py-20">
          No projects found for this category.
        </p>
      )}

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
