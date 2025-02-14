import { UUID } from "crypto";
import { fetchUserExperiences } from "../experience/actions";
import { fetchUserPersonalInfo } from "../personal_info/actions";
import { Section } from "./types";

export async function fetchUserSections(): Promise<Section[]> {
  let sections = [];
  sections.push(...(await fetchUserExperiences()));
  sections.push(...(await fetchUserPersonalInfo()));
  return sections;
}

// TODO: VERY INEFFICIENT.
// Possible solutions:
// - Store all sections in a context
// - Cache sections (somehow?)
// - Store sections in local storage
export async function fetchUserSectionById(id: UUID) {
  const sections = await fetchUserSections();
  return sections.find((section) => section.id === id);
}
