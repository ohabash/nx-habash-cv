import { ThemeWrapper } from './layout/Theme';
import { Aside } from './components/aside-main/aside';
import { Hero } from './components/hero/Hero';
import { Header } from './components/header/header';
import { GlobalContext, GlobalProvider } from './global.context';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div>
      <GlobalProvider>
        {/* <PDFViewer></PDFViewer> */}
        {/* <PaperWrapper></PaperWrapper> */}
        <div className="w-[22%] hidden"></div>
        <div className="w-[1%] hidden"></div>
        <ThemeWrapper>
          <div className="min-h-screen">
            <Header></Header>
            <div className="columns text-fg m-0">
              <Aside />

              <div className="column  p-0 HEADER_OFFSET bg-darker">
                <Hero />
              </div>
            </div>
          </div>
        </ThemeWrapper>
      </GlobalProvider>
    </div>
  );
}
