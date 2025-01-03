import { Experience } from "@/utils/experience/types";
import styles from "./ResumeSectionContent.module.css";

export default function ResumeSectionContent({
  section,
}: {
  section: Experience;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <p>
          <strong>{section.organization}</strong>
        </p>
        <p>
          <strong>
            {section.start_date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            }) +
              " - " +
              section.end_date.toLocaleDateString("en-US", {
                day: "numeric",
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
      <ul className={styles.bullets}>
        {section.information.map((infoBullet, index) => (
          <li key={index}>{infoBullet}</li>
        ))}
      </ul>
    </div>
  );
}
