'use server';

import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}

export const InterviewMeWrapper = async ({ children }: Prop) => {
  return <div>{children}</div>;
};

