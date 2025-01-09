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

type FormState = {
  error: string | null;
}

export async function createExperience(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();
  const information: string[] = [];
  let infoIndex = 0;
  while (formData.get(`information_${infoIndex}`) as string) {
    const info = formData.get(`information_${infoIndex}`) as string;
    if (info) information.push(info);
    infoIndex++;
  }
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "User not found" };
  }
  const userId = user.id as UUID;
  const experience: DatabaseExperience = {
    user_id: userId,
    organization: formData.get("organization")!.toString(),
    role: formData.get("role")!.toString(),
    start_date: formData.get("start_date")!.toString(),
    end_date: formData.get("end_date")!.toString(),
    location: formData.get("location")!.toString(),
    information: information,
  }

  const { data, error } = await supabase.from("experiences").insert(experience);
  if (error) {
    console.error(error);
    return { error: error.message };
  }
  // TODO: Check this path
  revalidatePath("/experiences");
  return { error: null };
}