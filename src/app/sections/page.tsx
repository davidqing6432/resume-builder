import { fetchUserPersonalInfo } from "@/utils/personal_info/actions";
import styles from "./page.module.css";
import { fetchUserExperiences } from "@/utils/experience/actions";
import ResumeSectionContent from "@/components/ResumeSection/ResumeSectionContent/ResumeSectionContent";

export default async function Sections() {
  const experiences = await fetchUserExperiences();
  const personalInfo = await fetchUserPersonalInfo();
  // const skills = await fetchUserSkills();
  // const languages = await fetchUserLanguages();
  // const education = await fetchUserEducation();

  return (
    <div className={styles.container}>
      <h1>Section Builder</h1>
      {/* Select types of resume sections: personal information, experiences, skills, languages, education */}
      {/* <div className={styles.selector}>
        <select>
          <option value="personal">Personal Information</option>
          <option value="experiences">Experiences</option>
          <option value="skills">Skills</option>
          <option value="languages">Languages</option>
          <option value="education">Education</option>
        </select>
      </div> */}
      <div className={styles.section}>
        <h2>Personal Information</h2>
        {personalInfo.map((info, index) => (
          <ResumeSectionContent section={info} key={index} />
        ))}
      </div>
      <div className={styles.section}>
        <h2>Experiences</h2>
        {experiences.map((experience, index) => (
          <ResumeSectionContent section={experience} key={index} />
        ))}
      </div>
    </div>
  );
}
