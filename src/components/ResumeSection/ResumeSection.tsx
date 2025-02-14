"use client";

import ResumeSectionContent from "./ResumeSectionContent/ResumeSectionContent";
import styles from "./ResumeSection.module.css";
import Link from "next/link";
import { Section } from "@/utils/section/types";

function ToolModal({
  section,
  isInVisualizer,
  moveFunction,
}: {
  section: Section;
  isInVisualizer?: boolean;
  moveFunction?: (id: string) => void;
}) {
  return (
    <div className={styles.modal}>
      {/* TODO: Is exposing the id a security hazard? */}
      <Link href={"/sections/" + section.id}>Edit this section</Link>
      {isInVisualizer && moveFunction && (
        <button onClick={() => moveFunction(section.id)}>
          Move this section
        </button>
      )}
      <button>Delete this section</button>
    </div>
  );
}

export function ResumeSection({
  section,
  isInVisualizer,
  moveFunction,
}: {
  section: Section;
  moveFunction?: (id: string) => void;
  isInVisualizer?: boolean;
}) {
  return (
    <section className={styles.container}>
      <ToolModal
        section={section}
        moveFunction={moveFunction}
        isInVisualizer={isInVisualizer}
      />
      <ResumeSectionContent section={section} />
    </section>
  );
}
