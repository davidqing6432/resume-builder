import { fetchUserPersonalInfo } from "@/utils/personal_info/actions";
import styles from "./page.module.css";
import { fetchUserExperiences } from "@/utils/experience/actions";
import { ResumeSection } from "@/components/ResumeSection/ResumeSection";

export default async function Sections() {
  const experiences = await fetchUserExperiences();
  const personalInfo = await fetchUserPersonalInfo();
  // const skills = await fetchUserSkills();
  // const languages = await fetchUserLanguages();
  // const education = await fetchUserEducation();

  return (
    <div className={styles.container}>
      <h1>Section Builder</h1>
      <div className={styles.section}>
        <h2>Personal Information</h2>
        {personalInfo.map((info, index) => (
          <ResumeSection key={index} section={info} />
        ))}
      </div>
      <div className={styles.section}>
        <h2>Experiences</h2>
        {experiences.map((experience, index) => (
          <ResumeSection section={experience} key={index} />
        ))}
      </div>
    </div>
  );
}
