"use client";

import ResumeSectionContent from "./ResumeSectionContent/ResumeSectionContent";
import styles from "./ResumeSection.module.css";
import { Experience } from "@/utils/experience/types";

function ToolModal({
  section,
  moveFunction,
}: {
  section: Experience;
  moveFunction: (id: string) => void;
}) {
  return (
    <div className={styles.modal}>
      <button onClick={() => moveFunction(section.id)}>
        Remove this section
      </button>
    </div>
  );
}

// TODO: Replace with all types
export default function ResumeSection({
  section,
  moveFunction,
}: {
  section: Experience;
  moveFunction: (id: string) => void;
}) {
  return (
    <section className={styles.container}>
      <ToolModal section={section} moveFunction={moveFunction} />
      <ResumeSectionContent section={section} />
    </section>
  );
}
