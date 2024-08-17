import Resume1 from "./components/resume-templates/resume-1/Resume-1";
import Paper from "./layout/paper/Paper";


export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div>
      <div className="wrapper">
        <div className="min-h-screen font-bold bg-grad-white _bg-wood">
          <div className="_container">
            <Paper>
              <Resume1></Resume1>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}
