"use client";

import { fetchUserExperiences } from "@/utils/experience/actions";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Experience } from "@/utils/experience/types";
import ResumeVisualizer from "@/components/ResumeVisualizer/ResumeVisualizer";
import ResumeSection from "@/components/ResumeSection/ResumeSection";

export default function ExperimentPage() {
  const [unusedSections, setUnusedSections] = useState<Experience[]>([]);
  const [usedSections, setUsedSections] = useState<Experience[]>([]);
  useEffect(() => {
    fetchUserExperiences().then((experiences) =>
      setUnusedSections(experiences)
    );
  }, []);

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
          <ResumeSection key={i} section={section} moveFunction={handleMove} />
        ))}
      </div>
      <ResumeVisualizer sections={usedSections} moveFunction={handleMove} />
    </div>
  );
}
