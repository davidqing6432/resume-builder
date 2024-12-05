'use client';

import { signup } from "@/utils/supabase/actions";
import Link from "next/link";
import { useActionState } from "react";

export default function Signup() {
  const [state, formAction, isPending] = useActionState(signup, { error: "" });
  return (
    <div>
      <h1>Signup</h1>
      <form action={formAction}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button type="submit" disabled={isPending}>Submit</button>
        {state.error && <p>{state.error}</p>}
      </form>
      <h2>Have an account? <Link href="login">Login</Link></h2>
    </div>
  );
}