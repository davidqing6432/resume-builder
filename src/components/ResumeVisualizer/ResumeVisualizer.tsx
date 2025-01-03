import { useRef } from "react";
import styles from "./ResumeVisualizer.module.css";
import { useReactToPrint } from "react-to-print";
import { Experience } from "@/utils/experience/types";
import ResumeSection from "../ResumeSection/ResumeSection";

// TODO: change from any typing to all of the section types
export default function ResumeVisualizer({
  sections,
  moveFunction,
}: {
  sections: Experience[];
  moveFunction: (id: string) => void;
}) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const printFunction = useReactToPrint({ contentRef: resumeRef });

  return (
    <div className={styles.visualizer}>
      <div className={styles.resume} ref={resumeRef}>
        {sections.map((section) => (
          <ResumeSection
            key={section.id}
            section={section}
            moveFunction={moveFunction}
          />
        ))}
      </div>
      <button onClick={() => printFunction()}>Download</button>
    </div>
  );
}
