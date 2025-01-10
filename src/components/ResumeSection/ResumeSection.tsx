"use client";

import ResumeSectionContent from "./ResumeSectionContent/ResumeSectionContent";
import styles from "./ResumeSection.module.css";
import { Experience } from "@/utils/experience/types";
import Link from "next/link";

// TODO: poor design here. Adjust to be easier to understand.

function VisualizerToolModal({
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
export function ResumeVisualizerSection({
  section,
  moveFunction,
}: {
  section: Experience;
  moveFunction: (id: string) => void;
}) {
  return (
    <section className={styles.container}>
      <VisualizerToolModal section={section} moveFunction={moveFunction} />
      <ResumeSectionContent section={section} />
    </section>
  );
}

// TODO: poor naming
function SectionToolModal({ section }: { section: Experience }) {
  return (
    <div className={styles.modal}>
      {/* Add correct href */}
      <Link href="/login">Edit this section</Link>
    </div>
  );
}

export function EditableResumeSection({ section }: { section: Experience }) {
  return (
    <section className={styles.container}>
      <SectionToolModal section={section} />
      <ResumeSectionContent section={section} />
    </section>
  );
}
