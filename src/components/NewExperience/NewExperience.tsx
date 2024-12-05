"use client";

import styles from "./NewExperience.module.css";
import { createExperience } from "@/utils/experience/actions";
import { useActionState, useState } from "react";

const initialState = {
  error: null,
  numInfos: 0,
}

export default function NewExperience() {
  const [numInfos, setNumInfos] = useState(initialState.numInfos);
  const [state, formAction] = useActionState(createExperience, initialState);
  
  return (
    <form
      className={styles.container}
      action={(formData) => {
        formAction(formData);
        setNumInfos(state.numInfos);
      }}
    >
      <h2>New Experience</h2>
      <label htmlFor="organization">Organization</label>
      <input
        type="text"
        name="organization"
        placeholder="Organization"
      />
      <label htmlFor="role">Role</label>
      <input
        type="text"
        name="role"
        placeholder="Role"
      />
      <label htmlFor="start_date">Start Date</label>
      <input
        type="date"
        name="start_date"
      />
      <label htmlFor="end_date">End Date</label>
      <input
        type="date"
        name="end_date"
      />
      <label htmlFor="location">Location</label>
      <input
        type="text"
        name="location"
        placeholder="Location"
      />
      <label htmlFor="information">Information</label>
      <div className={styles.multiInput}>
        {Array.from(Array(numInfos).keys()).map((index) => (
          <input
            key={index}
            type="text"
            name={`information_${index}`}
            placeholder="Information"
          />
        ))}
        <button
          type="button"
          onClick={() => {
            setNumInfos(numInfos + 1);
            state.numInfos += 1;
          }}
        >
          Add Information
        </button>
      </div>

      <input type="submit" value="Insert" />
      {state.error && <p>{state.error}</p>}
    </form>
  );
}
