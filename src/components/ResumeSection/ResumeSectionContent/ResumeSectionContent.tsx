import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";
import { Experience } from "@/utils/experience/types";
import styles from "./ResumeSectionContent.module.css";
import { Section } from "@/utils/section/types";
import { PersonalInfo } from "@/utils/personal_info/types";
import { Fragment } from "react";

export default function ResumeSectionContent({
  section,
}: {
  section: Section;
}) {
  switch (section.type) {
    case "personal_info":
      return <PersonalInfoContent section={section as PersonalInfo} />;
    case "experience":
      return <ExperienceContent section={section as Experience} />;
    default:
      console.error("Invalid section type");
      return <div></div>;
  }
}

function PersonalInfoContent({ section }: { section: PersonalInfo }) {
  // combine all fields that are not null with a pipe separator
  let links: React.ReactNode = [];
  if (section.links) {
    links = section.links
      .filter((link) => link)
      .map((link) => {
        return (
          <a href={link} key={link}>
            {link.split("//")[1]}
          </a>
        );
      });
  }

  const phoneUtil = PhoneNumberUtil.getInstance();
  let formattedPhoneNumber = null;
  if (section.phone_number) {
    const phoneNumber = phoneUtil.parseAndKeepRawInput(
      section.phone_number,
      "US"
    );
    formattedPhoneNumber = phoneUtil.format(
      phoneNumber,
      PhoneNumberFormat.NATIONAL
    );
  }

  const contact: React.ReactNode[] = [
    section.email ? (
      <a href={"mailto:" + section.email}>{section.email}</a>
    ) : null,
    formattedPhoneNumber ? <p>{formattedPhoneNumber}</p> : null,
    section.city && section.state ? (
      <p>
        {section.city}, {section.state}
      </p>
    ) : null,
    ...links,
  ].filter((element) => element);

  return (
    <div className={styles.container}>
      <div className={styles.centered}>
        <p>
          <strong>{section.name}</strong>
        </p>
      </div>
      <div className={styles.centered}>
        {contact.map((element, index) => (
          <Fragment key={index}>
            {element}
            {index < contact.length - 1 && (
              <span className={styles.separator}> | </span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function ExperienceContent({ section }: { section: Experience }) {
  return (
    <div className={styles.container}>
      <div className={styles.space_between}>
        <p>
          <strong>{section.organization}</strong>
        </p>
        <p>
          <strong>
            {section.start_date.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            }) +
              " - " +
              section.end_date.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              })}
          </strong>
        </p>
      </div>
      <div className={styles.space_between}>
        <p>{section.role}</p>
        <p>{section.location}</p>
      </div>
      <ul className={styles.bullets}>
        {section.information.map((infoBullet, index) => (
          <li key={index}>{infoBullet}</li>
        ))}
      </ul>
    </div>
  );
}
