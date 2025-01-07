import { fetchUserExperiences } from "@/utils/experience/actions";
import { BuilderPageClient } from "@/components/BuilderPageClient/BuilderPageClient";

export default async function BuilderPage() {
  const experiences = await fetchUserExperiences();
  return <BuilderPageClient experiences={experiences} />;
}
