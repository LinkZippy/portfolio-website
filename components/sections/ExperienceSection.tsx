"use client";
import { motion } from "motion/react";
import { Timeline } from "@/components/ui/timeline";
import ScrambleHeading from "@/components/ui/scramble-heading";
import { cn } from "@/lib/utils";

const Tag = ({ label }: { label: string }) => (
  <span
    className="inline-block px-2 py-0.5 text-xs border border-neutral-700 text-neutral-400 rounded"
    style={{ fontFamily: "var(--font-mono)" }}
  >
    {label}
  </span>
);

const ExperienceCard = ({
  logo,
  subtitle,
  description,
  tags,
}: {
  logo: string;
  subtitle: string;
  description: string;
  tags: string[];
}) => (
  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
    <div className="flex items-center gap-4">
      <img src={logo} alt="" className="w-12 h-12 object-contain" />
      <p
        className="text-neutral-300 font-semibold"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {subtitle}
      </p>
    </div>
    <p className="text-neutral-400 text-base leading-relaxed">{description}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag key={tag} label={tag} />
      ))}
    </div>
  </div>
);

const timelineData = [
  {
    title: "Accenture",
    content: (
      <ExperienceCard
        logo="/images/accenture.svg"
        subtitle="Data Engineer"
        description="Migrated databases to OFSAA via automated ETL pipelines, optimizing SQL and schema mappings while building data validation scripts and presenting quality findings to stakeholders."
        tags={["SQL", "ETL", "Python", "Databricks", "Airflow", "OFSAA", "Data Validation", "Data Migration"]}
      />
    ),
  },
  {
    title: "Dartmouth",
    content: (
      <ExperienceCard
        logo="/images/dartmouth.svg"
        subtitle="Research Assistant"
        description="Benchmarked language models using cross-entropy metrics, and built an NLP pipeline analyzing rhetorical patterns in student writing, presenting findings to faculty."
        tags={["NLP", "PyTorch", "HuggingFace", "Cross-Entropy", "LLM Evaluation"]}
      />
    ),
  },
  {
    title: "Indorama",
    content: (
      <ExperienceCard
        logo="/images/ivl.png"
        subtitle="Data Engineer & Investor Relations"
        description="Built an automated workflow standardizing client records, a translation tool cutting turnaround from days to hours, and a market data reporting tool for real-time IR visibility."
        tags={["Numpy", "Pandas", "Python", "Translation", "Financial APIs", "Power BI", "IR"]}
      />
    ),
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="min-h-screen text-white py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <ScrambleHeading
            className="text-4xl md:text-6xl font-bold text-white text-center"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Work Experiences
          </ScrambleHeading>
        </motion.div>
      </div>
      <Timeline data={timelineData} />
    </section>
  );
}
