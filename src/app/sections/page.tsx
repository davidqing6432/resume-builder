import styles from "./page.module.css";
import { fetchUserExperiences } from "@/utils/experience/actions";

export default async function Sections() {
  const experiences = await fetchUserExperiences();
  const personalInfo = await fetchUserPersonalInfo();
  const skills = await fetchUserSkills();
  const languages = await fetchUserLanguages();
  const education = await fetchUserEducation();

  return (
    <div className={styles.container}>
      <h1>Section Builder</h1>
      <div className={styles.selector}>
        {/* Select types of resume sections: personal information, experiences, skills, languages, education */}
        <select>
          <option value="personal">Personal Information</option>
          <option value="experiences">Experiences</option>
          <option value="skills">Skills</option>
          <option value="languages">Languages</option>
          <option value="education">Education</option>
        </select>
      </div>
    </div>
  );
}
