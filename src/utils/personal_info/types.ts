import { UUID } from "crypto";
import { Tables } from "../supabase/types";

export type PersonalInfo = {
  id: UUID;
  type: Tables<"personal_info">["type"];
  name: string;
  phone_number?: string;
  email?: string;
  city?: string;
  state?: string;
  links?: string[];
};

export function databaseToPersonalInfo(
  personalInfo: Tables<"personal_info">
): PersonalInfo {
  return {
    id: personalInfo.id! as UUID,
    type: personalInfo.type!,
    name: personalInfo.name as UUID,
    phone_number: personalInfo.phone_number || undefined,
    email: personalInfo.email || undefined,
    links: personalInfo.links || undefined,
    city: personalInfo.city || undefined,
    state: personalInfo.state || undefined,
  };
}
