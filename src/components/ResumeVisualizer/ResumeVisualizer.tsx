import { useEffect, useRef } from "react";
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
  const visualizerRef = useRef<HTMLDivElement>(null);
  const printFunction = useReactToPrint({ contentRef: resumeRef });
  // px to inches is 96:1

  // fit resume to visualizer
  const handleScale = () => {
    const visualizerWidth = visualizerRef.current?.offsetWidth || 0;
    const visualizerHeight = visualizerRef.current?.offsetHeight || 0;
    const resumeWidth = resumeRef.current?.offsetWidth || 0;
    const resumeHeight = resumeRef.current?.offsetHeight || 0;
    const widthScale = visualizerWidth / resumeWidth;
    const heightScale = visualizerHeight / resumeHeight;
    resumeRef.current!.style.transform = `scale(${Math.min(
      widthScale,
      heightScale
    )}) translate(-50%, -50%)`;
  };

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      handleScale();
    });
    observer.observe(visualizerRef.current!);
    return () => observer.disconnect();
  });

  return (
    <div className={styles.visualizer} ref={visualizerRef}>
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
