import { UUID } from "crypto";

export type Experience = {
  id: UUID;
  type: "experience";
  organization: string;
  role: string;
  start_date: Date;
  end_date: Date;
  location: string;
  information: string[];
};

// TODO: Refactor to use Tables from supabase types.
export type DatabaseExperience = {
  id?: UUID;
  user_id?: UUID;
  type: "experience";
  organization: string;
  role: string;
  start_date: string;
  end_date: string;
  location: string;
  information: string[];
};

export function databaseToExperience(
  experience: DatabaseExperience
): Experience {
  return {
    id: experience.id!,
    type: experience.type!,
    organization: experience.organization,
    role: experience.role,
    start_date: new Date(experience.start_date),
    end_date: new Date(experience.end_date),
    location: experience.location,
    information: experience.information,
  };
}

export function experienceToDatabase(
  experience: Experience
): DatabaseExperience {
  return {
    id: experience.id,
    type: experience.type,
    organization: experience.organization,
    role: experience.role,
    start_date: experience.start_date.toISOString(),
    end_date: experience.end_date.toISOString(),
    location: experience.location,
    information: experience.information,
  };
}
