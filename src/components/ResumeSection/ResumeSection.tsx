"use client";

import ResumeSectionContent from "../ResumeSectionContent/ResumeSectionContent";
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
      {/* <div className={styles.flex}>
        <p>
          <strong>{section.organization}</strong>
        </p>
        <p>
          <strong>
            {section.start_date.toLocaleDateString("en-US", {
              // day: "numeric",
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            }) +
              " - " +
              section.end_date.toLocaleDateString("en-US", {
                // day: "numeric",
                month: "short",
                year: "numeric",
                timeZone: "UTC",
              })}
          </strong>
        </p>
      </div>
      <div className={styles.flex}>
        <p>{section.role}</p>
        <p>{section.location}</p>
      </div>
      <div>
        <ul>
          {section.information.map((infoBullet, index) => (
            <li key={index}>
              <p>{infoBullet}</p>
            </li>
          ))}
        </ul>
      </div> */}
      <ResumeSectionContent section={section} />
    </section>
  );
}
