"use client";

import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react"

interface Props {
  children: React.ReactNode;
  session: Session | null;
}

export default function Provider({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}