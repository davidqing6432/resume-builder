'use client';

import { login } from "@/utils/supabase/actions";
import Link from "next/link";
import { useActionState } from "react";

export default function Login() {
  const [state, formAction, isPending] = useActionState(login, { error: "" });
  return (
    <div>
      <h1>Login</h1>
      <form action={formAction}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button type="submit" disabled={isPending}>Submit</button>
        {state.error && <p>{state.error}</p>}
      </form>
      <h2>Don't have an account? <Link href="signup">Signup</Link></h2>
    </div>
  );
}