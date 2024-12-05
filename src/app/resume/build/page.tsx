import { fetchUserExperiences } from "@/utils/experience/actions";

export default async function Build() {
  const parsedExperiences = await fetchUserExperiences();

  return (
    <div>
      <h1>Build Resume</h1>
      <h1>Select the experiences you would like to include in your resume:</h1>
      {parsedExperiences?.map((experience) => (
        <div key={experience.id}>
          <input type="checkbox" id={experience.id} name={experience.id} value={experience.id} />
          <label htmlFor={experience.id}>{experience.organization}</label>
        </div>
      ))}
    </div>
  );
}