'use client';

import { logout } from "@/utils/supabase/actions";

export default function LogoutButton() {
  return (
    <button onClick={() => logout()}>Logout</button>
  )
}