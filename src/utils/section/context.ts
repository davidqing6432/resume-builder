import { createContext } from "react";
import { PersonalInfo } from "../personal_info/types";
import { Experience } from "../experience/types";

type ResumeContext = {
  personalInfos: PersonalInfo[] | null;
  experiences: Experience[] | null;
  // educations: Education[] | null;
  // languages: Language[] | null;
  // skills: Skill[] | null;
  setPersonalInfos: (personalInfos: PersonalInfo[]) => void;
  setExperiences: (experiences: Experience[]) => void;
  // setEducations: (educations: Education[]) => void;
  // setLanguages: (languages: Language[]) => void;
  // setSkills: (skills: Skill[]) => void;
};
export const SectionContext = createContext({});
