"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { UUID } from "crypto";
import { Tables, TablesInsert } from "../supabase/types";
import { databaseToPersonalInfo, PersonalInfo } from "./types";

// TODO: Functions are the same except finding user_id is integrated into fetchUserExperiences.
// This should always be valid, but just leaving in case needed.

export async function fetchUserPersonalInfo(): Promise<PersonalInfo[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return [];
  }
  const userId = user.id as UUID;
  const { data: personalInfos } = await supabase
    .from("personal_info")
    .select()
    .eq("user_id", userId);
  const databasePersonalInfos = personalInfos as Tables<"personal_info">[];
  return databasePersonalInfos.map((personalInfo) =>
    databaseToPersonalInfo(personalInfo)
  );
}

type FormState = {
  error: string | null;
};

export async function createPersonalInfo(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();
  const links: string[] = [];
  let linkIndex = 0;
  while (formData.has(`links_${linkIndex}`)) {
    const link = formData.get(`links_${linkIndex}`) as string;
    if (link) links.push(link);
    linkIndex++;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "User not found" };
  }
  const userId = user.id as UUID;
  const toInsert: TablesInsert<"personal_info"> = {
    user_id: userId,
    name: formData.get("name")!.toString(),
    phone_number: formData.get("phone_number")!.toString(),
    email: formData.get("email")!.toString(),
    links: links,
  };

  const { data, error } = await supabase.from("personal_info").insert(toInsert);
  if (error) {
    console.error(error);
    return { error: error.message };
  }
  // TODO: Check this path
  revalidatePath("/experiences");
  return { error: null };
}
