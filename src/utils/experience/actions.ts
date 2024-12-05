"use server";

import { createClient } from "@/utils/supabase/server";
import { DatabaseExperience, databaseToExperience, Experience } from "@/utils/experience/types";
import { revalidatePath } from "next/cache";
import { UUID } from "crypto";

// TODO: Functions are the same except finding user_id is integrated into fetchUserExperiences. 
// This should always be valid, but just leaving in case needed. 

export async function fetchUserExperiences(): Promise<Experience[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return [];
  }
  const userId = user.id as UUID;
  const { data: experiences } = await supabase.from("experiences").select().eq("user_id", userId);
  const databaseExperiences = experiences as DatabaseExperience[];
  return databaseExperiences.map((experience) => databaseToExperience(experience));
}

// export async function fetchExperiencesByUser(user_id: UUID): Promise<Experience[]> {
//   const supabase = await createClient();
//   const { data: experiences } = await supabase.from("experiences").select().eq("user_id", user_id);
//   const databaseExperiences = experiences as DatabaseExperience[];
//   return databaseExperiences.map((experience) => databaseToExperience(experience));
// }

type FormState = {
  error: string | null;
  numInfos: number;
}

export async function createExperience(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();
  const information: string[] = [];
  for (let i = 0; i < prevState.numInfos; i++) {
    information.push(formData.get(`information_${i}`) as string);
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "User not found", numInfos: prevState.numInfos };
  }
  const userId = user.id as UUID;
  const experience: DatabaseExperience = {
    user_id: userId,
    organization: formData.get("organization")?.toString()!,
    role: formData.get("role")?.toString()!,
    start_date: formData.get("start_date")?.toString()!,
    end_date: formData.get("end_date")?.toString()!,
    location: formData.get("location")?.toString()!,
    information: information,
  }
  const { data, error } = await supabase.from("experiences").insert(experience);
  if (error) {
    console.error(error);
    return { error: error.message, numInfos: prevState.numInfos };
  }
  // TODO: Check this path
  revalidatePath("/experiences");
  return { error: null, numInfos: 0 };
}