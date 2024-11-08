'use client';
import { useState } from "react";
import { IPaperContext, usePaperContext } from "../layout/paper/Paper.context";

export const ExpandButton = () => {
  const [paperContext, setPaperContext] = useState(usePaperContext() as IPaperContext | null);
  const open = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (!paperContext) return;
    paperContext.setIsFocused(v => !v);
  };
  return (
    <button className="btn btn-primary" onClick={open}>
      {' '}
      Open{' '}
    </button>
  );
}

