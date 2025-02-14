"use client";

import styles from "./BuilderPageClient.module.css";
import { useState } from "react";
import { ResumeSection } from "../ResumeSection/ResumeSection";
import ResumeVisualizer from "../ResumeVisualizer/ResumeVisualizer";
import { Section } from "@/utils/section/types";

export function BuilderPageClient({ sections }: { sections: Section[] }) {
  const [unusedSections, setUnusedSections] = useState<Section[]>(sections);
  const [usedSections, setUsedSections] = useState<Section[]>([]);

  const handleMove = (id: string) => {
    // If in unused sections, move to used sections
    let section = unusedSections.find((section) => section.id === id);
    if (section) {
      setUsedSections([...usedSections, section]);
      setUnusedSections(unusedSections.filter((section) => section.id !== id));
      return;
    }

    // If in used sections, move to unused sections
    section = usedSections.find((section) => section.id === id);
    if (section) {
      setUnusedSections([...unusedSections, section]);
      setUsedSections(usedSections.filter((section) => section.id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        {unusedSections.map((section, i) => (
          <ResumeSection
            key={i}
            section={section}
            moveFunction={handleMove}
            isInVisualizer
          />
        ))}
      </div>
      <ResumeVisualizer sections={usedSections} moveFunction={handleMove} />
    </div>
  );
}
