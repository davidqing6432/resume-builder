import styles from "./ExperienceCard.module.css";
import { Experience } from "@/utils/experience/types";

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2>{experience.organization}</h2>
          <h3>{experience.role}</h3>
        </div>
        <div className={styles.headerRight}>
          <h3>{experience.start_date.toDateString()} - {experience.end_date.toDateString()}</h3>
          <h3>{experience.location}</h3>
        </div>
      </div>
      <div className={styles.description}>
        <ul>
          {experience.information.map((info, index) => (
            <li key={index}>{info}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}