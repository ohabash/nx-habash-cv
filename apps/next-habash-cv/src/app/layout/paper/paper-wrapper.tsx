import { ExpandButton } from "../../components/expand-button";
import Resume from "../../components/resume-templates/Resume";
import Paper from "./Paper";
import { PaperProvider } from "./Paper.context";

export const PaperWrapper = () => {
  return (
    <div className="wrapper">
      <div className="min-h-screen font-bold bg-grad-white _bg-wood relative z-0">
        <div className="_container">
          <PaperProvider>
            <ExpandButton></ExpandButton>
            <Paper>
              <Resume />
            </Paper>
          </PaperProvider>
        </div>
      </div>
    </div>
  );
}

