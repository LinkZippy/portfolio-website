"use client";
import { motion } from "motion/react";
import { ExternalLink, Lock } from "lucide-react";
import ScrambleHeading from "@/components/ui/scramble-heading";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const Tag = ({ label }: { label: string }) => (
  <span
    className="inline-block px-2 py-0.5 text-xs border border-neutral-700 text-neutral-500 rounded"
    style={{ fontFamily: "var(--font-mono)" }}
  >
    {label}
  </span>
);

interface Project {
  name: string;
  subtitle?: string;
  description: string;
  tags: string[];
  github?: string;
  isPrivate?: boolean;
}

const projects: Project[] = [
  {
    name: "ML for Urban Air Pollution 🏙️",
    description:
      "A framework that isolates meteorological drivers of PM2.5 concentrations. LightGBM and XGBoost models significantly outperformed OLS baselines in predicting urban air quality.",
    tags: ["Python", "LightGBM", "XGBoost", "pandas", "scikit-learn"],
    isPrivate: true,
  },
  {
    name: "ManaMetrics 🃏",
    description:
      "Automated ETL pipeline integrating the Scryfall API to normalize real-time Magic: The Gathering pricing data. Trained XGBoost/LightGBM regression models on playability signals and Reserved List status to detect emerging market trends.",
    tags: ["Python", "XGBoost", "LightGBM", "Scryfall API", "ETL"],
    github: "https://github.com/LinkZippy/mtg-price-predictor",
  },
  {
    name: "World Cup 2026 Predictor ⚽",
    description:
      "A prediction engine that scrapes live lineups and match results, runs them through an ML model and 10,000-iteration Monte Carlo simulation, and outputs win probabilities, scoreline distributions, and a full bracket forecast for all 48 teams.",
    tags: ["Python", "Machine Learning", "Monte Carlo", "Web Scraping"],
    github: "https://github.com/LinkZippy/wc2026_predictor",
  },
  {
    name: "IVL Data Cleaning 🧹",
    description:
      "A Python-based financial database cleaning and management system developed during an internship at Indorama Ventures in summer 2025.",
    tags: ["Python", "Data Manipulation", "Strategy Evaluation"],
    github: "https://github.com/LinkZippy/ivl-financial-database-cleaning",
  },
  {
    name: "Harry Potter Markov Chain 🧙",
    description:
      "Implements an n-gram Markov Chain model in Python to generate synthetic text based on the Harry Potter series by analyzing word sequence frequencies and building state-transition probability matrices to stochastically produce new sentences that mimic the author's stylistic patterns.",
    tags: ["Markov Chain", "Python", "NLP"],
    github: "https://github.com/LinkZippy/harrypotter_MC",
  },
  {
    name: "DartWrite ✍️",
    description:
      "A comprehensive data analysis and machine learning workflow built in Python/Jupyter Notebook that analyzes the evolution of college-level writing through data normalization, feature engineering, and integrated ML models to help faculty refine course design and students enhance their writing skills.",
    tags: ["Feature Engineering", "HuggingFace", "Machine Learning", "Statistical Tests", "Jupyter"],
    github: "https://github.com/LinkZippy/DartWrite",
  },
];

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, amount: 0.15 },
};

const cardVariant = {
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="min-h-screen text-white py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <ScrambleHeading
            className="text-4xl md:text-6xl font-bold text-white text-center"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Projects
          </ScrambleHeading>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-xl p-6 flex flex-col gap-4 transition-colors cursor-default"
            >
              <div className="flex-1 space-y-3">
                <div>
                  <h3
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {project.name}
                  </h3>
                  {project.subtitle && (
                    <p
                      className="text-sm text-neutral-500 mt-0.5"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {project.subtitle}
                    </p>
                  )}
                </div>
                <p className="text-neutral-400 text-base leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800 flex items-center gap-3">
                {project.isPrivate && (
                  <span className="flex items-center gap-1 text-xs text-neutral-600" style={{ fontFamily: "var(--font-mono)" }}>
                    <Lock className="w-3 h-3" />
                    Private
                  </span>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
