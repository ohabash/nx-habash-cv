'use client';
import Resume1 from "./resume-1/Resume-1";
import { usePaperContext } from "../../layout/paper/Paper.context";

const Resume = () => {
  const c = usePaperContext(); 
  return (
    <div>
      <div>
        <Resume1></Resume1>
      </div>
    </div>
  );
}

export default Resume
