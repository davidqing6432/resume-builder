import { BuilderPageClient } from "@/components/BuilderPageClient/BuilderPageClient";
import { fetchUserSections } from "@/utils/section/actions";

export default async function BuilderPage() {
  const sections = await fetchUserSections();
  return <BuilderPageClient sections={sections} />;
}
