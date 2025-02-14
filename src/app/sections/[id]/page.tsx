import { ResumeSection } from "@/components/ResumeSection/ResumeSection";
import { fetchUserSectionById } from "@/utils/section/actions";
import { UUID } from "crypto";

export default async function SectionIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id as UUID;
  const section = await fetchUserSectionById(id);

  return (
    <div>
      <h1>Section {id}</h1>
      <ResumeSection section={section!} />
    </div>
  );
}
