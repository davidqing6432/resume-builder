import { UUID } from "crypto";
import { Tables } from "../supabase/types";

export type PersonalInfo = {
  id: UUID;
  name: string;
  phone_number?: string;
  email?: string;
  links?: string[];
};

export function databaseToPersonalInfo(
  personalInfo: Tables<"personal_info">
): PersonalInfo {
  return {
    id: personalInfo.id! as UUID,
    name: personalInfo.name as UUID,
    phone_number: personalInfo.phone_number || undefined,
    email: personalInfo.email || undefined,
    links: personalInfo.links || undefined,
  };
}
