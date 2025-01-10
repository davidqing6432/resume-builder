import ExperienceCard from "@/components/ExperienceCard/ExperienceCard";
import NewExperience from "@/components/NewExperience/NewExperience";
import { fetchUserExperiences } from "@/utils/experience/actions";

export default async function Experiences() {
  const parsedExperiences = await fetchUserExperiences();

  return (
    <div>
      <h1>Your Experiences</h1>
      {parsedExperiences?.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
      <NewExperience />
    </div>
  );
}
